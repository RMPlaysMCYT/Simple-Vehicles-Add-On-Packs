import {
  system,
  world,
  ItemStack,
} from "@minecraft/server";

world.afterEvents.itemUse.subscribe(({ dimension, source, itemStack }) => {
  const item = itemStack;
  if (!item) return;
  if (item.typeId === "simple_vehicles:honk_item") {
    // source.addEffect("fire_resistance", 5, { amplifier: 1 });
    // source.addEffect("night_vision", 10, { amplifier: 1 });
    // source.runCommand("playsound random.toast @p");
    source.runCommand("playsound vehicles.horn @p");
  }
});
