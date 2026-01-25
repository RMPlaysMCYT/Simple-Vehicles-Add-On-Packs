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
        text: "A limousine (/ˈlɪməziːn/ or /lɪməˈziːn/), or limo (/ˈlɪmoʊ/) for short,[1] is a large, chauffeur-driven luxury vehicle with a partition between the driver compartment and the passenger compartment which can be operated mechanically by hand or by a button electronically.[2] A luxury sedan with a very long wheelbase and driven by a professional driver is called a stretch limousine.[3]",
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
