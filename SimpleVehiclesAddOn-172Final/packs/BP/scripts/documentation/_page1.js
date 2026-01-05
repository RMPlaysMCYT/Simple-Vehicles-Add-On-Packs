import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./mainmenu";

export function _Page1GettingStarted(player) {
  const GettingStarted = new ActionFormData();
  GettingStarted.title("Credits");
  GettingStarted.body({
    rawtext: [
      { text: "Created by RMPlaysMCYT" },
      { text: "\n" },
      { text: "This Add-on is developed over 6 years and counting and also you can support me by downloading this add-on from MCPEDL, CurseForge, Modbay and also star the Simple Vehicles Add-On Packs on Github" },
      { text: "\n" },
      { text: "===============================" },
      { text: "\n" },
    ],
  });
  GettingStarted.button("Go Back");
  GettingStarted.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      showCustomForm(player);
    }
  });
}
