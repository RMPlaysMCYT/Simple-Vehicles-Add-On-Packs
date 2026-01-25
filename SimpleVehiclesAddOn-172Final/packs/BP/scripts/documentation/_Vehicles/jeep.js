import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Jeep_Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Jeep or Jeepney");
  CreditsForm.body({
    rawtext: [
      {
        text: "A jeepney (Tagalog: [ˈdʒiːpni]), or simply a jeep (Tagalog: [ˈdʒiːp]), is a type of public utility vehicle (PUV) that serves as the most popular means of public transportation in the Philippines.[1] Known for its crowded seating and kitsch decorations, it is a cultural icon of the Philippines[2] and has its own art, Jeepney art.[3] At the 1964 New York World's Fair, a Sarao jeepney was exhibited in the Philippine pavilion as a national symbol for Filipinos.[4][5].",
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
