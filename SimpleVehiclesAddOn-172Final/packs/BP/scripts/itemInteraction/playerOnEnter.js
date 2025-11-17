import { vehicleLists } from "../utils/vehicleLists";
import {
  playerSaveItemInventory
} from "../itemInteraction/item_db2";


import {
  world,
  system,
  ItemStack,
  HudVisibility,
  HudElement,
} from "@minecraft/server";

let accelerationSpeed = 0;

export function onWorldTicks() {
  ++accelerationSpeed;
  for (const player of world.getAllPlayers()) {
    try {
      const simpleVehiclesVehicles = getPlayerSimpleVehicles(player);
      if (!simpleVehiclesVehicles || simpleVehiclesVehicles.isValid()) {
        if (!player.hasTag("simplevehicles_player_in_vehicle"))
          onVehicleLeave(player);
        continue;
      }
      if (!player.hasTag("simplevehicles_player_in_vehicle"))
        onVehicleEnter(player, simpleVehiclesVehicles);
      const hudElements = [
        HudElement.Health,
        HudElement.Hunger,
        HudElement.Armor,
        HudElement.ProgressBar,
        HudElement.HorseHealth,
        HudElement.Crosshair,
      ];
      player.onScreenDisplay.setHudVisibility(HudVisibility.Hide, hudElements); // Hide horse hearts
    } catch (error) {}
  }
}





function getPlayerSimpleVehicles(player){
  const ridingComponent = player.getComponent("minecraft:riding");
  if (!ridingComponent) return undefined;
  const ridingEntity = ridingComponent.entityRidingOn;
  if (!ridingEntity|| !ridingEntity.isValid() || !vehicleLists.includes(ridingEntity.typeId)) return undefined;
  return ridingEntity;
}



function onVehicleEnter (player, vehicle){
  if (!vehicle.isValid()) return;
  player.addTag("simplevehicles_player_in_vehicle");
  player.setDynamicProperty("simplevehicles_vehicle_id", vehicle.id);
  playerSaveItemInventory(player, vehicle);
}