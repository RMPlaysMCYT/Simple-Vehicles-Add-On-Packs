import { _Page1GettingStarted } from "./_Page01GettingStarted";

import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

function showCustomForm(player) {
  const GettingStarted = new ActionFormData();
  GettingStarted.title("default_titleExample Title");
  GettingStarted.show(player).then((r) => {
    if (r.selection) return;
    switch (r.selection) {
      case 0:
        _Page1GettingStarted(player);
        break;
      case 1:
        break;
      case 2:
        break;
    }
  });
}

world.beforeEvents.itemUse.subscribe((ev) => {
  const item = ev.itemStack;
  const player = ev.source;

  if (item.typeId == "minecraft:stick") {
    system.run(() => {
      showCustomForm(player);
    });
  }
});
