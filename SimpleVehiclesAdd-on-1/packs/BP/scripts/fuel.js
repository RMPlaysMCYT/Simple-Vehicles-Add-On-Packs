import { ItemStack, system, world, TicksPerSecond } from "@minecraft/server";
import {Vector3} from "./utilities/vec3"

export class FuelSystem {
    constructor(driver, vehicles, fuelSys){
        this.fuelSys = fuelSys;
        this.vehiProcessores(driver, vehicles);
    }

    vehiProcessores(driver, vehicles){
        const fuelBar = this.getValue(vehicles)
        this.hudProgressores(driver, vehicles, fuelBar);
        const velocityMovement = Math.floor(Vector3.sum(vehicles.getVelocity()) * 10);

        if (fuelBar > 0 && (velocityMovement > 0)) {
            let velocityMovementTimer = fuelBar.velocityMovementTimer.get(vehicles.id);
            if (!velocityMovementTimer) {
                velocityMovementTimer = 0;
            }
            velocityMovementTimer++;
            if (velocityMovementTimer > (fuelBar.defaultTickRate)){
                velocityMovementTimer = 0;
                this.SpeedMove(vehicles, fuelBar, this.fuelSys.)
            }
        }
    }

    SpeedMove(vehicles, fuelBar){
        
    }
}