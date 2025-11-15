import {
  world,
  system,
  ItemStack,
  HudVisibility,
  HudElement,
} from "@minecraft/server";

import { items } from "../utils/itemLists"
import { vehicleLists } from "../utils/vehicleLists";

function playerSaveItemInventory(player, vehicle){
    const playerInventory = player.getComponent("minecraft:inventory").container;
    const vehicleInventory = vehicle.getComponent("minecraft:inventory").container;
    for (let index = 0; index < 9; index++) {
        const item = playerInventory.getItem(index);
        vehicleInventory.setItem(index, item);
    }
}