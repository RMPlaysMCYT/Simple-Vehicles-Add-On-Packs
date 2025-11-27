import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";
import { _Page2Vehicles } from "../_Page02Vehicles";

export function Ae86Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("AE 86");
  CreditsForm.body({
    rawtext: [
      {
        text: "The AE86 series of the Toyota Corolla Levin/Sprinter Trueno are small, front-engine/rear-wheel-drive compact cars within the mostly front-engine/front-wheel-drive fifth generation Corolla (E80) range—marketed and manufactured by Toyota from 1983 to 1987 in coupé and liftback configurations.",
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
