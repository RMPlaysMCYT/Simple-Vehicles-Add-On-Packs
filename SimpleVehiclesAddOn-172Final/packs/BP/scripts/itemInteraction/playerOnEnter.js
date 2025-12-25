import { simpleVehiclesVehicles } from "../utils/vehiclelists"; // Adjust path if needed
import {
  playerDeleteItemInventory,
  playerLoadItemInventory,
  playerLockInventory,
  playerSaveItemInventory,
  playerUnlockInventory,
  playerInventoryItems
} from "./item_db2";
import { world } from "@minecraft/server";

// Cache: map player.id -> vehicle entity the player is riding
const VehiclesMounted = {};

/**
 * Tick loop: detects enter/leave and manages hotbar items & locks.
 * Call this from main.js via system.runInterval.
 */
export function onWorldTicks() {
  for (const player of world.getAllPlayers()) {
    try {
      const currentVehicle = getPlayerSimpleVehicles(player);

      // Not riding a valid vehicle
      if (!currentVehicle || !currentVehicle.isValid()) {
        if (player.hasTag("simplevehicles_player_in_vehicle")) {
          onVehicleLeave(player);
        }
        continue;
      }

      // Just entered
      if (!player.hasTag("simplevehicles_player_in_vehicle")) {
        onVehicleEnter(player, currentVehicle);
      }

      // Keep current reference
      VehiclesMounted[player.id] = currentVehicle;
    } catch (error) {
      console.warn(`[Simple Vehicles] tick error: ${error}`);
    }
  }
}

function getPlayerSimpleVehicles(player) {
  const ridingComponent = player.getComponent("minecraft:riding");
  if (!ridingComponent) return undefined;

  const ridingEntity = ridingComponent.entityRidingOn;
  if (!ridingEntity || !ridingEntity.isValid() || !simpleVehiclesVehicles.includes(ridingEntity.typeId)) {
    return undefined;
  }
  return ridingEntity;
}

function onVehicleEnter(player, vehicleEntity) {
  if (!vehicleEntity.isValid()) return;

  player.addTag("simplevehicles_player_in_vehicle");

  // Save inventory (vehicle inventory if present, plus memory snapshot)
  playerSaveItemInventory(player, vehicleEntity);

  // Replace hotbar items and lock slots
  playerDeleteItemInventory(player);
  playerInventoryItems(player); // deterministic setItem into hotbar
  playerLockInventory(player);
}

function onVehicleLeave(player) {
  // Correctly fetch the cached entity (fixes previous typo bug)
  const vehicleEntity = VehiclesMounted[player.id];

  player.removeTag("simplevehicles_player_in_vehicle");
  playerUnlockInventory(player);
  playerDeleteItemInventory(player);

  // Restore inventory
  playerLoadItemInventory(player, vehicleEntity);

  delete VehiclesMounted[player.id];
}