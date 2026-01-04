import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Car4x4Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Car 4X4");
  CreditsForm.body({
    rawtext: [
      {
        text: "An off-road vehicle (ORV) is any vehicle built to travel on rough, unpaved terrain like dirt trails, sand, mud, or rocks, featuring specialized components such as large, deep-treaded tires, high ground clearance, and flexible suspension to handle difficult conditions beyond smooth roads, including ATVs, dirt bikes, dune buggies, and specially modified trucks or SUVs. \n\nSource: Wikipedia",
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
