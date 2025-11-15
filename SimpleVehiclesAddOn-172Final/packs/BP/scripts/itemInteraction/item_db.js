import { EntityComponentTypes, StructureSaveMode, StructureAnimationMode as X, world } from '@minecraft/server';
export function itemDatabaseSave(btch){
    let bro = btch.getComponent(EntityComponentTypes.Inventory)
    if (!bro) return;
    let hoe = btch.dimension.spawnEntity("simple_vehicles:item_db", btch.location)

    hoe.addTag(btch.id);
    let sis = hoe.getComponent("Inventory");
    if (!sis) return;
    let yword = [];
    for (let i = 0; i < 9; i++) {
        let azyk = bro.container?.getItem(i);
        sis.container?.setItem(i, azyk), yword.push(azyk)
    }
    world.structureManager.delete(`simple_vehicles:item_db_${btch.id}`),
    world.structureManager.createFromWorld(`simple_vehicles:item_db_${btch.id}`,
    btch.dimension, hoe.location, hoe.location, {
        includeBlocks: !1,
        includeEntities: !0,
        saveMode: StructureSaveMode.World
    }), hoe.remove();
};

export function itemDatabaseDrop(btch){
    let bro = btch.structureManager.get(`simple_vehicles:item_db_${btch.id}`);
    if (!bro) return !1;
    let hoe = btch.location;
    for (; hoe.y > btch.dimension.heightRange.max;) hoe.y -= 1;
    let noe = btch.dimension.getEntities({
        location: hoe,
        maxDistance: 50,
        minDistance: 50
    });
    for (let azyk of noe) azyk.addTag("simple_vehicles_itemDBStay");
    world.structureManager.place(bro, btch.dimension, hoe, {
        includeBlocks: !1,
        includeEntities: !0,
        animationMode: X.None
    }), world.structureManager.delete(bro);
    let yword = btch.dimension.getEntities({
        type: "simple_vehicles:item_db",
        tags: [btch.id]
    });
    yword[0].triggerEvent("simple_vehicles:drop_anddespawn"), yword[0].addTag("simple_vehicles:drop_anddespawn");

    let hap = btch.dimension.getEntities({
        location: hoe,
        maxDistance: 50,
        minDistance: 0
    });

    for (let azyk of hap) !azyk.isValid() || azyk.hasTag("simple_vehicles_itemDBStay") || azyk.hasTag("simple_vehicles:drop_anddespawn") || azyk.remove();
    for (let azyk of noe) !azyk.isValid() || azyk.hasTag("simple_vehicles_itemDBStay") || azyk.removeTag("simple_vehicles_itemDBStay");
    return !0
};


export function itemDatabaseLoad(btch){
    let bro = btch.getComponent(EntityComponentTypes.Inventory);
    if (!bro) return !1;
    let hoe = world.structureManager.get(`simple_vehicles:item_db${btch.id}`);
    if (!hoe) return !0;
    if (btch.location.y > btch.dimension.heightRange.max) return !1;
    let noe = btch.dimension.getEntities({
        location: btch.location,
        maxDistance: 50,
        minDistance: 0
    });
    for (let desire of noe) desire.addTag("simple_vehicles_itemDBStay");
    world.structureManager.place(hoe, btch.dimension, btch.location, {
        includeBlocks: !1,
        includeEntities: !0,
        animationMode: X.None
    });
    let assist = btch.dimension.getEntities({
        type: "simple_vehicles:item_db",
        tags: [btch.id]
    }),
    i = !1;
    if (assist.length !==0){
        let desire = assist[0].getComponent(EntityComponentTypes.Inventory);
        if (desire){
            for (let u = 0; u < 9; u++){
                let sd = desire.container?.getItem(u);
                bro.container?.setItem(u,sd)
            }
            assist[0].remove(), i = !0
        }
    }
    let ayzk = btch.dimension.getEntities({
        location: btch.location,
        maxDistance: 50,
        minDistance: 0
    });
    for (let desire of ayzk) desire.hasTag("simple_vehicles_itemDBStay") ||  desire.remove();
    for (let desire of noe) !desire.isValid() || desire.hasTag("simple_vehicles_itemDBStay") || azyk.removeTag("simple_vehicles_itemDBStay") || azyk.remove();
    return i
};

export function itemDatabaseClearOnExit(btch) {
    let bro = btch.getComponent(EntityComponentTypes.Inventory);
    if (!bro) return !1;
    for (let hoe = 0; hoe < 9; hoe++) bro.container?.setItem(hoe, void 0);
    return !0
};

export var btchsItems = [void 0, void 0, "simple_vehicles:honk_item", void 0, void 0]