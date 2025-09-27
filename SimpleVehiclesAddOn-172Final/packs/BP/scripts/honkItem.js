import {world, system, ItemComponentTypes, ItemStack } from '@minecraft/server';

world.afterEvents.itemCompleteUse.subscribe(eventData => {
    const { source, itemStack } = eventData;
    const item = itemStack;

    if (!item) return;

    if (item.typeId === "simple_vehicles:honk_item") {
        source.runCommand(`playsound "random.toast" @s ~ ~ ~ 1`);
    }
});

// import { system, world, ItemComponentTypes, ItemStack } from "@minecraft/server";

// world.afterEvents.itemCompleteUse.subscribe(({source, itemStack }) => {
  
//   const item = itemStack;

//   if (!item) return;
  
//   if (item.typeId === "beest:arowana") {
//   source.addEffect('fire_resistance', 200, {amplifier:1});
// source.addEffect('night_vision', 300, {amplifier:1});
//   }
  
//   if (item.typeId === "beest:zebra_fish") {
//   source.runCommand(`effect @s resistance 30 2`);
//   }
// });