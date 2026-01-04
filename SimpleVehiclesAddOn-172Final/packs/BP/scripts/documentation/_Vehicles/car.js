import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function CarInformation(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Car");
  CreditsForm.body({
    rawtext: [
      {
        text: "A car, or an automobile, is a motor vehicle with wheels. Most definitions of cars state that they run primarily on roads, seat 1-8 people, have four wheels, and mainly transport people rather than cargo.[1][2] There are over 1.6 billion cars in use worldwide as of 2025. \n\nSource: Wikipedia",
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
