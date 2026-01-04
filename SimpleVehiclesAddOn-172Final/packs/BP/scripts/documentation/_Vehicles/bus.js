import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function BusInformation(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Bus");
  CreditsForm.body({
    rawtext: [
      {
        text: "A bus (contracted from omnibus,[1] with variants multibus, motorbus, autobus, etc.) is a motor vehicle that carries significantly more passengers than an average car or van, but fewer than the average rail transport. It is most commonly used in public transport, but is also in use for charter purposes, or through private ownership. Although the average bus carries between 30 and 100 passengers, some buses have a capacity of up to 300 passengers.[2]. \n\nSource: Wikipedia",
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
