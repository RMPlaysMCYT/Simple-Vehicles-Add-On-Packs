import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Hoverboard_Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Hoverboard");
  CreditsForm.body({
    rawtext: [
      {
        text: "A hoverboard (or hover board) is a fictional levitating board used for personal transportation, first described in science-fiction, and popularized by the Back to the Future film series.[1] The term has also been used for real-life self-balancing scooters, which do not actually hover.[2]",
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
