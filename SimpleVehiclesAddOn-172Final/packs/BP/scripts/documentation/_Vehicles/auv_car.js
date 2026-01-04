import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function AUVCarInformation(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("AUV Car");
  CreditsForm.body({
    rawtext: [
      {
        text: "An AUV, or Asian Utility Vehicle, is a type of affordable, durable, and versatile vehicle popular in developing countries, especially the Philippines, designed to carry both passengers (7-16 seats) and cargo, often with a truck-like body-on-frame chassis for robustness \n\nSource: Gemini AI(However Looking for actual Sources in the next update)",
      },
      { text: "\n" },
      { text: "===============================" },
      { text: "Specifictaions \n" },
      { text: `\xA7lSpeed: \xA7r120 km/h \n` },
      { text: `\xA7lSize: \xA7r${VehicleSizes[0]} \n` },
      { text: `\xA7lHealth: \xA7r${HealthTypes[2]}` },
    ],
  });
  CreditsForm.button("Go Back");
  CreditsForm.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      _Page2Vehicles(player);
    }
  });
}
