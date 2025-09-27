import { system, world } from "@minecraft/server";

const CUSTOM_ITEMS = {
  "simple_vehicles:honk_item": [
    "This is the first line of the item's lore",
    "This is the second line of the item's lore",
    "You can only have 20 lines and 50 characters"
  ],
  "simple_vehicles:key": [
    "This is an required item tho for every vehicle"
  ]
};

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
