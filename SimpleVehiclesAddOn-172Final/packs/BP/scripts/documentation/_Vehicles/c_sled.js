import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function SledInformation(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Sled");
  CreditsForm.body({
    rawtext: [
      {
        text: "A sled, skid, sledge, or sleigh, is a land vehicle that slides across a surface, usually of ice or snow. It is built with either a smooth underside or a separate body supported by two or more smooth, relatively narrow, longitudinal runners similar in principle to skis. This reduces the amount of friction, which helps to carry heavy loads. \n\nSource: Wikipedia",
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
