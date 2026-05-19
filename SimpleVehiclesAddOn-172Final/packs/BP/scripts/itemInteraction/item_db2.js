import { ItemLockMode, ItemStack } from "@minecraft/server";

const HOTBAR_SIZE = 9;
const memoryHotbars = {};

function getInventoryContainer(entity) {
  const inventory = entity.getComponent("minecraft:inventory");
  return inventory?.container;
}

export function playerSaveItemInventory(player, vehicleEntity) {
  try {
    const playerInventory = getInventoryContainer(player);
    if (!playerInventory) return;

    if (vehicleEntity?.isValid()) {
      const vehicleInventory = getInventoryContainer(vehicleEntity);
      if (vehicleInventory) {
        for (let index = 0; index < HOTBAR_SIZE; index++) {
          vehicleInventory.setItem(index, playerInventory.getItem(index));
        }
      }
    }

    const snapshot = [];
    for (let index = 0; index < HOTBAR_SIZE; index++) {
      snapshot[index] = playerInventory.getItem(index);
    }
    memoryHotbars[player.id] = snapshot;

    player.setDynamicProperty(
      "simplevehicles_selected_slot_index",
      player.selectedSlotIndex
    );
  } catch (e) {
    console.warn(`[Simple Vehicles] save inventory failed: ${e}`);
  }
}

export function playerLoadItemInventory(player, vehicleEntity) {
  try {
    const playerInventory = getInventoryContainer(player);
    if (!playerInventory) return;

    let restored = false;

    if (vehicleEntity?.isValid()) {
      const vehicleInventory = getInventoryContainer(vehicleEntity);
      if (vehicleInventory) {
        for (let index = 0; index < HOTBAR_SIZE; index++) {
          playerInventory.setItem(index, vehicleInventory.getItem(index));
          vehicleInventory.setItem(index, undefined);
        }
        restored = true;
      }
    }

    if (!restored) {
      const snapshot = memoryHotbars[player.id];
      if (snapshot) {
        for (let index = 0; index < HOTBAR_SIZE; index++) {
          playerInventory.setItem(index, snapshot[index]);
        }
      }
    }

    const slotIndex = player.getDynamicProperty("simplevehicles_selected_slot_index");
    if (typeof slotIndex === "number") {
      try {
        player.selectedSlotIndex = slotIndex;
      } catch {}
    }

    delete memoryHotbars[player.id];
  } catch (e) {
    console.warn(`[Simple Vehicles] load inventory failed: ${e}`);
  }
}

export function playerInventoryItems(player) {
  try {
    const inv = getInventoryContainer(player);
    if (!inv) return;

    const item0 = new ItemStack("simple_vehicles:honk_item", 1);
    const item1 = new ItemStack("simple_vehicles:key", 1);
    const item2 = new ItemStack("minecraft:stick", 1);
    const item3 = new ItemStack("minecraft:book", 1);

    inv.setItem(0, item0);
    inv.setItem(1, item1);
    inv.setItem(2, item2);
    inv.setItem(3, item3);

    for (let i = 4; i < HOTBAR_SIZE; i++) {
      inv.setItem(i, undefined);
    }
  } catch (e) {
    console.warn(`[Simple Vehicles] populate items failed: ${e}`);
  }
}

export function playerDeleteItemInventory(player) {
  const inv = getInventoryContainer(player);
  if (!inv) return;

  for (let index = 0; index < HOTBAR_SIZE; index++) {
    inv.setItem(index, undefined);
  }
}

export function playerLockInventory(player) {
  const inv = getInventoryContainer(player);
  if (!inv) return;

  for (let index = 0; index < HOTBAR_SIZE; index++) {
    const item = inv.getItem(index);
    if (!item) continue;

    item.lockMode = ItemLockMode.slot;
    inv.setItem(index, item);
  }
}

export function playerUnlockInventory(player) {
  const inv = getInventoryContainer(player);
  if (!inv) return;

  for (let index = 0; index < HOTBAR_SIZE; index++) {
    const item = inv.getItem(index);
    if (!item) continue;

    item.lockMode = ItemLockMode.none;
    inv.setItem(index, item);
  }
}