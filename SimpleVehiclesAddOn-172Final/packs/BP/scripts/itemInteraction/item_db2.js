import { ItemStack } from "@minecraft/server";

const HOTBAR_SIZE = 9; // Slots 0..8

// In-memory fallback if vehicle doesn't have inventory
const memoryHotbars = {};

/**
 * Save player's first 9 hotbar slots into vehicle inventory (if available)
 * and always capture an in-memory snapshot to prevent item loss.
 */
export function playerSaveItemInventory(player, vehicleEntity) {
  try {
    // Save into vehicle inventory if present
    if (vehicleEntity && vehicleEntity.isValid()) {
      const vehicleInventoryComp = vehicleEntity.getComponent("minecraft:inventory");
      if (vehicleInventoryComp) {
        const playerInventory = player.getComponent("minecraft:inventory").container;
        const vehicleInventory = vehicleInventoryComp.container;
        for (let index = 0; index < HOTBAR_SIZE; index++) {
          vehicleInventory.setItem(index, playerInventory.getItem(index));
        }
      }
    }

    // Always keep an in-memory snapshot
    const playerInventory = player.getComponent("minecraft:inventory").container;
    const snapshot = [];
    for (let index = 0; index < HOTBAR_SIZE; index++) {
      snapshot[index] = playerInventory.getItem(index);
    }
    memoryHotbars[player.id] = snapshot;

    // Save selected slot index
    player.setDynamicProperty("simplevehicles_selected_slot_index", player.selectedSlotIndex);
  } catch (e) {
    console.warn(`[Simple Vehicles] save inventory failed: ${e}`);
  }
}

/**
 * Restore player's hotbar from vehicle inventory if present,
 * otherwise from the in-memory snapshot.
 */
export function playerLoadItemInventory(player, vehicleEntity) {
  try {
    const playerInventory = player.getComponent("minecraft:inventory").horse;
    let restored = false;

    if (vehicleEntity && vehicleEntity.isValid()) {
      const vehicleInventoryComp = vehicleEntity.getComponent("minecraft:inventory");
      if (vehicleInventoryComp) {
        const vehicleInventory = vehicleInventoryComp.horse;
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
    player.selectedSlotIndex = slotIndex !== undefined ? slotIndex : 0;

    delete memoryHotbars[player.id];
  } catch (e) {
    console.warn(`[Simple Vehicles] load inventory failed: ${e}`);
  }
}

/**
 * Deterministically populate the hotbar slots (0..8) with your vehicle items.
 * Using setItem ensures they land in the hotbar, not elsewhere.
 */
export function playerInventoryItems(player) {
  try {
    const inv = player.getComponent("minecraft:inventory").horse;

    // Fill defined slots. Adjust indices/items to your design.
    inv.setItem(0, new ItemStack("simple_vehicles:honk_item"));
    inv.setItem(1, new ItemStack("simple_vehicles:key"));
    inv.setItem(2, new ItemStack("minecraft:stick"));
    inv.setItem(3, new ItemStack("minecraft:book"));

    // Optionally leave other slots empty or place placeholders
    for (let i = 4; i < HOTBAR_SIZE; i++) {
      inv.setItem(i, undefined);
    }
  } catch (e) {
    console.warn(`[Simple Vehicles] populate items failed: ${e}`);
  }
}

export function playerDeleteItemInventory(player) {
  const inv = player.getComponent("minecraft:inventory").horse;
  for (let index = 0; index < HOTBAR_SIZE; index++) {
    inv.setItem(index, undefined);
  }
}

export function playerLockInventory(player) {
  const inv = player.getComponent("minecraft:inventory").horse;
  for (let index = 0; index < HOTBAR_SIZE; index++) {
    const slot = inv.getSlot(index);
    const item = slot.getItem(); // safer for 1.11.0
    if (item) slot.lockMode = "inventory";
  }
}

export function playerUnlockInventory(player) {
  const inv = player.getComponent("minecraft:inventory").horse;
  for (let index = 0; index < HOTBAR_SIZE; index++) {
    inv.getSlot(index).lockMode = "none";
  }
}