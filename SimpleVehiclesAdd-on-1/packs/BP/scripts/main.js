import '_hud';

import { system, world } from "@minecraft/server";

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  if (entity?.typeId === "aspire:ambulance") {
    entity.nameTag("Ambulance");
  } else if (entity?.typeId === "aspire:apv") {
    entity.nameTag("AUV Car");
  }
});