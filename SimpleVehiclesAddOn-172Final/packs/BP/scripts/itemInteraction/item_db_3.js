import {
  EquipmentSlot as P,
  ItemLockMode as K,
  ItemStack as ItemStackClass,
  EntityComponentTypes,
  StructureSaveMode,
  StructureAnimationMode as StructureAnimationMode,
  system,
  world,
} from "@minecraft/server";

/**
 * Vehicle item DB manager (entity + structureManager based)
 *
 * - Saves inventory to a temporary entity ("simple_vehicles:item_db")
 * - Creates a structure entry keyed by `simple_vehicles:item_db_<VEHICLE_ID>`
 * - Loads/places that structure when needed
 *
 * Notes:
 * - Be consistent with the structure key format: `simple_vehicles:item_db_${id}`
 * - Defensive checks avoid calling place/delete with undefined values
 */

// Configuration: define vehicles and default slot counts here
const vehicleConfigs = {
  // Example:
  "simple_vehicles:ae86": { slots: 9 },
  // add more vehicles:
  // "simple_vehicles:van": { slots: 27 },
};

// Utility to get structure key string
const structKeyFor = (entityId) => `simple_vehicles:item_db_${entityId}`;

// The entity ID to spawn for temporary item holder (must match your behavior pack entity)
const ITEM_DB_ENTITY_TYPE = "simple_vehicles:item_db";

// Main class
class VehicleItemDB {
  /**
   * Save first `slots` items of player's inventory into structure keyed by vehicle id
   * @param {Entity} vehicleEntity - entity that represents vehicle (or any object that has id & dimension & location)
   * @param {number} [slots=9] - how many slots to save (default 9)
   */
  itemDatabaseSave(vehicleEntity, slots = 9) {
    if (!vehicleEntity) return false;

    const invComp = vehicleEntity.getComponent(EntityComponentTypes.Inventory);
    if (!invComp) return false;

    // Spawn a temporary holder entity
    const temp = vehicleEntity.dimension.spawnEntity(ITEM_DB_ENTITY_TYPE, vehicleEntity.location);
    if (!temp) return false;

    // Tag it with vehicle id so we can lookup variations later
    temp.addTag(vehicleEntity.id);

    const tempInv = temp.getComponent("Inventory");
    if (!tempInv) {
      // cleanup
      temp.remove();
      return false;
    }

    // copy items into temp entity inventory
    for (let i = 0; i < slots; i++) {
      const item = invComp.container?.getItem(i);
      // setItem accepts undefined to clear slot
      tempInv.container?.setItem(i, item);
    }

    const key = structKeyFor(vehicleEntity.id);

    // If a previous structure with same id exists, delete it first (string key)
    try {
      world.structureManager.delete(key);
    } catch (e) {
      // ignore if not exists or delete fails
    }

    // Create structure from world (store only entities)
    try {
      world.structureManager.createFromWorld(key, vehicleEntity.dimension, temp.location, temp.location, {
        includeBlocks: false,
        includeEntities: true,
        saveMode: StructureSaveMode.World,
      });
    } catch (e) {
      // creation failed: cleanup
      temp.remove();
      return false;
    }

    // remove temporary holder entity
    temp.remove();
    return true;
  }

