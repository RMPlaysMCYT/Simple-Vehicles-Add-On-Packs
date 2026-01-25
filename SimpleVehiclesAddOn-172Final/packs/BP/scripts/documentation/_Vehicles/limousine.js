import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Limousine_Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Limousine");
  CreditsForm.body({
    rawtext: [
      {
        text: "A helicopter is a type of rotorcraft in which lift and thrust are supplied by horizontally spinning rotors. This allows the helicopter to take off and land vertically, to hover, and to fly forward, backward and laterally.[1] These attributes allow helicopters to be used in congested or isolated areas where fixed-wing aircraft and many forms of short take-off and landing (STOL) or short take-off and vertical landing (STOVL) aircraft cannot perform without a runway.",
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
