// Method 1
import {
  system,
  world,
  ItemComponentTypes,
  ItemStack,
} from "@minecraft/server";

const lunaAxeId = [
  "luna:wooden_blaze_axe",
  "luna:stone_blaze_axe",
  "luna:iron_blaze_axe",
];

world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
  if (lunaAxeId.includes(itemStack.typeId)) {
    itemStack.setLore(["Infusion"]);
    source.getComponent("equippable").setEquipment("Mainhand", itemStack);
  }
});

import "./components/blockComponents";
import { berryBlocks } from "./classes/berryManager";
import {
  world,
  system,
  ItemEnchantableComponent,
  GameMode,
} from "@minecraft/server";
world.beforeEvents.playerBreakBlock.subscribe((data) => {
  const { block, dimension, player, itemStack } = data;
  try {
    const berryData = berryBlocks.find((f) => f.blockID == block.typeId);
    if (berryData != undefined) {
      if (player.getGameMode() == GameMode.creative) return;
      if (itemStack != undefined) {
        const comp = itemStack.getComponent(
          ItemEnchantableComponent.componentId
        );
        if (comp != undefined) {
          if (!comp.hasEnchantment("silk_touch")) return;
          //breaks the block break if they use silk touch
          data.cancel = true;
          system.runTimeout(() => {
            if (!(block.isValid() && block.typeId == berryData.blockID)) return;
            const loc = block.location;
            //break the block
            block.dimension.runCommand(
              "fill " +
                loc.x +
                " " +
                loc.y +
                " " +
                loc.z +
                " " +
                loc.x +
                " " +
                loc.y +
                " " +
                loc.z +
                " air [] destroy"
            );
          });
        }
      }
    }
  } catch {}
});

// Method 3
import { system, world } from "@minecraft/server";
const your_custom_item = "minecraft:diamond";
function checkPlayerInventory() {
  for (const player of world.getPlayers()) {
    const inventory = player.getComponent("minecraft:inventory").container;

    for (let i = 0; i < inventory.size; i++) {
      const item = inventory.getItem(i);

      if (item && item.typeId === your_custom_item) {
        item.setLore([
          "§r§l§0hi this is 1 line",
          "wow a second line",
          "you can only have 20 lines and 50 characters",
        ]);

        inventory.setItem(i, item);
      }
    }
  }

  system.runTimeout(checkPlayerInventory, 10);
}

checkPlayerInventory();

// BY Remaxance from Bedrock AddOns Discord
//AG Remanxnce's simple lore replacements
//Made for public use on 9/19/24
//-----------------------------------------

import { world, system } from "@minecraft/server";

const lores = {
  //the item's typeId, followed by the lore in an array format.
  //Examples:
  "minecraft:wooden_sword": [
    "Line 1", 
    "Line 2", 
    "Line 3"
],
  "minecraft:apple": [
    "Just one line"
],
  //An example of using a arrow function to get a variable in the lore
  "minecraft:bread": [
    (player) => `§f§2${player.name}`,
    "§aanother line"
],
};

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const playerInv = player.getComponent("inventory").container;
    const items = Array.from({ length: playerInv.size }).map((_, i) =>
      playerInv.getItem(i)
    );
    items.forEach((item, slot) => {
      if (item?.typeId in lores) {
        if (item.getLore() == "") {
          const lore = lores[item.typeId].map((line) =>
            typeof line === "function" ? line(player) : line
          );
          item.setLore(lore);
          playerInv.setItem(slot, item);
        }
      }
    });
  }
}, 1);
