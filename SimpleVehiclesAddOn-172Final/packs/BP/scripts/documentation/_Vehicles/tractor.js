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
        text: "A tractor is an engineering vehicle specifically designed to deliver a high tractive effort (or torque) at slow speeds, for the purposes of hauling a trailer or machinery, such as that used in agriculture, mining or construction. Most commonly, the term is used to describe a farm vehicle that provides the power and traction to mechanize agricultural tasks, especially (and originally) tillage, and now many more. Agricultural implements may be towed behind or mounted on the tractor, and the tractor may also provide a source of power if the implement is mechanised.",
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
