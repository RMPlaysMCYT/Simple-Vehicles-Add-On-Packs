import { EquipmentSlot as EquipmentSlot4 } from "@minecraft/server";
var loreSetup = class {
  static setLore(player) {
    const held = getHeldItem(player);
    if (!held || !hopliteWeapons.includes(held.typeId)) return;
    const lore = held.getLore();
    if (lore.length != 0) return;
    let description;
    for (const data of this.loreConst) {
      if (data.item === held.typeId) {
        description = data.lore;
        break;
      }
    }
    const newItem = held.clone();
    newItem.setLore(description);
    player.getComponent("equippable")?.setEquipment(EquipmentSlot4.Mainhand, newItem);
  }
  static {
    this.loreConst = [
      {
        item: "simple_vehicles:vehicle_workbench",
        lore: formatLore([
          "\xA76Information:",
          "\xA7rThis Block is used to craft vehicles and it's a gateway to become a survival gameplay compatible",
          ])
      },
      {
        item: "simple_vehicles:jump1_item",
        lore: formatLore([
          "\xA76Information:",
          "\xA7rThis Item use to jump on a lowrider",
          ])
      }
    ];
  }
};
function formatLore(mainLore) {
  return [
    "",
    "\xA7r\xA7l" + "-".repeat(24),
    ...mainLore.map((line) => "\xA7r" + line),
    "\xA7r\xA7l" + "-".repeat(24)
  ];
}

export function itemLoreFormal(player){
    loreSetup.setLore(player);
}