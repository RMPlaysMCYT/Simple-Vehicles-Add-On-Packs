import { world, system } from "@minecraft/server";

function VehicleHudHider() {
  world.getAllPlayers().forEach((player) => {
    const rider = player.getComponent("minecraft:riding")?.entityRidingOn;
    const commando =
      rider && rider.typeId.startsWith("aspire")
        ? `hud @s hide horse_health`
        : `hud @s reset horse_health`;
    player.runCommand(commando);
  });
}

system.runInterval(() => {
  VehicleHudHider();
}, 1);
