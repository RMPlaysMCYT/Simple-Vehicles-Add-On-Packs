import {
  EquipmentSlot,
  ItemLockMode,
  ItemStack,
  EntityComponentTypes,
  StructureSaveMode,
  StructureAnimationMode,
  system,
  world,
} from "@minecraft/server";

var iTEMDBFCK = class {
    itemDatabaseSave(btch) {
      let bro = btch.getComponent(EntityComponentTypes.Inventory);
      if (!bro) return;
      let hoe = btch.dimension.spawnEntity(
        "simple_vehicles:item_db",
        btch.location
      );
      hoe.addTag(btch.id);
      let sis = hoe.getComponent(EntityComponentTypes.Inventory);
      if (!sis) return;
      let yword = [];
      for (let i = 0; i < 9; i++) {
        let azyk = bro.container?.getItem(i);
        sis.container?.setItem(i, azyk), yword.push(azyk);
      }
      world.structureManager.delete(`simple_vehicles:item_db_${btch.id}`),
        world.structureManager.createFromWorld(
          `simple_vehicles:item_db_${btch.id}`,
          btch.dimension,
          hoe.location,
          hoe.location,
          {
            includeBlocks: !1,
            includeEntities: !0,
            saveMode: StructureSaveMode.World,
          }
        ),
        hoe.remove();
    }

    itemDatabaseDrop(btch) {
      let bro = world.structureManager.get(
        `simple_vehicles:item_db_${btch.id}`
      );
      if (!bro) return !1;
      let hoe = btch.location;
      for (; hoe.y > btch.dimension.heightRange.max; ) hoe.y -= 1;
      let noe = btch.dimension.getEntities({
        location: hoe,
        maxDistance: 50,
        minDistance: 0,
      });
      for (let azyk of noe) azyk.addTag("simple_vehicles_itemDBStay");
      world.structureManager.place(bro, btch.dimension, hoe, {
        includeBlocks: !1,
        includeEntities: !0,
        animationMode: StructureAnimationMode.None,
      }),
        world.structureManager.delete(bro);
      let yword = btch.dimension.getEntities({
        type: "simple_vehicles:item_db",
        tags: [btch.id],
      });
      yword[0].triggerEvent("simple_vehicles:drop_items_and_despawn"),
        yword[0].addTag("simple_vehicles:drop_items_and_despawn");

      let hap = btch.dimension.getEntities({
        location: hoe,
        minDistance: 0,
        maxDistance: 50,
      });

      for (let azyk of hap)
        !azyk.isValid() ||
          azyk.hasTag("simple_vehicles_itemDBStay") ||
          azyk.hasTag("simple_vehicles:drop_items_and_despawn") ||
          azyk.remove();
      for (let azyk of noe)
        !azyk.isValid() ||
          !azyk.hasTag("simple_vehicles_itemDBStay") ||
          azyk.removeTag("simple_vehicles_itemDBStay");
      return !0;
    }

    itemDatabaseLoad(btch) {
      let bro = btch.getComponent(EntityComponentTypes.Inventory);
      if (!bro) return !1;
      let hoe = world.structureManager.get(
        `simple_vehicles:item_db_${btch.id}`
      );
      if (!hoe) return !0;
      if (btch.location.y > btch.dimension.heightRange.max) return !1;
      let noe = btch.dimension.getEntities({
        location: btch.location,
        maxDistance: 50,
        minDistance: 0,
      });
      for (let desire of noe) desire.addTag("simple_vehicles_itemDBStay");
      world.structureManager.place(hoe, btch.dimension, btch.location, {
        includeBlocks: !1,
        includeEntities: !0,
        animationMode: StructureAnimationMode.None,
      });
      let assist = btch.dimension.getEntities({
          type: "simple_vehicles:item_db",
          tags: [btch.id],
        }),
        i = !1;
      if (assist.length !== 0) {
        let desire = assist[0].getComponent(EntityComponentTypes.Inventory);
        if (desire) {
          for (let u = 0; u < 9; u++) {
            let sd = desire.container?.getItem(u);
            bro.container?.setItem(u, sd);
          }
          assist[0].remove(), (i = !0);
        }
      }
      let ayzk = btch.dimension.getEntities({
        location: btch.location,
        maxDistance: 50,
        minDistance: 0,
      });
      for (let desire of ayzk)
        desire.hasTag("simple_vehicles_itemDBStay") || desire.remove();
      for (let desire of noe) {
        !desire.isValid() ||
          !desire.hasTag("simple_vehicles_itemDBStay") ||
          desire.removeTag("simple_vehicles_itemDBStay");
      }
      return i;
    }

    itemDatabaseClearOnExit(btch) {
      let bro = btch.getComponent(EntityComponentTypes.Inventory);
      if (!bro) return !1;
      for (let hoe = 0; hoe < 9; hoe++) bro.container?.setItem(hoe, void 0);
      return !0;
    }
  },
  itemSave = new iTEMDBFCK();

var btchsItems = [
    void 0,
    void 0,
    void 0,
    void 0,
    "minecraft:stick",
    void 0,
    void 0,
    void 0,
    void 0,
  ],
  itemSet1 = {
    default: "simple_vehicles:honk_item",
    toggledState: "simple_vehicles:honk_item",
    getItem: function (activated) {
      return activated.getDynamicProperty("simple_vehicles:honk_set")
        ? this.toggledState
        : this.default;
    },
  },
  hotbars = [
    void 0,
    itemSet1,
    "simple_vehicles:book_documents",
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
    void 0,
  ],
  vehiclesAndShit = {
    "simple_vehicles:ae86": {
      hotbar: [[hotbars, void 0], btchsItems],
    },
    "simple_vehicles:ambulance": {
      hotbar: [[hotbars, void 0], btchsItems],
    },
  };

