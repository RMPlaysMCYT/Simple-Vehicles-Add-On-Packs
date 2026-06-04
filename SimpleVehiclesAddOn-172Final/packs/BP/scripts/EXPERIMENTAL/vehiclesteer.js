import { system, Entity, Player } from '@minecraft/server'

export class Vehicle {
    /** @param {Entity} entity @param {Player} player */
    constructor(entity, player) {
        this.entity = entity
        this.player = player
        // Property is stored as 0-720, where 360 = neutral (straight)
        this.steering_angle = entity.getProperty("simple_vehicles:steering") - 360
        this.vel = 0
        this.loop()
    }

    entity
    player
    /** Current steering offset from neutral (-180 = full left, +180 = full right) */
    steering_angle = 0
    vel = 0

    /** Max steering deflection in property units (360 ± 180 = full lock) */
    static MAX_STEER = 180
    /** How fast the wheel turns per tick when holding A/D */
    static STEER_RATE = 7
    /** How fast the wheel self-centers per tick when A/D released */
    static RETURN_RATE = 9

    /** Push the current steering_angle back into the entity property */
    syncProperty() {
        this.entity.setProperty(
            "simple_vehicles:steering",
            Math.round(this.steering_angle + 360) // shift back to [0-720] range
        )
    }

    behavior() {
        const entity = this.entity

        // ── Input ────────────────────────────────────────────────────────────
        // getMovementVector():
        //   x  →  A = -1, D = +1  (steer left/right)
        //   y  →  S = -1, W = +1  (throttle back/forward)
        const { x: steerInput, y: throttleInput } = this.player.inputInfo.getMovementVector()

        // ── Steering angle update ─────────────────────────────────────────────
        if (steerInput !== 0) {
            // Accumulate steering while A/D held
            this.steering_angle += steerInput * Vehicle.STEER_RATE
        } else {
            // Self-center when no input
            if (Math.abs(this.steering_angle) <= Vehicle.RETURN_RATE) {
                this.steering_angle = 0
            } else {
                this.steering_angle -= Math.sign(this.steering_angle) * Vehicle.RETURN_RATE
            }
        }

        // Hard clamp to full-lock limits
        this.steering_angle = Math.max(
            -Vehicle.MAX_STEER,
            Math.min(Vehicle.MAX_STEER, this.steering_angle)
        )

        // ── Throttle / speed ──────────────────────────────────────────────────
        const throttle = Math.round(throttleInput / 1.2) // snap to -1 / 0 / 1

        const MAX_SPEED    = 0.65
        const ACCELERATION = 0.04
        const FRICTION     = 0.025
        const BRAKE_FORCE  = 0.07

        if (throttle > 0) {
            this.vel = Math.min(this.vel + ACCELERATION, MAX_SPEED)
        } else if (throttle < 0) {
            if (this.vel > 0.01) {
                // Brake first, then reverse
                this.vel = Math.max(0, this.vel - BRAKE_FORCE)
            } else {
                this.vel = Math.max(this.vel - ACCELERATION, -MAX_SPEED * 0.4)
            }
        } else {
            // Coast / rolling friction
            this.vel += this.vel > 0
                ? -Math.min(FRICTION, this.vel)
                :  Math.min(FRICTION, -this.vel)
        }

        this.vel = parseFloat(this.vel.toFixed(3))

        // ── Apply movement ────────────────────────────────────────────────────
        const view = entity.getViewDirection()
        if (this.vel !== 0) {
            entity.applyKnockback(
                { x: view.x * (this.vel / 20), z: view.z * (this.vel / 20) },
                0
            )
        }

        // ── Apply yaw rotation ────────────────────────────────────────────────
        // Turn rate scales with both speed and steering angle.
        // At zero speed the car shouldn't spin in place.
        const baseRot = entity.getRotation()
        const steerNorm   = this.steering_angle / Vehicle.MAX_STEER   // -1..+1
        const speedFactor = Math.abs(this.vel) / MAX_SPEED             // 0..1
        // Flip sign when reversing so steering feels natural in reverse
        const direction   = Math.sign(this.vel || 1)
        const turnRate    = steerNorm * speedFactor * 3.5 * direction

        entity.setRotation({ x: baseRot.x, y: baseRot.y + turnRate })
    }

    loop() {
        const runId = system.runInterval(() => {
            if (!this.entity.isValid) return system.clearRun(runId)

            const rideable = this.entity.getComponent("rideable")
            if (!rideable || rideable.getRiders().length === 0)
                return system.clearRun(runId)

            this.behavior()
            this.syncProperty()  // keeps the animation in sync each tick
        })
    }
}