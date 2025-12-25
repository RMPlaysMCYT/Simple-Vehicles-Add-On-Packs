import {
  ItemStack,
} from "@minecraft/server";


export function playerSaveItemInventory(player, simpleVehiclesVehicles) {
  const playerInventory = player.getComponent("minecraft:inventory").container;
  const vehicleInventory = simpleVehiclesVehicles.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    const item = playerInventory.getItem(index);
    vehicleInventory.setItem(index, item);
  }
  player.setDynamicProperty(`simplevehicles_selected_slot_index`,player.selectedSlotIndex);
}

export function playerLoadItemInventory(player, simpleVehiclesVehicles) {
  const playerInventory = player.getComponent("minecraft:inventory").container;
  const vehicleInventory = simpleVehiclesVehicles.getComponent(
    "minecraft:inventory"
  ).container;
  for (let index = 0; index < 7; index++) {
    const item = vehicleInventory.getItem(index);
    playerInventory.setItem(index, item);
    vehicleInventory.setItem(index, undefined);
  }
  const slotIndex = player.getDynamicProperty(
    `simplevehicles_selected_slot_index`
  );
  player.selectedSlotIndex = slotIndex ? slotIndex : 0;
}

export function playerInventoryItems(player, simpleVehiclesVehicles) {
  const ItemInventory = player.getComponent("minecraft:inventory").container;
  ItemInventory.addItem(0, ItemStack("simple_vehicles:honk_item", 1));
  ItemInventory.addItem(1, ItemStack("simple_vehicles:key", 1));
}


export function playerDeleteItemInventory(player) {
  const playerInventory = player.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    playerInventory.setItem(index, undefined);
  }
}

export function playerLockInventory(player) {
  const playerInventory = player.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    const ItemSlot = playerInventory.getSlot(index);
    if (!ItemSlot.getItem()) continue;
    ItemSlot.lockMode = "inventory";
  }
}

export function playerUnlockInventory(player) {
  const playerInventory = player.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    const ItemSlot = playerInventory.getSlot(index);
    if (!ItemSlot.getItem()) continue;
    ItemSlot.lockMode = "none";
  }
}
