import * as btch from '@minecraft/server';

var NameSpaces = "SimpleVehiclesAddOn172";
var NamingBtch = "SimpleVehiclesAddOn/172";

function givePlayerBook(player){
    player.runCommand(
        `execute as @s[tag=!${NameSpaces.substring(0,NamingBtch.length -1)}] at @s run give @s minecraft:book`
    );
}

btch.world.afterEvents.playerSpawn.subscribe((event)=>{
    const shit = event;
    givePlayerBook(shit.player);
})