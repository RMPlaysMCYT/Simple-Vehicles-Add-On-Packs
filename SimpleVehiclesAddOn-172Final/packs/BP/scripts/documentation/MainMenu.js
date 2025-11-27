import { _Page1GettingStarted } from "./_Page01GettingStarted";
import { _Page2Vehicles } from "./_Page02Vehicles";
import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

export function showCustomForm(player) {
  const GettingStarted = new ActionFormData();
  GettingStarted.title("Welcome");

  GettingStarted.body(
    "Hi there and thank you to download this addon and I hope you enjoy \nPlease Rate Me a 5-star to support of the development. \nFollow me on social media accounts below:\n\n===============================\nTwitter/X: @rmplaysmc_yt \nYT: Ronnel Mitra \nMCPEDL: RMPlaysMC YT \nCurseforge: RMPlaysMC YT\n===============================\n"
  );

  GettingStarted.button("Getting Started");
  GettingStarted.button("Vehicles");
  GettingStarted.button("Items");
  GettingStarted.button("Additionals");
  GettingStarted.button("About");

  GettingStarted.show(player).then((r) => {
    if (r.canceled) return;
    switch (r.selection) {
      case 0:
        _Page1GettingStarted(player);
        break;
      case 1:
        _Page2Vehicles(player);
        break;
      case 2:
        break;
    }
  });
}

world.beforeEvents.itemUse.subscribe((ev) => {
  const item = ev.itemStack;
  const player = ev.source;

  if (item.typeId == "simple_vehicles:book_documents") {
    system.run(() => {
      showCustomForm(player);
    });
  }
});
