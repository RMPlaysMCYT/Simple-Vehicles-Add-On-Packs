import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./MainMenu";
import { Ae86Information } from "./_Vehicles/ae86";
import { AmbulanceInformation } from "./_Vehicles/ambulance";

export function _Page2Vehicles(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Vehicles");
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
  CreditsForm.button("AE 86", Ae86Information);
  CreditsForm.button("Ambulance", AmbulanceInformation);
  CreditsForm.button("Go Back");
  CreditsForm.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      showCustomForm(player);
    }
  });
}
