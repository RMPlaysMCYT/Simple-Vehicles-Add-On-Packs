import { ItemLockMode, ItemStack } from "@minecraft/server";

const HOTBAR_SIZE = 9;
/** @type {Record<string, (ItemStack | undefined)[]>} */
const memoryHotbars = {};

const DEFAULT_VEHICLE_CONTROL_ITEMS = ["simple_vehicles:honk_item"];

/** @type {Record<string, string[]>} */
const VehicleControlItemSetPacks = {
    "simple_vehicles:ae86": ["simple_vehicles:honk_item", "simple_vehicles:key", "simple_vehicles:tool_window_open"],
    "simple_vehicles:ambulance": ["simple_vehicles:honk_item", "simple_vehicles:key"],
    // ↑ removed duplicate apv entry — second one was silently overwriting the first
    "simple_vehicles:apv": ["simple_vehicles:honk_item", "simple_vehicles:key"],
    "simple_vehicles:bus_2": ["simple_vehicles:honk_item", "simple_vehicles:key"],
    "simple_vehicles:bus": ["simple_vehicles:honk_item", "simple_vehicles:key"],
    "simple_vehicles:car": ["simple_vehicles:honk_item", "simple_vehicles:key"],
    "simple_vehicles:corolla": ["simple_vehicles:honk_item", "simple_vehicles:key"],
    "simple_vehicles:ev_4": ["simple_vehicles:honk_item", "simple_vehicles:key"],
};

const SimVehAllControls = new Set([
    "simple_vehicles:honk_item",
    "simple_vehicles:key",
    "simple_vehicles:tool_window_open",
    "simple_vehicles:tool_windshield",
]);

/**
 * Safely check if an entity reference is still alive.
 * 2.x changed isValid from a method to a getter property.
 * This wrapper handles both forms so it won't break on API bumps.
 * @param {import("@minecraft/server").Entity | undefined | null} entity
 */
function isEntityValid(entity) {
    if (!entity) return false;
    // 2.x: property. 1.x: method. Handle both defensively.
    const v = entity.isValid;
    return typeof v === "function" ? v() : !!v;
}

/**
 * @param {import("@minecraft/server").Entity} entity
 * @returns {import("@minecraft/server").Container | undefined}
 */
function getInventoryContainer(entity) {
    return entity.getComponent("minecraft:inventory")?.container;
}

/**
 * @param {import("@minecraft/server").Entity} vehicleEntity
 * @returns {string[]}
 */
function getVehicleControlItemIds(vehicleEntity) {
    const itemIds = isEntityValid(vehicleEntity)
        ? (VehicleControlItemSetPacks[vehicleEntity.typeId] ?? DEFAULT_VEHICLE_CONTROL_ITEMS)
        : DEFAULT_VEHICLE_CONTROL_ITEMS;

    // Only allow items that are registered as valid control items
    return itemIds.filter(id => SimVehAllControls.has(id));
}

/**
 * Snapshots the player's hotbar into memory AND into the vehicle's inventory container.
 * Called on vehicle enter, before hotbar is replaced.
 * @param {import("@minecraft/server").Player} player
 * @param {import("@minecraft/server").Entity} vehicleEntity
 */
export function playerSaveItemInventory(player, vehicleEntity) {
    try {
        const playerInv = getInventoryContainer(player);
        if (!playerInv) return;

        // Always snapshot to memory first — this is the reliable fallback
        const snapshot = [];
        for (let i = 0; i < HOTBAR_SIZE; i++) {
            snapshot[i] = playerInv.getItem(i);
        }
        memoryHotbars[player.id] = snapshot;

        // Also mirror to vehicle container if available (survives crashes / log-outs better)
        if (isEntityValid(vehicleEntity)) {
            const vehicleInv = getInventoryContainer(vehicleEntity);
            if (vehicleInv) {
                for (let i = 0; i < HOTBAR_SIZE; i++) {
                    vehicleInv.setItem(i, snapshot[i]);
                }
            }
        }

        player.setDynamicProperty(
            "simplevehicles_selected_slot_index",
            player.selectedSlotIndex
        );
    } catch (e) {
        console.warn(`[Simple Vehicles] playerSaveItemInventory failed: ${e}`);
    }
}

