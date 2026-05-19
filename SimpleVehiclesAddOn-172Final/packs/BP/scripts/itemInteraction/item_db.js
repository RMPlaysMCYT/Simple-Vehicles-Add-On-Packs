import {
  ItemLockMode,
  ItemStack,
  StructureAnimationMode,
  StructureSaveMode,
  world,
} from "@minecraft/server";

/* =========================
   Vehicle hotbar item sets
========================= */

const emptyHotbar = [
  undefined,
  undefined,
  undefined,
  undefined,
  "minecraft:stick",
  undefined,
  undefined,
  undefined,
  undefined,
];

const honkItemSet = {
  default: "simple_vehicles:honk_item",
  toggledState: "simple_vehicles:honk_item",
  getItem(vehicle) {
    return vehicle.getDynamicProperty("simple_vehicles:honk_set")
      ? this.toggledState
      : this.default;
  },
};

const jump1ItemSet = {
  default: "simple_vehicles:jump1_item",
  toggledState: "simple_vehicles:jump1_item",
  getItem(vehicle) {
    return vehicle.getDynamicProperty("simple_vehicles:jump1_item_activated")
      ? this.toggledState
      : this.default;
  },
};

const jump2ItemSet = {
  default: "simple_vehicles:jump2_item",
  toggledState: "simple_vehicles:jump2_item",
  getItem(vehicle) {
    return vehicle.getDynamicProperty("simple_vehicles:jump2_item_activated")
      ? this.toggledState
      : this.default;
  },
};

