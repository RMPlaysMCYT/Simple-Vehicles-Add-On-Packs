import "./_hud";
import Utils from"./_fly";

import { system, world } from "@minecraft/server";

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  if (entity?.typeId === "aspire:ambulance") {
    entity.nameTag = "Ambulance";
  } else if (entity?.typeId === "aspire:apv") {
    entity.nameTag = "AUV Car";
  } else if (entity?.typeId === "aspire:aquatopia") {
    entity.nameTag = "Aquatopia";
  } else if (entity?.typeId === "aspire:bus") {
    entity.nameTag = "Bus";
  } else if (entity?.typeId === "aspire:car") {
    entity.nameTag = "Car";
  }else if (entity?.typeId === "aspire:mini_bus") {
    entity.nameTag = "Minibus";
  }
});

system.runInterval(() => {
    const dim = world.getDimension("overworld");
    // You can use tags instead of family type
    for (const entity of dim.getEntities({ families: ["aspire:helicopter"] })) {
        const utils = new Utils(entity);
        // Recommended values
        utils.flySystem(0.09, 0.007, 5);
    }
});