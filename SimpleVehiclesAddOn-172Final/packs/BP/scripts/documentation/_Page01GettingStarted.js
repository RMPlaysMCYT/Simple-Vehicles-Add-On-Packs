import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./MainMenu";

export function _Page1GettingStarted(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Credits");
  CreditsForm.body({
    rawtext: [
      { text: "simveh172.text1" },
      { text: "\n" },
      { text: "simveh172.text2" },
      { text: "\n" },
      { text: "===============================" },
      { text: "\n" },
    ],
  });
  CreditsForm.button("Go Back");
  CreditsForm.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      showCustomForm(player);
    }
  });
}
