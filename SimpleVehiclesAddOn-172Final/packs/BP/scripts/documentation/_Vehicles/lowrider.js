import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "../mainmenu";
import { HealthTypes, VehicleSizes } from "../../utils/customvehicleitems";
import { _Page2Vehicles } from "../_page2";

export function Lowrider_Information(player) {
  const CreditsForm = new ActionFormData();
  CreditsForm.title("Lowrider");
  CreditsForm.body({
    rawtext: [
      {
        text: "A lowrider or low rider is a customized car with a lowered body that emerged in the post-WWII, 1940s-1950's era.[3] The exact origin of the lowrider is debatable, but it was probably birthed in Southern California, with many people claiming that lowriders really started in Tijuana, Texas, or New Mexico. Lowriders were particularly popular amongst young Chicanos, who adopted the art of rolling “low and slow” (or bajito y suavecito), directly opposing mainstream culture which focused on fast cars such as hot rods. In lowrider culture, lowriders are considered to serve as transportation art or transported art.[4]",
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
