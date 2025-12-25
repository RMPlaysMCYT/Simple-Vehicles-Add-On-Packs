import {
  world,
  system,
  ItemStack,
  HudVisibility,
  HudElement,
} from "@minecraft/server";


export function playerSaveItemInventory(player, simpleVehiclesVehicles) {
  const itemInv = player.getComponent("minecraft:inventory").container;
  const vehicleInventory = simpleVehiclesVehicles.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    const item = itemInv.getItem(index);
    vehicleInventory.setItem(index, item);
  }
  player.setDynamicProperty(`simplevehicles_selected_slot_index`,player.selectedSlotIndex);
}

export function playerLoadItemInventory(player, simpleVehiclesVehicles) {
  const itemInv = player.getComponent("minecraft:inventory").container;
  const vehicleInventory = simpleVehiclesVehicles.getComponent(
    "minecraft:inventory"
  ).container;
  for (let index = 0; index < 7; index++) {
    const item = vehicleInventory.getItem(index);
    itemInv.setItem(index, item);
    vehicleInventory.setItem(index, undefined);
  }
  const slotIndex = player.getDynamicProperty(
    `simplevehicles_selected_slot_index`
  );
  player.selectedSlotIndex = slotIndex ? slotIndex : 0;
}

export function playerInventoryItems(player) {
  const itemInv = player.getComponent("minecraft:inventory").container;
  itemInv.addItem(new ItemStack("simple_vehicles:honk_item", 1));
  itemInv.addItem(new ItemStack("simple_vehicles:key", 1));
}


export function playerDeleteItemInventory(player) {
  const itemInv = player.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    itemInv.setItem(index, undefined);
  }
}

export function playerLockInventory(player) {
  const itemInv = player.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    const ItemSlot = itemInv.getSlot(index);
    if (!ItemSlot.getItem()) continue;
    ItemSlot.lockMode = "inventory";
  }
}

export function playerUnlockInventory(player) {
  const itemInv = player.getComponent("minecraft:inventory").container;
  for (let index = 0; index < 7; index++) {
    const ItemSlot = itemInv.getSlot(index);
    if (!ItemSlot.getItem()) continue;
    ItemSlot.lockMode = "none";
  }
}