  /**
   * Place the stored structure near the vehicle and mark surrounding entities to keep
   * Returns true if successfully placed
   */
  itemDatabaseDrop(vehicleEntity) {
    if (!vehicleEntity) return false;

    const key = structKeyFor(vehicleEntity.id);
    const structureObj = world.structureManager.get(key);
    if (!structureObj) return false;

    // use a safe placement location (adjust if above world max)
    const placePos = { ...vehicleEntity.location };
    while (placePos.y > vehicleEntity.dimension.heightRange.max) placePos.y -= 1;

    // tag nearby entities to avoid removing them
    const nearbyEntitiesExact = vehicleEntity.dimension.getEntities({
      location: placePos,
      maxDistance: 50,
      minDistance: 0,
    });
    for (const ent of nearbyEntitiesExact) {
      ent.addTag("simple_vehicles_itemDBStay");
    }

    // place structure (includeEntities true). If place throws, bail out
    try {
      world.structureManager.place(structureObj, vehicleEntity.dimension, placePos, {
        includeBlocks: false,
        includeEntities: true,
        animationMode: StructureAnimationMode.None,
      });
    } catch (e) {
      // failed to place; remove stay tags we added
      for (const ent of nearbyEntitiesExact) {
        if (ent && ent.isValid() && ent.hasTag("simple_vehicles_itemDBStay")) {
          ent.removeTag("simple_vehicles_itemDBStay");
        }
      }
      return false;
    }

    // delete the saved structure (we placed its entities into the world)
    try {
      world.structureManager.delete(key);
    } catch (e) {
      // ignore deletion errors
    }

    // find the item_db entity that was just placed (type and tag vehicle id)
    const spawned = vehicleEntity.dimension.getEntities({
      type: ITEM_DB_ENTITY_TYPE,
      tags: [vehicleEntity.id],
    });

    if (spawned && spawned.length > 0) {
      const dbEntity = spawned[0];
      // trigger event and mark
      try {
        dbEntity.triggerEvent("simple_vehicles:drop_items_and_despawn");
      } catch (e) {}
      dbEntity.addTag("simple_vehicles:drop_items_and_despawn");
    }

    // cleanup: remove non-stay non-drop entities within radius
    const hap = vehicleEntity.dimension.getEntities({
      location: placePos,
      minDistance: 0,
      maxDistance: 50,
    });

    for (const ent of hap) {
      if (!ent || !ent.isValid()) continue;
      if (ent.hasTag("simple_vehicles_itemDBStay")) continue;
      if (ent.hasTag("simple_vehicles:drop_items_and_despawn")) continue;
      try {
        ent.remove();
      } catch (e) {}
    }

    // clear the temporary stay-tags from the earlier list (noe)
    const markedBefore = vehicleEntity.dimension.getEntities({
      location: placePos,
      minDistance: 50,
      maxDistance: 50,
    });
    for (const ent of markedBefore) {
      if (!ent || !ent.isValid()) continue;
      if (ent.hasTag("simple_vehicles_itemDBStay")) ent.removeTag("simple_vehicles_itemDBStay");
    }

    return true;
  }

  /**
   * Load stored inventory into vehicle's inventory (using structureManager get/place)
   * Returns true if items were loaded
   */
  itemDatabaseLoad(vehicleEntity) {
    if (!vehicleEntity) return false;

    const invComp = vehicleEntity.getComponent(EntityComponentTypes.Inventory);
    if (!invComp) return false;

    const key = structKeyFor(vehicleEntity.id);
    const structureObj = world.structureManager.get(key);
    if (!structureObj) {
      // no saved structure found
      return false;
    }

    // if vehicle is above world, don't load
    if (vehicleEntity.location.y > vehicleEntity.dimension.heightRange.max) return false;

    // mark nearby entities to keep
    const nearby = vehicleEntity.dimension.getEntities({
      location: vehicleEntity.location,
      minDistance: 0,
      maxDistance: 50,
    });
    for (const ent of nearby) ent.addTag("simple_vehicles_itemDBStay");

    // place structure temporarily (to spawn the item_db entity)
    try {
      world.structureManager.place(structureObj, vehicleEntity.dimension, vehicleEntity.location, {
        includeBlocks: false,
        includeEntities: true,
        animationMode: StructureAnimationMode.None,
      });
    } catch (e) {
      // cleanup tags
      for (const ent of nearby) if (ent && ent.isValid() && ent.hasTag("simple_vehicles_itemDBStay")) ent.removeTag("simple_vehicles_itemDBStay");
      return false;
    }

    // find the spawned item_db entity for this vehicle id
    const assist = vehicleEntity.dimension.getEntities({
      type: ITEM_DB_ENTITY_TYPE,
      tags: [vehicleEntity.id],
    });

    let loaded = false;
    if (assist && assist.length > 0) {
      const dbEnt = assist[0];
      const dbInv = dbEnt.getComponent(EntityComponentTypes.Inventory);
      if (dbInv) {
        // determine slots to read from configuration (default 9)
        const cfg = vehicleConfigs[vehicleEntity.typeId] ?? { slots: 9 };
        const slots = cfg.slots ?? 9;

        for (let s = 0; s < slots; s++) {
          const it = dbInv.container?.getItem(s);
          invComp.container?.setItem(s, it);
        }

        // remove the temporary db entity that was placed
        try {
          dbEnt.remove();
        } catch (e) {}
        loaded = true;
      }
    }

    // cleanup entities in place location that aren't marked as stay
    const placedNearby = vehicleEntity.dimension.getEntities({
      location: vehicleEntity.location,
      minDistance: 0,
      maxDistance: 50,
    });
    for (const ent of placedNearby) {
      if (!ent || !ent.isValid()) continue;
      if (!ent.hasTag("simple_vehicles_itemDBStay")) {
        try {
          ent.remove();
        } catch (e) {}
      }
    }

    // remove stay tags from the original nearby list
    for (const ent of nearby) {
      if (!ent || !ent.isValid()) continue;
      if (ent.hasTag("simple_vehicles_itemDBStay")) ent.removeTag("simple_vehicles_itemDBStay");
    }

    // also attempt to delete the structure key (safely) - sometimes createFromWorld leaves it
    try {
      world.structureManager.delete(key);
    } catch (e) {}

    return loaded;
  }

