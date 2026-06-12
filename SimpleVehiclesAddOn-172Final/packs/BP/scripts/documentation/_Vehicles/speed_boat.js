import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";
import { _Page2Vehicles } from "../_page2";

export function SpeedBoat_Info(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Speedboat");
  CreditsForm.body({
    rawtext: [
      {
        text: "A motorboat or powerboat is a boat whose propulsion is exclusively provided by a motor, not by wind power (e.g. sail or power kite) or human power. A motorboat capable of cruising at a much faster speed is also called a speedboat.",
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
