import { system, world } from "@minecraft/server";
import { CUSTOM_ITEMS, SPRAY_ITEMS } from "./utils/customItems";
import { VEHICLES_EGGS } from "./utils/customVehicleEggs";
import { CUSTOM_BLOCKS } from "./utils/customBlocks";

function updatePlayerInventoryLore() {
  for (const player of world.getPlayers()) {
    const inventory = player.getComponent("minecraft:inventory").container;

    for (let i = 0; i < inventory.size; i++) {
      const item = inventory.getItem(i);

      if (item && CUSTOM_ITEMS[item.typeId]) {
        item.setLore(CUSTOM_ITEMS[item.typeId]);
        inventory.setItem(i, item);
      }
      if (item && VEHICLES_EGGS[item.typeId]) {
        item.setLore(VEHICLES_EGGS[item.typeId]);
        inventory.setItem(i, item);
      }
      if (item && SPRAY_ITEMS[item.typeId]) {
        item.setLore(SPRAY_ITEMS[item.typeId]);
        inventory.setItem(i, item);
      }
      if (item && CUSTOM_BLOCKS[item.typeId]) {
        item.setLore(CUSTOM_BLOCKS[item.typeId]);
        inventory.setItem(i, item);
      }
    }
  }

  system.runTimeout(updatePlayerInventoryLore, 1);
}
// function loreFormattedUnSlashed(FormalLore){
//   return [
//     "",
//     "\xA7r\xA7l" + "-".repeat(25),
//     ...FormalLore.map((line)=>"\xA7r"+line),
//     "\xA7r\xA7l" + "-".repeat(25)
//   ];
// }

updatePlayerInventoryLore();
