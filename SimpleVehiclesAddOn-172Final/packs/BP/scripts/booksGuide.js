import * as btch from '@minecraft/server';

const DEBUGASSHOLE = false;

var NameSpaces = "SimpleVehiclesAddOn172";
var NamingBtch = "SimpleVehiclesAddOn/172";

function givePlayerBook(player){
    player.runCommand(`execute as @s[tag=!${NameSpaces.substring(0,NamingBtch.length -1)}] at @s run give @s simple_vehicles:book_documents`);
    player.runCommand(`tag @s[tag=!${NameSpaces.substring(0,NamingBtch.length -1)}] add ${NameSpaces.substring(0,NamingBtch.length -1)}`);
    if (DEBUGASSHOLE){
        btch.world.sendMessage(`Given Player Book`);
    }
}

btch.world.afterEvents.playerSpawn.subscribe((event)=>{
    const shit = event;
    givePlayerBook(shit.player);
})