import { Entity } from "@minecraft/server";
class Utils {
    /**
     * @param {Entity} entity
     */
    constructor(entity) {
        this.entity = entity;
        this.rideable = entity?.getComponent("rideable");
        this.player = this.rideable?.getRiders()[0];
        this.riding = this.player?.getComponent("riding");
    }

    /**
     * @param {number} flySpeed
     * @param {number} fallSpeed
     * @param {number} XZspeed
     */
    flySystem(flySpeed, fallSpeed, XZspeed) {
        if (!this.riding) return;
        const direction = {
            x: 0,
            y: this.player.isJumping ? flySpeed : fallSpeed,
            z: 0,
        };
        this.entity.addEffect("speed",2, {
            showParticles: false,
            amplifier: XZspeed,
        });
        this.entity.applyImpulse(direction);
    }
}

export default Utils;