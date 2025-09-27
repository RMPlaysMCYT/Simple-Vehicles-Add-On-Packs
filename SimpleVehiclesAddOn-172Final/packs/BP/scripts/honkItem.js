import {world, system} from '@minecraft/server';


world.afterEvents.itemUse.subscribe(({source, ItemStack})=>{
    const iTems = ItemStack;
    if (!iTems) return;
    if (iTems.typeId === "simple_vehicles:honk_item"){
        source.playSound("random.toast", 1, 1);
    }
})