import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./MainMenu";

export function _Page1GettingStarted(player) {
  const GettingStarted = new ActionFormData();
  GettingStarted.title("Credits");
  GettingStarted.body({
    rawtext: [
      { text: "simveh172.text1" },
      { text: "\n" },
      { text: "simveh172.text2" },
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
