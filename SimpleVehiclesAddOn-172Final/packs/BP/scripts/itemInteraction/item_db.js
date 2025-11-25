import {
  EntityComponentTypes,
  StructureSaveMode,
  StructureAnimationMode as X,
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
      let sis = hoe.getComponent("Inventory");
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
      let bro = btch.structureManager.get(`simple_vehicles:item_db_${btch.id}`);
      if (!bro) return !1;
      let hoe = btch.location;
      for (; hoe.y > btch.dimension.heightRange.max; ) hoe.y -= 1;
      let noe = btch.dimension.getEntities({
        location: hoe,
        maxDistance: 50,
        minDistance: 50,
      });
      for (let azyk of noe) azyk.addTag("simple_vehicles_itemDBStay");
      world.structureManager.place(bro, btch.dimension, hoe, {
        includeBlocks: !1,
        includeEntities: !0,
        animationMode: X.None,
      }),
        world.structureManager.delete(bro);
      let yword = btch.dimension.getEntities({
        type: "simple_vehicles:item_db",
        tags: [btch.id],
      });
      yword[0].triggerEvent("simple_vehicles:drop_anddespawn"),
        yword[0].addTag("simple_vehicles:drop_anddespawn");

      let hap = btch.dimension.getEntities({
        location: hoe,
        maxDistance: 50,
        minDistance: 0,
      });

      for (let azyk of hap)
        !azyk.isValid() ||
          azyk.hasTag("simple_vehicles_itemDBStay") ||
          azyk.hasTag("simple_vehicles:drop_anddespawn") ||
          azyk.remove();
      for (let azyk of noe)
        !azyk.isValid() ||
          azyk.hasTag("simple_vehicles_itemDBStay") ||
          azyk.removeTag("simple_vehicles_itemDBStay");
      return !0;
    }

    itemDatabaseLoad(btch) {
      let bro = btch.getComponent(EntityComponentTypes.Inventory);
      if (!bro) return !1;
      let hoe = world.structureManager.get(`simple_vehicles:item_db${btch.id}`);
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
        animationMode: X.None,
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
      for (let desire of noe)
        !desire.isValid() ||
          desire.hasTag("simple_vehicles_itemDBStay") ||
          azyk.removeTag("simple_vehicles_itemDBStay") ||
          azyk.remove();
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

export var btchsItems = [
  void 0,
  void 0,
  "simple_vehicles:honk_item",
  void 0,
  void 0,
];

itemSet1 = {
  default: "simple_vehicles:honk_item",
  toggledState: "simple_vehicles:honk_item",
  getItem: function (activated) {
    return activated.getDynamicProperty("simple_vehicles:honk_set")
      ? !this.toggledState
      : this.default;
  },
};

const hotbars = [
  void 0,
  void 0,
  "simple_vehicles:honk_item",
  void 0,
  void 0,
  void 0,
  void 0,
  void 0,
  void 0,
];

const ae86 = {
  "simple_vehiclesL:ae86": {
    hotbar: [[itemSet1]],
  },
};

var Fck = {
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
  };
RMPlayerDATA = new FCK2();

var SimpleVehicleRiderData = class {
  SimpleVehicles_VehiclesBeingRidden = [];
  runPlayerDataInventory(e) {
    if (!e.getComponent(EntityComponentTypes.Riding)) {
      if (e.hasTag("simple_vehicles_vehiRide")) {
        if (e.hasTag("simple_vehicles_vehiRideHotbar")) {
          if (
            !e.getComponent(EntityComponentTypes.Inventory) ||
            !T.loadItems(e)
          )
            return;
          e.removeTag("simple_vehicles_vehiRideHotbar");
        }
        e.removeTag("simple_vehicles_vehiRide");
      }
    }
  }
  tick(){
      for (let e of RMPlayerDATA.allPlayers) {
        if (!e.isSneaking) continue;
        let r = e.dimension.getEntities({
          families: ["aurrora_ve.inventory"],
          maxDistance: 30,
          location: e.location,
        });
        for (let t of r)
          t.playAnimation("animation.aurrora_ve.vehicle.show_inventory_icon", {
            players: [e.name],
          });
      }
  }
  simplevehiclesGiveHotBar(e, r, t) {
    let n = p[t.entity.typeId];
    if (!(!n || !n.hotbars))
      for (let bth = 0; bth < 9; bth++) {
        if (
          bth > n.hotbars[t.seatPosition].length - 1 ||
          n.hotbars[t.seatPosition][bth] === void 0
        ) {
          let d = new f("simple_vehicles:empty_slot", 1);
          (d.lockMode = K.slot), r.container?.setItem(bth, d);
          continue;
        }
        let i = n.hotbars[t.seatPosition][bth];
        typeof i == "object" && (i = i.getItem(t.entity));
        let c = new f(i, 1);
        (c.lockMode = K.slot), r.container?.setItem(bth, c);
      }
  }
  ItemUseAfterEvent(e) {
    switch (e.ItemStack.typeId) {
      case "simple_vehicles:honk_item":
        e.entity.setDynamicProperty("simple_vehicles:honk_set", !0);
        break;
    }
  }
};
BtchAll = new SimpleVehicleRiderData();

function BtchAsTick(){
    for (let e of RMPlayerDATA.allPlayers) BtchAll.runPlayerDataInventory(e);
    BtchAll.tick()
}

system.runInterval(BtchAsTick, 0);