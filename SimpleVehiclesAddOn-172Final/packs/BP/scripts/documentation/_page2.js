import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./mainmenu";
import { Ae86Information } from "./_vehicles/ae86";
import { AmbulanceInformation } from "./_vehicles/ambulance";

export function _Page2Vehicles(player) {
  const Page2Vehicles = new ActionFormData();
  Page2Vehicles.title("Vehicles");
  Page2Vehicles.body({
    rawtext: [
      { text: "simveh172.text1" },
      { text: "\n" },
      { text: "simveh172.text2" },
      { text: "\n" },
      { text: "===============================" },
      { text: "\n" },
    ],
  });
  Page2Vehicles.button("AE 86");
  Page2Vehicles.button("Ambulance");
  Page2Vehicles.button("Go Back");
  Page2Vehicles.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      Ae86Information(player);
    } else if (response.selection === 1) {
      AmbulanceInformation(player);
    } else if (response.selection === 2) {
      showCustomForm(player);
    }
  });
}
