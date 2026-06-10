import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";
import { _Page2Vehicles } from "../_page2";

export function TravisInfo(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Isuzu Travis");
  CreditsForm.body({
    rawtext: [
      {
        text: "The Isuzu Traga is a small cab over pickup truck manufactured by Isuzu since 2018. It is developed to compete with the Mitsubishi L300 in the Indonesian medium pickup truck market.[3] It replaces the L300-based Bison and Panther pickup in the market. It is manufactured and primarily sold in Indonesia, and is exported to other Southeast Asian countries since 2019 as well. The Philippines is the first export destination, where it is sold as the Isuzu Traviz.",
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
