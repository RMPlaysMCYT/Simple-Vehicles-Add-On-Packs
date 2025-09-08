import { EntityComponentTypes, StructureSaveMode, world } from '@minecraft/server';
export function itemDataBase(btch){
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
}