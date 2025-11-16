import { vehicleLists } from "../utils/vehicleLists";


import {
  world,
  system,
  ItemStack,
  HudVisibility,
  HudElement,
} from "@minecraft/server";

function onPlayerEnter(player) {
    if (!vehicleLists.is_Valid()) return;
    player.addTag("simplevehicles_player_in_vehicle");

}