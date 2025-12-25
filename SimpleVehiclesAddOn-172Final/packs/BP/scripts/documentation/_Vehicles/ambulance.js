import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function AmbulanceInformation(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("AE 86");
  CreditsForm.body({
    rawtext: [
      {
        text: "An ambulance is a medically equipped vehicle used to transport patients to treatment facilities, such as hospitals.[1] Typically, out-of-hospital medical care is provided to the patient during the transport. Ambulances are used to respond to medical emergencies by emergency medical services (EMS), and can rapidly transport paramedics and other first responders, carry equipment for administering emergency care, and transport patients to hospital or other definitive care. ",
      },
      { text: "\n" },
      { text: "===============================" },
      { text: "Specifictaions \n" },
      { text: `Speed: 120 km/h \n` },
      { text: `Size: ${VehicleSizes[2]} \n` },
      { text: `Health: ${HealthTypes[6]}` },
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
