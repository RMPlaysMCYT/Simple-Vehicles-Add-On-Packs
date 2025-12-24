const Version = "172";
console.log("Addon Loaded")
console.log(`Simple Vehicles Addon ${Version} Loaded`)

import { system, world } from "@minecraft/server";
import "./booksGuide";
import "./documentation/MainMenu";
import "./honkItem";
import "./setLoreInfo";
import "./_hud";

import * as fck from "./itemInteraction/playerOnEnter"

let onWorldStartedSetup = false;
let onWorldFinishedSetup = false;

async function Ticks() {
  await fck.onWorldTicks();
}

async function Loop() {
  system.run(Ticks);
  system.run(Loop);
}

system.run(Loop);