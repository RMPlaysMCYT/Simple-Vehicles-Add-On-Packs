import { world, system } from "@minecraft/server";

const vehiclePrefixes = [
  "simple_vehicles",  
  "aspire"           
];

function VehicleHudHider() {
  world.getAllPlayers().forEach((player) => {
    const rider = player.getComponent("minecraft:riding")?.entityRidingOn;
    const commando =
      rider && vehiclePrefixes.some(prefix => rider.typeId.startsWith(prefix))
        ? `hud @s hide horse_health`
        : `hud @s reset horse_health`;
    player.runCommand(commando);
  });
}

system.runInterval(() => {
  VehicleHudHider();
}, 1);
