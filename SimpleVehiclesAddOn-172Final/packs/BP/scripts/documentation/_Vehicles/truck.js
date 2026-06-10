import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";
import { _Page2Vehicles } from "../_page2";

export function TruckInfo(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Truck");
  CreditsForm.body({
    rawtext: [
      {
        text: "A truck (North American and Australian English) or lorry (British English) is a motor vehicle designed to transport freight, carry specialized payloads, or perform other utilitarian work. ",
      },
      { text: "\n" },
      { text: "===============================" },
      { text: "Specifictaions \n" },
      { text: `\xA7lSpeed: \xA7r120 km/h \n` },
      { text: `\xA7lSize: \xA7r${VehicleSizes[2]} \n` },
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
