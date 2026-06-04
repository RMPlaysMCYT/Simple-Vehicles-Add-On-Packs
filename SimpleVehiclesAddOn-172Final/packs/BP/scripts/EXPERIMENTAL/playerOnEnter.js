import { simpleVehiclesVehicles } from "../utils/vehicleLists";
import {
  playerDeleteItemInventory,
  playerLoadItemInventory,
  playerLockInventory,
  playerSaveItemInventory,
  playerUnlockInventory,
  playerInventoryItems,
} from "./item_db2";
import { world } from "@minecraft/server";

/** @type {Record<string, import("@minecraft/server").Entity>} */
const VehiclesMounted = {};

/**
 * Safely check isValid across API versions (2.x = property, 1.x = method).
 * @param {import("@minecraft/server").Entity | undefined | null} entity
 */
function isEntityValid(entity) {
  if (!entity) return false;
  const v = entity.isValid;
  return typeof v === "function" ? v() : !!v;
}

/**
 * Main tick — call from system.runInterval in main.js.
 */
export function onWorldTicks() {
  for (const player of world.getAllPlayers()) {
    try {
      const currentVehicle  = getPlayerSimpleVehicles(player);
      const mountedVehicle  = VehiclesMounted[player.id];
      const hasMountedEntry = !!mountedVehicle;

      // ── Not in a vehicle ─────────────────────────────────────────────────
      if (!currentVehicle || !isEntityValid(currentVehicle)) {
        if (hasMountedEntry) {
          onVehicleLeave(player);        // handles cleanup + inventory restore
        } else if (player.hasTag("simplevehicles_player_in_vehicle")) {
          // Edge case: tag stuck with no mount record
          player.removeTag("simplevehicles_player_in_vehicle");
        }
        continue;
      }

      // ── Switched vehicle or first mount ──────────────────────────────────
      if (!hasMountedEntry || mountedVehicle.id !== currentVehicle.id) {
        // If already had a different vehicle mounted, leave that one first
        if (hasMountedEntry) onVehicleLeave(player);
        onVehicleEnter(player, currentVehicle);
      }

      // Keep the cache fresh every tick
      VehiclesMounted[player.id] = currentVehicle;
    } catch (error) {
      console.warn(`[Simple Vehicles] tick error for ${player.name}: ${error}`);
    }
  }
}

/**
 * Returns the Simple Vehicles entity the player is currently riding, or undefined.
 * @param {import("@minecraft/server").Player} player
 * @returns {import("@minecraft/server").Entity | undefined}
 */
function getPlayerSimpleVehicles(player) {
  const ridingEntity = player.getComponent("minecraft:riding")?.entityRidingOn;
  if (!ridingEntity || !isEntityValid(ridingEntity)) return undefined;
  if (!simpleVehiclesVehicles.includes(ridingEntity.typeId)) return undefined;
  return ridingEntity;
}

/**
 * @param {import("@minecraft/server").Player} player
 * @param {import("@minecraft/server").Entity} vehicleEntity
 */
function onVehicleEnter(player, vehicleEntity) {
  if (!isEntityValid(vehicleEntity)) return;

  player.addTag("simplevehicles_player_in_vehicle");
  playerSaveItemInventory(player, vehicleEntity);  // snapshot before wiping
  playerDeleteItemInventory(player);
  playerInventoryItems(player, vehicleEntity);     // set control items
  playerLockInventory(player);                     // lock after items are set
}

/**
 * @param {import("@minecraft/server").Player} player
 */
function onVehicleLeave(player) {
  const vehicleEntity = VehiclesMounted[player.id]; // may or may not be valid

  player.removeTag("simplevehicles_player_in_vehicle");
  playerUnlockInventory(player);      // unlock before clearing
  playerDeleteItemInventory(player);  // wipe control items
  playerLoadItemInventory(player, vehicleEntity); // restore from vehicle or memory

  delete VehiclesMounted[player.id];
}