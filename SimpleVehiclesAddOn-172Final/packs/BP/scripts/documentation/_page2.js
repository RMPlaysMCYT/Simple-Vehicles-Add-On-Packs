import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./mainmenu";
import { Ae86Information } from "./_vehicles/ae86";
import { AmbulanceInformation } from "./_vehicles/ambulance";
import { AUVCarInformation } from "./_vehicles/auv_car";
import { BikeInformation } from "./_vehicles/bike";
import { BusInformation } from "./_vehicles/bus";
import { SledInformation } from "./_vehicles/c_sled";
import { CarInformation } from "./_vehicles/car";
import { Car4x4Information } from "./_vehicles/car4x4";
import { CorllaInformation } from "./_vehicles/corolla";
import { Ev4Information } from "./_vehicles/ev4";
import { FireTruckInformation } from "./_vehicles/fire_truck";
import { Helicopter_Information } from "./_vehicles/helicopter";
import { Hoverboard_Information } from "./_vehicles/hoverboarrd";
import { Jeep_Information } from "./_vehicles/jeep";
import { Limousine_Information } from "./_vehicles/limousine";
import { Lowrider_Information } from "./_vehicles/lowrider";
import { Mustang_Information } from "./_vehicles/mustang";

export function _Page2Vehicles(player) {
  const Page2Vehicles = new ActionFormData();
  Page2Vehicles.title("Vehicles");
  Page2Vehicles.body({
    rawtext: [
      { text: "These are the Vehicles Which were been added to the add-on" },
      { text: "\n" },
      {
        text: "It has 70 vehicles overall and it's been like quantity over quality for some, however it's been better than expected unlike other add-ons where it has 30+ or what",
      },
      { text: "\n" },
      { text: "===============================" },
      { text: "\n" },
    ],
  });
  Page2Vehicles.button("AE 86", "textures/items/ae86"); //0
  Page2Vehicles.button("Ambulance", "textures/items/ambulance"); //1
  Page2Vehicles.button("AUV Car", "textures/items/auv_car"); //2
  Page2Vehicles.button("Bike", "textures/items/bike"); //3
  Page2Vehicles.button("Bus", "textures/items/bus"); //4
  Page2Vehicles.button("Sled/Sleigh", "textures/items/sled"); //5
  Page2Vehicles.button("Car", "textures/items/car"); //6
  Page2Vehicles.button("Car 4X4", "textures/items/car4x4"); //7
  Page2Vehicles.button("Toyota Corolla", "textures/items/corolla"); //8
  Page2Vehicles.button("EV4", "textures/items/ev4"); //9
  Page2Vehicles.button("Fire Truck", "textures/items/fire_truck"); //10
  Page2Vehicles.button("Helicopter", "textures/items/helicopter"); //11
  Page2Vehicles.button("Hoverboard", "textures/items/hoverboard"); //12
  Page2Vehicles.button("Jeep or Jeepney", "textures/items/jeep"); //13
  Page2Vehicles.button("Limousine", "textures/items/limousine"); //14
  Page2Vehicles.button("Lowrider", "textures/items/lowrider"); //15
  Page2Vehicles.button("Mustang", "textures/items/mustang"); //16
  Page2Vehicles.button("Go Back"); //17
  Page2Vehicles.show(player).then((response) => {
    if (response.canceled) {
      showCustomForm(player);
    } else if (response.selection === 0) {
      Ae86Information(player);
    } else if (response.selection === 1) {
      AmbulanceInformation(player);
    } else if (response.selection === 2) {
      AUVCarInformation(player);
    } else if (response.selection === 3) {
      BikeInformation(player);
    } else if (response.selection === 4) {
      BusInformation(player);
    } else if (response.selection === 5) {
      SledInformation(player);
    } else if (response.selection === 6) {
      CarInformation(player);
    } else if (response.selection === 7) {
      Car4x4Information(player);
    } else if (response.selection === 8) {
      CorllaInformation(player);
    } else if (response.selection === 9) {
      Ev4Information(player);
    } else if (response.selection === 10) {
      FireTruckInformation(player);
    } else if (response.selection === 11) {
      Helicopter_Information(player);
    } else if (response.selection === 12) {
      Hoverboard_Information(player);
    } else if (response.selection === 13) {
      Jeep_Information(player);
    } else if (response.selection === 14) {
      Limousine_Information(player);
    } else if (response.selection === 15) {
      Lowrider_Information(player);
    } else if (response.selection === 16) {
      Mustang_Information(player);
    } else if (response.selection === 17) {
      showCustomForm(player);
    }
  });
}
