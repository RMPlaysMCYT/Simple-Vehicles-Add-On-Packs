import {
    EntityComponentTypes,
    EquipmentSlot,
    ItemLockMode,
    ItemStack,
    StructureSaveMode,
    StructureAnimationMode,
    system,
    world,
    BlockPermutation,

} from "@minecraft/server";

var ItemDataBase = class {
    ItemSave(e) {
        let a = e.getComponent(EntityComponentTypes.Inventory);
        if (!a) return;
        let t = e.dimension.spawnEntity("simple_vehicles:item_db", e.location);
        t.addTag(e.id);
        let n = t.getComponent(EntityComponentTypes.Inventory);
        if (!n) return;
        let o = [];
        for (let i = 0; i < 9; i++) {
            let c = a.container?.getItem(i);
            n.container?.setItem(i, c), o.push(c);
        }
        world.structureManager.delete(`simple_vehicles:item_db_${e.id}`),
            world.structureManager.createFromWorld(
                `simple_vehicles:item_db_${e.id}`,
                e.dimension,
                t.location,
                t.location,
                { includeBlocks: !1, includeEntities: !0, saveMode: StructureSaveMode.World }
            ),
            t.remove();
    }
}