const defaultVehicleHotbar = [
  undefined,
  honkItemSet,
  "simple_vehicles:book_documents",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const VEHICLE_CONFIG = {
  "simple_vehicles:ae86": {
    collision: 3,
    hotbar: [
      [
        undefined,
        undefined,
        undefined,
        undefined,
        honkItemSet,
        jump2ItemSet,
        "minecraft:stick",
        undefined,
        undefined,
      ],
      emptyHotbar,
    ],
  },

  "simple_vehicles:ambulance": {
    collision: 3,
    hotbar: [defaultVehicleHotbar, emptyHotbar],
  },

  "simple_vehicles:bike": {
    collision: 2,
    hotbar: [
      [
        undefined,
        undefined,
        undefined,
        undefined,
        honkItemSet,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      emptyHotbar,
    ],
  },
};

/* =========================
   Inventory save / load
========================= */

class VehicleInventoryDatabase {
  getStructureId(player) {
    return `simple_vehicles:item_db_${player.id}`;
  }

  saveHotbar(player) {
    const playerInventory = player.getComponent("minecraft:inventory");
    if (!playerInventory?.container) return false;

    const tempEntity = player.dimension.spawnEntity(
      "simple_vehicles:item_db",
      player.location
    );

    tempEntity.addTag(player.id);

    const tempInventory = tempEntity.getComponent("minecraft:inventory");
    if (!tempInventory?.container) {
      tempEntity.remove();
      return false;
    }

    for (let slot = 0; slot < 9; slot++) {
      const item = playerInventory.container.getItem(slot);
      tempInventory.container.setItem(slot, item);
    }

    const structureId = this.getStructureId(player);

    try {
      world.structureManager.delete(structureId);
    } catch {}

    world.structureManager.createFromWorld(
      structureId,
      player.dimension,
      tempEntity.location,
      tempEntity.location,
      {
        includeBlocks: false,
        includeEntities: true,
        saveMode: StructureSaveMode.World,
      }
    );

    tempEntity.remove();
    return true;
  }

  loadHotbar(player) {
    const playerInventory = player.getComponent("minecraft:inventory");
    if (!playerInventory?.container) return false;

    const structureId = this.getStructureId(player);
    const structure = world.structureManager.get(structureId);

    if (!structure) {
      return true;
    }

    if (player.location.y > player.dimension.heightRange.max) {
      return false;
    }

    const nearbyBefore = player.dimension.getEntities({
      location: player.location,
      maxDistance: 50,
    });

    for (const entity of nearbyBefore) {
      entity.addTag("simple_vehicles:item_db_stay");
    }

    world.structureManager.place(structure, player.dimension, player.location, {
      includeBlocks: false,
      includeEntities: true,
      animationMode: StructureAnimationMode.None,
    });

    const dbEntities = player.dimension.getEntities({
      type: "simple_vehicles:item_db",
      tags: [player.id],
    });

    let loaded = false;

    if (dbEntities.length > 0) {
      const dbEntity = dbEntities[0];
      const dbInventory = dbEntity.getComponent("minecraft:inventory");

      if (dbInventory?.container) {
        for (let slot = 0; slot < 9; slot++) {
          const item = dbInventory.container.getItem(slot);
          playerInventory.container.setItem(slot, item);
        }

        dbEntity.remove();
        loaded = true;
      }
    }

    const nearbyAfter = player.dimension.getEntities({
      location: player.location,
      maxDistance: 50,
    });

    for (const entity of nearbyAfter) {
      if (!entity.hasTag("simple_vehicles:item_db_stay")) {
        if (entity.isValid()) entity.remove();
      }
    }

    for (const entity of nearbyBefore) {
      if (entity.isValid() && entity.hasTag("simple_vehicles:item_db_stay")) {
        entity.removeTag("simple_vehicles:item_db_stay");
      }
    }

    return loaded;
  }

  dropSavedItems(player) {
    const structureId = this.getStructureId(player);
    const structure = world.structureManager.get(structureId);
    if (!structure) return false;

    const spawnLocation = {
      x: player.location.x,
      y: Math.min(player.location.y, player.dimension.heightRange.max),
      z: player.location.z,
    };

    const nearbyBefore = player.dimension.getEntities({
      location: spawnLocation,
      maxDistance: 50,
    });

    for (const entity of nearbyBefore) {
      entity.addTag("simple_vehicles:item_db_stay");
    }

    world.structureManager.place(structure, player.dimension, spawnLocation, {
      includeBlocks: false,
      includeEntities: true,
      animationMode: StructureAnimationMode.None,
    });

    try {
      world.structureManager.delete(structureId);
    } catch {}

    const dbEntities = player.dimension.getEntities({
      type: "simple_vehicles:item_db",
      tags: [player.id],
    });

    if (dbEntities.length > 0) {
      const dbEntity = dbEntities[0];
      dbEntity.triggerEvent("simple_vehicles:drop_items_and_despawn");
      dbEntity.addTag("simple_vehicles:drop_items_and_despawn");
    }

    const nearbyAfter = player.dimension.getEntities({
      location: spawnLocation,
      maxDistance: 50,
    });

    for (const entity of nearbyAfter) {
      if (
        !entity.isValid() ||
        entity.hasTag("simple_vehicles:item_db_stay") ||
        entity.hasTag("simple_vehicles:drop_items_and_despawn")
      ) {
        continue;
      }

      entity.remove();
    }

    for (const entity of nearbyBefore) {
      if (entity.isValid() && entity.hasTag("simple_vehicles:item_db_stay")) {
        entity.removeTag("simple_vehicles:item_db_stay");
      }
    }

    return true;
  }

  clearHotbar(player) {
    const inventory = player.getComponent("minecraft:inventory");
    if (!inventory?.container) return false;

    for (let slot = 0; slot < 9; slot++) {
      inventory.container.setItem(slot, undefined);
    }

    return true;
  }
}

const vehicleInventoryDatabase = new VehicleInventoryDatabase();

/* =========================
   Player saved data
========================= */

export const DEFAULT_PLAYER_DATA = {
  hotbars: [],
};

class PlayerDataStore {
  constructor() {
    this.playerMap = new Map();
    this.dataMap = new Map();
  }

  loadPlayerData(player) {
    const raw = player.getDynamicProperty("simple_vehicles:player_data");
    if (!raw) return undefined;

    try {
      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }

  savePlayerData(player, data) {
    player.setDynamicProperty(
      "simple_vehicles:player_data",
      JSON.stringify(data)
    );
  }

  addPlayer(player) {
    let data = this.loadPlayerData(player);

    if (!data) {
      data = JSON.parse(JSON.stringify(DEFAULT_PLAYER_DATA));
      this.savePlayerData(player, data);
    }

    for (const key in DEFAULT_PLAYER_DATA) {
      if (!(key in data)) {
        data[key] = DEFAULT_PLAYER_DATA[key];
      }
    }

    this.playerMap.set(player.id, player);
    this.dataMap.set(player.id, data);
  }

  removePlayer(player) {
    this.playerMap.delete(player.id);
    this.dataMap.delete(player.id);
  }

  modifyPlayerData(player, data) {
    this.dataMap.set(player.id, data);
    this.savePlayerData(player, data);
  }

  get allPlayers() {
    return Array.from(this.playerMap.values());
  }

  get allData() {
    return Array.from(this.dataMap.values());
  }

  getDataByPlayerId(playerId) {
    return this.dataMap.get(playerId);
  }
}

export const RMPlayerDATA = new PlayerDataStore();

/* =========================
   Rider / vehicle hotbar logic
========================= */

export class SimpleVehicleRiderData {
  vehiclesBeingRidden = [];

  runPlayerDataInventory(player) {
    const rideableComponent = player.getComponent("minecraft:rideable");

    if (!rideableComponent) {
      if (player.hasTag("simple_vehicles_vehiride")) {
        if (player.hasTag("simple_vehicles_vehiridehotbar")) {
          const hasInventory = player.getComponent("minecraft:inventory");
          if (!hasInventory || !vehicleInventoryDatabase.loadHotbar(player)) {
            return;
          }

          player.removeTag("simple_vehicles_vehiridehotbar");
        }

        player.removeTag("simple_vehicles_vehiride");
      }

      if (player.hasTag("simple_vehicles_vehiridehotbar")) {
        if (vehicleInventoryDatabase.clearHotbar(player)) {
          player.removeTag("simple_vehicles_vehiridehotbar");
        }
      }

      return;
    }

    const ridingData = this.getRiddenVehicle(player);
    if (!ridingData) return;

    const vehicle = ridingData.entity;
    const vehicleConfig = VEHICLE_CONFIG[vehicle.typeId];
    const playerInventory = player.getComponent("minecraft:inventory");

    if (!vehicle.hasTag("simple_vehicles.riding_pushover")) {
      this.vehiclesBeingRidden.push(vehicle);
      vehicle.addTag("simple_vehicles.riding_pushover");
    }

    if (
      !player.hasTag("simple_vehicles_vehiride") &&
      player.location.y <= player.dimension.heightRange.max - 1 &&
      vehicle.location.y <= vehicle.dimension.heightRange.max - 1 &&
      playerInventory?.container
    ) {
      if (vehicleConfig?.hotbar) {
        vehicleInventoryDatabase.saveHotbar(player);
        this.giveVehicleHotbar(player, playerInventory, ridingData);
        player.setDynamicProperty(
          "simple_vehicles:riding_seat_position",
          ridingData.seatPosition
        );
      }

      player.addTag("simple_vehicles_vehiride");
      player.addTag("simple_vehicles_vehiridehotbar");
    }
  }

  tick() {
    for (const player of RMPlayerDATA.allPlayers) {
      if (!player.isValid() || !player.isSneaking) continue;

      const entities = player.dimension.getEntities({
        families: ["simple_vehicles.item_dbinventory"],
        maxDistance: 30,
        location: player.location,
      });

      for (const entity of entities) {
        entity.playAnimation(
          "animation.aurrora_ve.vehicle.show_inventory_icon",
          {
            players: [player.name],
          }
        );
      }
    }
  }

  giveVehicleHotbar(player, inventoryComponent, ridingData) {
    const vehicleConfig = VEHICLE_CONFIG[ridingData.entity.typeId];
    if (!vehicleConfig?.hotbar) return;

    const seatHotbar = vehicleConfig.hotbar[ridingData.seatPosition];
    if (!seatHotbar) return;

    for (let slot = 0; slot < 9; slot++) {
      const itemDef = seatHotbar[slot];

      if (itemDef === undefined) {
        const emptySlotItem = new ItemStack("simple_vehicles:empty_slot", 1);
        emptySlotItem.lockMode = ItemLockMode.slot;
        inventoryComponent.container?.setItem(slot, emptySlotItem);
        continue;
      }

      let itemId = itemDef;
      if (typeof itemDef === "object" && typeof itemDef.getItem === "function") {
        itemId = itemDef.getItem(ridingData.entity);
      }

      const item = new ItemStack(itemId, 1);
      item.lockMode = ItemLockMode.slot;
      inventoryComponent.container?.setItem(slot, item);
    }
  }

  getRiddenVehicle(player) {
    const nearbyVehicles = player.dimension.getEntities({
      families: ["simple_vehicles_vehicles", "vehicles"],
      maxDistance: 10,
      location: player.location,
    });

    for (const entity of nearbyVehicles) {
      const rideable = entity.getComponent("minecraft:rideable");
      if (!rideable) continue;

      const riders = rideable.getRiders();
      for (let i = 0; i < riders.length; i++) {
        if (riders[i].id === player.id) {
          return {
            entity,
            seatPosition: i,
          };
        }
      }
    }

    return undefined;
  }

  onItemUseAfter(event) {
    if (!event.itemStack || !event.entity) return;

    switch (event.itemStack.typeId) {
      case "simple_vehicles:honk_item":
        event.entity.setDynamicProperty("simple_vehicles:honk_set", true);
        break;
    }
  }
}

export const BtchAll = new SimpleVehicleRiderData();