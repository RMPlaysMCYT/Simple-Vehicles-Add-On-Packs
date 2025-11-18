import { world, system, TimeOfDay } from "@minecraft/server";

let scoreboard = world.scoreboard;
export const overworld = world.getDimension("overworld");
export const nether = world.getDimension("nether");
export const end = world.getDimension("the_end");
export const dimensiones = [overworld, nether, end];
export let player000 = undefined;
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function floorVector(vector) {
  return {
    x: Math.floor(vector.x),
    y: Math.floor(vector.y + 0.5),
    z: Math.floor(vector.z),
  };
}
export async function runCommand(command, dim) {
  if (dim === undefined) return await overworld.runCommandAsync(command);
  return await dim.runCommandAsync(command);
}

export async function runPlayer0Command(command) {
  return await player0.runCommandAsync(command);
}

export async function runPlayerCommand(entity, command) {
  return await entity.runCommandAsync(command);
}
export async function runDelayedPlayerCommand(delay, entity, command) {
  return await system.runTimeout(() => {
    runPlayerCommand(entity, command);
  }, delay);
}
export async function runDelayedEntityCommand(delay, entity, command) {
  return await system.runTimeout(() => {
    runEntityCommand(entity, command);
  }, delay);
}
export async function runMobCommand(entity, command) {
  return await entity.runCommandAsync(command);
}
export async function runEntityCommand(entity, command) {
  return await entity.runCommandAsync(command);
}
