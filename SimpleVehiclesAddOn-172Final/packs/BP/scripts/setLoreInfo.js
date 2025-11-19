import { system, world } from "@minecraft/server";
import { CUSTOM_ITEMS } from "./utils/customItems";


function updatePlayerInventoryLore() {
  for (const player of world.getPlayers()) {
    const inventory = player.getComponent("minecraft:inventory").container;

    for (let i = 0; i < inventory.size; i++) {
      const item = inventory.getItem(i);

      if (item && CUSTOM_ITEMS[item.typeId]) {
        item.setLore(CUSTOM_ITEMS[item.typeId]);
        inventory.setItem(i, item);
      }
    }
  }

  system.runTimeout(updatePlayerInventoryLore, 10);
}

updatePlayerInventoryLore();
