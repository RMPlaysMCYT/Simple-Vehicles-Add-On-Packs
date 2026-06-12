import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";
import { _Page2Vehicles } from "../_page2";

export function PoliceCar_Info(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Police Car");
  CreditsForm.body({
    rawtext: [
      {
        text: "A police car is an emergency vehicle used by police for transportation during patrols and responses to calls for service. Police cars are used by police officers to patrol a beat, quickly reach incident scenes, and transport and temporarily detain suspects.",
      },
      { text: "\n" },
      { text: "===============================" },
      { text: "Specifictaions \n" },
      { text: `\xA7lSpeed: \xA7r120 km/h \n` },
      { text: `\xA7lSize: \xA7r${VehicleSizes[1]} \n` },
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
