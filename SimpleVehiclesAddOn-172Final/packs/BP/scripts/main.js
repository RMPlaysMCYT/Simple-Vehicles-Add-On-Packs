// import { itemDatabaseSave } from "./itemInteraction/item_db";

// import { itemSet1 } from "./itemInteraction/itemStuff";
// itemDatabaseSave();

// console.log("Addon Loaded")

// world.afterEvents.playerInteractWithEntity.subscribe(activated => {

// })


import { system, world } from "@minecraft/server";
// import { itemLoreFormal } from "./utils/customBlocks";
import './booksGuide';
import './documentation/MainMenu';
import './honkItem';
import './setLoreInfo';
import './itemInteraction/item_db.js';

// import * as fck from "./itemInteraction/playerOnEnter"

let onWorldStartedSetup = false;
let onWorldFinishedSetup = false;

// async function onWorldTicks() {
//     fck.onWorldTicks();
// }

// async function Loop() {
//     system.run(onWorldTicks);
//     system.run(Loop);

    
//     system.run(Loop);   
// }

// system.runInterval(() => {
//     world.getAllPlayers().forEach((player) => {
//         itemLoreFormal(player);
//     })
// }, 1);

// system.run(Loop);