import {world, system} from '@minecraft/server';

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