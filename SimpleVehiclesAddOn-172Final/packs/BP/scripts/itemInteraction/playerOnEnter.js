import { vehicleLists } from "../utils/vehicleLists";

import {
  playerDeleteItemInventory,
  playerLoadItemInventory,
  playerLockInventory,
  playerSaveItemInventory,
  playerUnlockInventory,
} from "./item_db2";

import {
  world,
  system,
  ItemStack,
  HudVisibility,
  HudElement,
} from "@minecraft/server";

let accelerationSpeed = 0;
const VehiclesMounted = {};

export async function onWorldTicks() {
  ++accelerationSpeed;
  for (const player of world.getAllPlayers()) {
    try {
      const vehicle = getPlayerSimpleVehicles(player);
      if (!vehicle || simpleVehiclesVehicles.isValid()) {
        if (player.hasTag("simplevehicles_player_in_vehicle")) onVehicleLeave(player);
        continue;
      };
      if (!player.hasTag("simplevehicles_player_in_vehicle")) onVehicleEnter(player, simpleVehiclesVehicles);
      VehiclesMounted = [player.id] = {
        player: player,
        vehicle: simpleVehiclesVehicles,
      };
      player.onScreenDisplay("Test Item");
      player.runCommand("hud @s hide horse_health");
    } catch (error) {}
  }
}

function getPlayerSimpleVehicles(player) {
  const ridingComponent = player.getComponent("minecraft:riding");
  if (!ridingComponent) return undefined;
  const ridingEntity = ridingComponent.entityRidingOn;
  if (
    !ridingEntity || !ridingEntity.isValid() || !vehicleLists.includes(ridingEntity.typeId)
  )
  return undefined;
  return ridingEntity;
}

function onVehicleEnter(player, simpleVehiclesVehicles) {
  if (!simpleVehiclesVehicles.isValid()) return;
  player.addTag("simplevehicles_player_in_vehicle");
  // player.setDynamicProperty("simplevehicles_vehicle_id", vehicle.id);
  playerSaveItemInventory(player, simpleVehiclesVehicles);
  playerDeleteItemInventory(player);
  playerInventoryItems(player);
  playerLockInventory(player);
  // world.getDimension("overworld").runCommand("hud @p[r=1] hide horse_health")
}

function onVehicleLeave(player) {
  const simpleVehiclesVehicles = VehiclesMounted[player.id]?.simpleVehiclesVehicles;
  player.removeTag("simplevehicles_player_in_vehicle");
  playerUnlockInventory(player);
  playerDeleteItemInventory(player);
  playerLoadItemInventory(player, simpleVehiclesVehicles);
  // world.getDimension("overworld").runCommand("hud @p[r=1] reset horse_health")
}
