import { system, world } from "@minecraft/server";

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  if (entity?.typeId === "aspire:ambulance") {
    entity.nameTag("Ambulance");
  } else if (entity?.typeId === "aspire:apv") {
    entity.nameTag("AUV Car");
  }
});

function VehicleHudHider() {
  world.getAllPlayers().forEach((player) => {
    const ride = player.getComponent("minecraft:rideable")?.entityRidingOn;
    const commando =
      ride && ride.typeId.startsWith("aspire")
        ? "hud @s hide horse_health"
        : "hud @s reset horse_health";
    player.runCommand(commando);
  });
}

system.runInterval(() => {
  VehicleHudHider();
}, 1);
