import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./MainMenu";
import { HealthTypes, VehicleSizes } from "../../utils/customVehicleItems";

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
      { text: "\n" },
      { text: "Specifictaions" },
      { text: `Speed: 120 km/h` },
      { text: `Size: ${VehicleSizes[0]}` },
      { text: `Health: ${HealthTypes[2]}` },
    ],
  });
  CreditsForm.button("Go Back");
  CreditsForm.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      showCustomForm(player);
    }
  });
}
