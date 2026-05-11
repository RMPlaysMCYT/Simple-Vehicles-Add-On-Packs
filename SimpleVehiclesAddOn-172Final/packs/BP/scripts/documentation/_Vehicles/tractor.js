import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";
import { _Page2Vehicles } from "../_page2";

export function TractorInfo(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Tractor");
  CreditsForm.body({
    rawtext: [
      {
        text: "A television production truck or OB van is a small mobile production control room to allow filming of events and video production at locations outside a regular television studio. They are used for remote broadcasts, outside broadcasting (OB), and electronic field production (EFP).",
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
