import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Mustang_Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Ford Mustang");
  CreditsForm.body({
    rawtext: [
      {
        text: "The Ford Mustang is an American automobile manufactured and marketed by Ford since 1964, as Ford's longest nameplate in continuous production. Currently in its seventh generation, it is the fifth-best selling Ford car nameplate. The namesake of the pony car automobile segment, the Mustang was developed as a highly styled line of sporty coupes and convertibles derived from existing model lines, initially distinguished by its pronounced long hood, short deck proportions.[3]",
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