/**
 * Restores the player's hotbar from vehicle container (preferred) or memory fallback.
 * Called on vehicle leave, after hotbar is cleared.
 * @param {import("@minecraft/server").Player} player
 * @param {import("@minecraft/server").Entity | undefined} vehicleEntity
 */
export function playerLoadItemInventory(player, vehicleEntity) {
    try {
        const playerInv = getInventoryContainer(player);
        if (!playerInv) return;

        let restored = false;

        // Prefer vehicle container — reflects any hotbar changes made while riding
        if (isEntityValid(vehicleEntity)) {
            const vehicleInv = getInventoryContainer(vehicleEntity);
            if (vehicleInv) {
                for (let i = 0; i < HOTBAR_SIZE; i++) {
                    playerInv.setItem(i, vehicleInv.getItem(i));
                    vehicleInv.setItem(i, undefined); // clean up vehicle slots
                }
                restored = true;
            }
        }

        // Fallback: use the in-memory snapshot taken at mount time
        if (!restored) {
            const snapshot = memoryHotbars[player.id];
            if (snapshot) {
                for (let i = 0; i < HOTBAR_SIZE; i++) {
                    playerInv.setItem(i, snapshot[i]);
                }
                restored = true;
            }
        }

        if (!restored) {
            console.warn(`[Simple Vehicles] playerLoadItemInventory: no restore source for ${player.name}`);
        }

        // Restore previously selected slot
        const slotIndex = player.getDynamicProperty("simplevehicles_selected_slot_index");
        if (typeof slotIndex === "number") {
            try {
                player.selectedSlotIndex = slotIndex;
            } catch {
                // selectedSlotIndex setter may not exist in all 2.x builds — safe to ignore
            }
        }

        delete memoryHotbars[player.id];
    } catch (e) {
        console.warn(`[Simple Vehicles] playerLoadItemInventory failed: ${e}`);
    }
}

/**
 * Populates the player's hotbar with the correct control items for the given vehicle.
 * @param {import("@minecraft/server").Player} player
 * @param {import("@minecraft/server").Entity} vehicleEntity
 */
export function playerInventoryItems(player, vehicleEntity) {
    try {
        const inv = getInventoryContainer(player);
        if (!inv) return;

        const controlItems = getVehicleControlItemIds(vehicleEntity);

        for (let i = 0; i < HOTBAR_SIZE; i++) {
            inv.setItem(i, controlItems[i] ? new ItemStack(controlItems[i], 1) : undefined);
        }
    } catch (e) {
        console.warn(`[Simple Vehicles] playerInventoryItems failed: ${e}`);
    }
}

/**
 * Clears all hotbar slots.
 * @param {import("@minecraft/server").Player} player
 */
export function playerDeleteItemInventory(player) {
    try {
        const inv = getInventoryContainer(player);
        if (!inv) return;
        for (let i = 0; i < HOTBAR_SIZE; i++) inv.setItem(i, undefined);
    } catch (e) {
        console.warn(`[Simple Vehicles] playerDeleteItemInventory failed: ${e}`);
    }
}

/**
 * Locks all occupied hotbar slots so the player can't drop or move control items.
 * @param {import("@minecraft/server").Player} player
 */
export function playerLockInventory(player) {
    try {
        const inv = getInventoryContainer(player);
        if (!inv) return;
        for (let i = 0; i < HOTBAR_SIZE; i++) {
            const item = inv.getItem(i);
            if (!item) continue;
            item.lockMode = ItemLockMode.slot;
            inv.setItem(i, item);
        }
    } catch (e) {
        console.warn(`[Simple Vehicles] playerLockInventory failed: ${e}`);
    }
}

/**
 * Unlocks all hotbar slots. Call before restoring inventory.
 * @param {import("@minecraft/server").Player} player
 */
export function playerUnlockInventory(player) {
    try {
        const inv = getInventoryContainer(player);
        if (!inv) return;
        for (let i = 0; i < HOTBAR_SIZE; i++) {
            const item = inv.getItem(i);
            if (!item) continue;
            item.lockMode = ItemLockMode.none;
            inv.setItem(i, item);
        }
    } catch (e) {
        console.warn(`[Simple Vehicles] playerUnlockInventory failed: ${e}`);
    }
}