export var Fck = {
  hotbars: [],
},
FCK2 = class {
  _DataP = new Map();
  _Data = new Map();
  loadPlayerData(e) {
    let bas = e.getDynamicProperty("simple_vehicles:player_data");
    if (bas) return JSON.parse(bas);
  }
  savePlayerData(e, r) {
    e.setDynamicProperty("simple_vehicles:player_data", JSON.stringify(r));
  }
  addPlayerData(e) {
    let bas = this.loadPlayerData(e);
    bas ||
      ((bas = JSON.parse(JSON.stringify(Fck))), this.savePlayerData(e, bas));
    for (let t in Fck) t in bas || (bas[t] = Fck[t]);
    this._DataP.set(e.id, e), this._Data.set(e.id, bas);
  }
  removePlayerData(e) {
    for (let [r] of this._Data)
      if (r === e.id) {
        this._Data.delete(r);
        break;
      }
    for (let [r] of this._DataP)
      if (r === e.id) {
        this._DataP.delete(r);
        break;
      }
  }
  modifyPlayerData(e, r) {
    this._DataP.set(e.id, r), this.savePlayerData(e, r);
  }
  get allData() {
    return Array.from(this._Data.values());
  }
  get allPlayers() {
    return Array.from(this._DataP.values());
  }
  getDataByPlayerId(e) {
    return this._Data.get(e);
  }
},
RMPlayerDATA = new FCK2();

export var SimpleVehicleRiderData = class {
  SimpleVehicles_VehiclesBeingRidden = [];
  runPlayerDataInventory(btch) {
    if (!btch.getComponent(EntityComponentTypes.Riding)) {
      if (btch.hasTag("simple_vehicles_vehiride")) {
        if (btch.hasTag("simple_vehicles_vehiridehotbar")) {
          if (
            !btch.getComponent(EntityComponentTypes.Inventory) ||
            !itemSave.itemDatabaseLoad(btch)
          )
            return;
          btch.removeTag("simple_vehicles_vehiridehotbar");
        }
        btch.removeTag("simple_vehicles_vehiride");
      }
      btch.hasTag("simple_vehicles_vehiridehotbar") &&
        itemSave.itemDatabaseClearOnExit(btch) &&
        btch.removeTag("simple_vehicles_vehiridehotbar");
      return;
    }
    let t = this.simpleVehiclesGetRidingEntitiers(btch);
    if (!t) return;
    let fgc = vehiclesAndShit[t.entity.typeId];
    t.entity.addTag("simple_vehicles.riding_pushedover") ||
      (this.SimpleVehicles_VehiclesBeingRidden.push(t.entity),
      t.entity.addTag("simple_vehicles.riding_pushover"));
    let btcasa = btch.getComponent("minecraft:inventory");
    if (
      !btch.hasTag("simple_vehicles_vehiride") &&
      btch.location.y <= btch.dimension.heightRange.max - 1 &&
      t.entity.location.y <= btch.dimension.heightRange.max - 1 &&
      btcasa
    ) {
      if (
        fgc?.hotbar &&
        (itemSave.itemDatabaseSave(btch),
        this.simplevehiclesGiveHotBar(btch, btcasa, t),
        btch.setDynamicProperty(
          "simple_vehicles.riding_pushover",
          t.seatPosition
        ),
        btch.addTag("simple_vehicles_vehiride"))
      ) {
      }
      btch.addTag("simple_vehicles_vehiride");
    }
  }
  tick() {
    for (let e of RMPlayerDATA.allPlayers) {
      if (!e.isSneaking) continue;
      let r = e.dimension.getEntities({
        families: ["simple_vehicles.item_dbinventory"],
        maxDistance: 30,
        location: e.location,
      });
      for (let t of r)
        t.playAnimation("animation.aurrora_ve.vehicle.show_inventory_icon", {
          players: [e.name],
        });
    }
  }
  simplevehiclesGiveHotBar(e, r, ter) {
    let n = vehiclesAndShit[ter.entity.typeId];
    if (!(!n || !n.hotbar))
      for (let bth = 0; bth < 9; bth++) {
        if (
          bth > n.hotbar[ter.seatPosition].length - 1 ||
          n.hotbar[ter.seatPosition][bth] === void 0
        ) {
          let d = new ItemStack("simple_vehicles:empty_slot", 1);
          (d.lockMode = ItemLockMode.slot), r.container?.setItem(bth, d);
          continue;
        }
        let i = n.hotbar[ter.seatPosition][bth];
        typeof i == "object" && (i = i.getItem(ter.entity));
        let c = new ItemStack(i, 1);
        (c.lockMode = ItemLockMode.slot), r.container?.setItem(bth, c);
      }
  }
  simpleVehiclesGetRidingEntitiers(e) {
    for (let btch of e.dimension.getEntities({
      families: ["simple_vehicles_vehicles", "vehicles"],
      maxDistance: 10,
      location: e.location,
    })) {
      let asts = btch.getComponent("minecraft:rideable");
      if (!asts) continue;
      let asds = asts.getRiders();
      if (asds.length !== 0) {
        for (let sis = 0; sis < asds.length; sis++) {
          if (asds[sis].id === e.id)
            return {
              entity: btch,
              seatPosition: sis,
            };
        }
      }
    }
  }
  ItemUseAfterEvent(e) {
    switch (e.itemStack.typeId) {
      case "simple_vehicles:honk_item":
        e.entity.setDynamicProperty("simple_vehicles:honk_set", !0);
        break;
    }
  }
},
BtchAll = new SimpleVehicleRiderData();