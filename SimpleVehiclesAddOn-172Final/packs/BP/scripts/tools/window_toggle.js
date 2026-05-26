import { world } from "@minecraft/server";

function getRiddenVehicle(player) {
  try {
    const riding = player.getComponent("minecraft:riding");
    return riding?.entityRidingOn;
  } catch {
    return undefined;
  }
}

function handleVehicleControlItemUse(player, itemId) {
  const vehicle = getRiddenVehicle(player);
  if (!vehicle) return;

  switch (itemId) {
    case "simple_vehicles:tool_window_open": {
      const current = vehicle.getProperty("simple_vehicles:window_toggle");

      if (current === "open" || current === "opening") {
        vehicle.setProperty("simple_vehicles:window_toggle", "closing");
      } else {
        vehicle.setProperty("simple_vehicles:window_toggle", "opening");
      }
      break;
    }
  }
}

world.afterEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  if (!player || !item) return;

  handleVehicleControlItemUse(player, item.typeId);
});