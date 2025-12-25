import { simpleVehiclesVehicles } from "../utils/vehiclelists";

import {
  playerDeleteItemInventory,
  playerLoadItemInventory,
  playerLockInventory,
  playerSaveItemInventory,
  playerUnlockInventory,
  playerInventoryItems
} from "./item_db2";

import {
  world,
} from "@minecraft/server";

let accelerationSpeed = 0;

const VehiclesMounted = {};

export function onWorldTicks() {
  ++accelerationSpeed;
  for (const player of world.getAllPlayers()) {
    try {
      const simplevehicle_vehicle = getPlayerSimpleVehicles(player);
      if (!simplevehicle_vehicle || simplevehicle_vehicle.isValid()) {
        if (player.hasTag("simplevehicles_player_in_vehicle")) onVehicleLeave(player);
        continue;
      };
      if (!player.hasTag("simplevehicles_player_in_vehicle")) onVehicleEnter(player, simpleVehiclesVehicles);
      VehiclesMounted[player.id] = {player: player, simpleVehiclesVehicles: simpleVehiclesVehicles };
    } catch (error) {}
  }
}

function getPlayerSimpleVehicles(player) {
  const ridingComponent = player.getComponent("minecraft:riding");
  if (!ridingComponent) return undefined;
  const ridingEntity = ridingComponent.entityRidingOn;
  if ( !ridingEntity || !ridingEntity.isValid() || !simpleVehiclesVehicles.includes(ridingEntity.typeId)) return undefined;
  return ridingEntity;
}

function onVehicleEnter(player, simpleVehiclesVehicles) {
  if (!simpleVehiclesVehicles.isValid()) return;
  player.getComponent("minecraft:rideable");
  player.addTag("simplevehicles_player_in_vehicle");
  playerSaveItemInventory(player, simpleVehiclesVehicles);
  playerDeleteItemInventory(player);
  playerInventoryItems(player);
  playerLockInventory(player);
}

function onVehicleLeave(player) {
  const simpleVehiclesVehicles = VehiclesMounted[player.id]?.simpleVehiclesVehicles;
  player.removeTag("simplevehicles_player_in_vehicle");
  playerUnlockInventory(player);
  playerDeleteItemInventory(player);
  playerLoadItemInventory(player, simpleVehiclesVehicles);
}