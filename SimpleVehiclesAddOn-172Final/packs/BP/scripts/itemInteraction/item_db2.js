import {
  world,
  system,
  ItemStack,
  HudVisibility,
  HudElement,
} from "@minecraft/server";

import { items } from "../utils/itemLists"
import { vehicleLists } from "../utils/vehicleLists";

export function playerSaveItemInventory(player, vehicle){
    const playerInventory = player.getComponent("minecraft:inventory").container;
    const vehicleInventory = vehicle.getComponent("minecraft:inventory").container;
    for (let index = 0; index < 9; index++) {
        const item = playerInventory.getItem(index);
        vehicleInventory.setItem(index, item);
    }
    player.setDynamicProperty(`simplevehicles_selected_slot_index`, player.selectedSlotIndex);
}

export function playerLoadItemInventory(player, vehicle){
    const playerInventory = player.getComponent("minecraft:inventory").container;
    const vehicleInventory = vehicle.getComponent("minecraft:inventory").container;
    for (let index = 0; index < 9; index++) {
        const item = vehicleInventory.getItem(index);
        playerInventory.setItem(index, item);
        vehicleInventory.setItem(index, undefined);
    }
    const slotIndex = player.getDynamicProperty(`simplevehicles_selected_slot_index`);
    player.selectedSlotIndex = slotIndex ? slotIndex : 0;
}

export function playerInventoryItems(player, vehicle){
    const ItemInventory = player.getComponent("minecraft:inventory").container;
    ItemInventory.addItem(new ItemStack("simple_vehicles:honl_item"));
}

export function playerDeleteItemInventory(player, vehicle){
    const playerInventory = player.getComponent("minecraft:inventory").container;
    for (let index = 0; index < 9; index++) {
        playerInventory.setItem(index, undefined);
    }
}