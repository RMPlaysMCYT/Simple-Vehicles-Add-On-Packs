import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function CorllaInformation(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Toyota Corolla");
  CreditsForm.body({
    rawtext: [
      {
        text: "The Toyota Corolla (Japanese: トヨタ・カローラ, Hepburn: Toyota Karōra) is a series of compact cars (formerly subcompact) manufactured and marketed globally by the Japanese automaker Toyota Motor Corporation. Introduced in 1966, the Corolla has been the world's best-selling automobile of all time since 1997, when it surpassed the Volkswagen Beetle.[1] Toyota reached the milestone of 50 million Corollas sold over twelve generations in 2021.[2] \n\nSource: Wikipedia",
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
