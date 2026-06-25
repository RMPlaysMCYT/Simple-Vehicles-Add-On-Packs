import { ActionFormData } from "@minecraft/server-ui";
import { showCustomForm } from "./MainMenu";
import { Ae86Information } from "./_Vehicles/ae86";
import { AmbulanceInformation } from "./_Vehicles/ambulance";
import { AUVCarInformation } from "./_Vehicles/auv_car";
import { BikeInformation } from "./_Vehicles/bike";
import { BusInformation } from "./_Vehicles/bus";
import { SledInformation } from "./_Vehicles/c_sled";
import { CarInformation } from "./_Vehicles/car";
import { Car4x4Information } from "./_Vehicles/car4x4";
import { CorllaInformation } from "./_Vehicles/corolla";
import { Ev4Information } from "./_Vehicles/ev4";
import { FireTruckInformation } from "./_Vehicles/fire_truck";
import { Helicopter_Information } from "./_Vehicles/helicopter";
import { Hoverboard_Information } from "./_Vehicles/hoverboarrd";
import { Jeep_Information } from "./_Vehicles/jeep";
import { Limousine_Information } from "./_Vehicles/limousine";
import { Lowrider_Information } from "./_Vehicles/lowrider";
import { Mustang_Information } from "./_Vehicles/mustang";
import { ObVan_Information } from "./_Vehicles/ob_van";
import { PickUpTruck_Info } from "./_Vehicles/pick_up_truck";
import { PlaneInfo } from "./_Vehicles/plane";
import { PoliceCar_Info } from "./_Vehicles/police_car";
import { SpeedBoat_Info } from "./_Vehicles/speed_boat";
import { TankInfo } from "./_Vehicles/tank";
import { TaxiInfo } from "./_Vehicles/taxi";
import { TeslaCyberTruckInfo } from "./_Vehicles/tesla_truck";
import { TractorInfo } from "./_Vehicles/tractor";
import { TravisInfo } from "./_Vehicles/travis";
import { TruckInfo } from "./_Vehicles/truck";
import { VanInfo } from "./_Vehicles/van";
import { CadillabDTSInfo } from "./_Vehicles2/cadillac_dts";
import { HondaAccordInfo } from "./_Vehicles2/hondaaccord";
import { OpelCorsaInfo } from "./_Vehicles2/opelcorsa";
import { OpelAstralInfo } from "./_Vehicles2/opelastral";
import { VolkswagenBeetleInfo } from "./_Vehicles2/volkswgenbeetle";
import { VoltBikeInfo } from "./_Vehicles2/voltbike";

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
  Page2Vehicles.button("Motorbike", "textures/items/motorbike"); //16
  Page2Vehicles.button("Mustang", "textures/items/mustang"); //17
  Page2Vehicles.button("OB Van", "textures/items/ob_van"); //18
  Page2Vehicles.button("PickUpTruck", "textures/items/pick_up_truck"); //19
  Page2Vehicles.button("Plane", "textures/items/plane"); //20
  Page2Vehicles.button("Police Car", "textures/items/police_car"); //21
  Page2Vehicles.button("SpeedBoat Small", "textures/items/speed_boat"); //22
  Page2Vehicles.button("Tank", "textures/items/tank"); //23
  Page2Vehicles.button("Taxi", "textures/items/taxi"); //24
  Page2Vehicles.button("Cyber Truck", "textures/items/tesla_truck"); //25
  Page2Vehicles.button("Tractor", "textures/items/tractor"); //26
  Page2Vehicles.button("Travis", "textures/items/travis"); //27
  Page2Vehicles.button("Truck", "textures/items/truck"); //28
  Page2Vehicles.button("Van", "textures/items/van"); //29
  Page2Vehicles.button("Go Back"); //99
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
      Motorbike_Information(player);
    } else if (response.selection === 17) {
      Mustang_Information(player);
    } else if (response.selection === 18) {
      ObVan_Information(player);
    } else if (response.selection === 19) {
      PickUpTruck_Info(player);
    } else if (response.selection === 20) {
      PlaneInfo(player);
    } else if (response.selection === 21) {
      PoliceCar_Info(player);
    } else if (response.selection === 22) {
      SpeedBoat_Info(player);
    } else if (response.selection === 23) {
      TankInfo(player);
    } else if (response.selection === 24) {
      TaxiInfo(player);
    } else if (response.selection === 25) {
      TeslaCyberTruckInfo(player);
    } else if (response.selection === 26) {
      TractorInfo(player);
    } else if (response.selection === 27) {
      TravisInfo(player);
    } else if (response.selection === 28) {
      TruckInfo(player);
    } else if (response.selection === 29) {
      VanInfo(player);
    } else if (response.selection === 30) {
      CadillabDTSInfo(player);
    } else if (response.selection === 31) {
      HondaAccordInfo(player);
    } else if (response.selection === 32) {
      OpelCorsaInfo(player);
    } else if (response.selection == 29) {
      OpelAstralInfo(player);
    } else if (response.selection == 29) {
      VolkswagenBeetleInfo(player);
    } else if (response.selection == 29) {
      VoltBikeInfo(player);
    } else if (response.selection === 30) {
      showCustomForm(player);
    }
  });
}
