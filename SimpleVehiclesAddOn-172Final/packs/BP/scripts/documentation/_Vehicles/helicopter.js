import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Helicopter_Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Helicopter");
  CreditsForm.body({
    rawtext: [
      {
        text: "A fire engine or fire truck (also spelled firetruck) is a vehicle, usually a specially designed or modified truck, that functions as a firefighting apparatus. The primary purposes of a fire engine include transporting firefighters and water to an incident as well as carrying equipment for firefighting operations in a fire drill. Some fire engines have specialized functions, such as wildfire suppression and aircraft rescue and firefighting, and may also carry equipment for technical rescue.",
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