  /**
   * Clear the vehicle's first 9 slots (or up to configured slots)
   */
  itemDatabaseClearOnExit(vehicleEntity) {
    if (!vehicleEntity) return false;
    const invComp = vehicleEntity.getComponent(EntityComponentTypes.Inventory);
    if (!invComp) return false;

    const cfg = vehicleConfigs[vehicleEntity.typeId] ?? { slots: 9 };
    const slots = cfg.slots ?? 9;
    for (let i = 0; i < slots; i++) {
      invComp.container?.setItem(i, undefined);
    }
    return true;
  }

  /**
   * Convenience wrappers used in other parts of your code
   */
  // wrapper name same as your earlier code expects
  loadItems(entity) {
    return this.itemDatabaseLoad(entity);
  }
  clearHotBar(entity) {
    return this.itemDatabaseClearOnExit(entity);
  }
}

// Export singleton the rest of your code expects: itemSave
const itemSave = new VehicleItemDB();

/* -------------------------
  Example: hotbar helper that uses vehicleConfigs
  Replace usages in your other code to use vehicleConfigs and itemSave
--------------------------*/

// Example: helper to give vehicle hotbar -- adapted to use `vehicleConfigs` property names used earlier
function giveVehicleHotBar(playerEntity, inventoryComponent, ridingData) {
  // ridingData includes { entity: vehicleEntity, seatPosition: number }
  const vehicleEntity = ridingData.entity;
  const cfg = vehicleConfigs[vehicleEntity.typeId];
  if (!cfg) return;

  // for hotbar we use cfg.slots or default 9
  const slots = cfg.slots ?? 9;

  for (let slot = 0; slot < 9; slot++) {
    // if config has a custom hotbar mapping you can set that up in vehicleConfigs
    // fallback: empty slot filler
    if (slot >= slots) {
      const d = new ItemStackClass("simple_vehicles:empty_slot", 1);
      d.lockMode = K.slot;
      inventoryComponent.container?.setItem(slot, d);
      continue;
    }

    // if you'd like to create custom hotbar items per vehicle type, add a `hotbar` array to vehicleConfigs
    // Example vehicleConfigs["simple_vehicles:ae86"].hotbar = [ ... ];
    let itemId = "simple_vehicles:honk_item"; // fallback default
    if (cfg.hotbar && cfg.hotbar[slot] !== undefined) {
      const candidate = cfg.hotbar[slot];
      itemId = typeof candidate === "object" && candidate.getItem ? candidate.getItem(vehicleEntity) : candidate;
    }

    const stack = new ItemStackClass(itemId, 1);
    stack.lockMode = K.slot;
    inventoryComponent.container?.setItem(slot, stack);
  }
}

/* -------------------------
  Export / attach to global if needed
  Replace the rest of your code's calls:
   - itemSave.save / load / drop / clearHotBar
--------------------------*/

// expose for other scripts
globalThis.itemSave = itemSave;
globalThis.vehicleConfigs = vehicleConfigs;
globalThis.giveVehicleHotBar = giveVehicleHotBar;

/* -------------------------
  Minimal periodic tick example (use your own RMPlayerDATA / run logic)
--------------------------*/
function tickAll() {
  // call any per-tick logic you need. Kept intentionally empty here.
}
system.runInterval(tickAll, 0);
