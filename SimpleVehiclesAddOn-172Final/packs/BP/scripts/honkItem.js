import {
  system,
  world,
  ItemStack,
} from "@minecraft/server";

world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
  const item = itemStack;
  if (!item) return;
  if (item.typeId === "simple_vehicles:honk_item") {
    source.runCommand("playsound vehicles.horn @p");
  }
});
