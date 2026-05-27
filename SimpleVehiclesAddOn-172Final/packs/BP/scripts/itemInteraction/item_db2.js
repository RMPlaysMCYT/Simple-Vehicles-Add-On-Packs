import { ItemLockMode, ItemStack } from "@minecraft/server";

const HOTBAR_SIZE = 9;
const memoryHotbars = {};
const DEFAULT_VEHICLE_CONTROL_ITEMS = ["simple_vehicles:honk_item"];

const VehicleControlItemSetPacks = {
  "simple_vehicles:ae86": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
    "simple_vehicles:tool_window_open",
  ],
  "simple_vehicles:ambulance": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:apv": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:bus_2": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:bus": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:apv": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:car": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:corolla": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
  "simple_vehicles:ev_4": [
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
  ],
};

const SimVehAllControls = new Set([
  "simple_vehicles:honk_item",
  "simple_vehicles:key",
  "simple_vehicles:tool_window_open",
  "simple_vehicles:tool_windshield",
]);

function getInventoryContainer(entity) {
  const inventory = entity.getComponent("minecraft:inventory");
  return inventory?.container;
}

function getVehicleControlItemIds(vehicleEntity) {
  const vehicleTypeId = vehicleEntity?.typeId;
  const itemIds = vehicleTypeId
    ? VehicleControlItemSetPacks[vehicleTypeId] ?? DEFAULT_VEHICLE_CONTROL_ITEMS
    : DEFAULT_VEHICLE_CONTROL_ITEMS;

  return itemIds.filter((itemId) => SimVehAllControls.has(itemId));
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

export function playerInventoryItems(player, vehicleEntity) {
  try {
    const inv = getInventoryContainer(player);
    if (!inv) return;

    const controlItems = getVehicleControlItemIds(vehicleEntity);

    for (let i = 0; i < HOTBAR_SIZE; i++) {
      const itemId = controlItems[i];
      inv.setItem(i, itemId ? new ItemStack(itemId, 1) : undefined);
    }

    for (let i = controlItems.length; i < HOTBAR_SIZE; i++) {
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