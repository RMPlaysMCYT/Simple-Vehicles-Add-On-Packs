export var DoorInteraction = class {
    doorInteract(e, r, t = !1) {
      if (e.isSneaking) return;
      if (
        e.location.y > e.dimension.heightRange.max - 1 ||
        r.location.y > e.dimension.heightRange.max - 1
      ) {
        r.getComponent(_.Rideable).addRider(e);
        return;
      }
      let n = p[r.typeId];
      if (!n || !n.doors || !n.collisionRadius) return;
      let o = e.getViewDirection(),
        i = e.getHeadLocation(),
        c = z.distance(i, r.location),
        d = 0,
        u = { ...i };
      for (; d < c; )
        if (
          ((u.x += o.x * 0.5),
          (u.y += o.y * 0.5),
          (u.z += o.z * 0.5),
          t && e.dimension.spawnParticle("minecraft:basic_flame_particle", u),
          (d = z.distance(
            { x: r.location.x, y: 0, z: r.location.z },
            { x: u.x, y: 0, z: u.z }
          )),
          d < n.collisionRadius - 0.55)
        ) {
          let g = `aurrora_ve.${this.getUniqueId()}`,
            re = r.dimension.getEntities({ type: "aurrora_ve:dummy" });
          for (let m of re) m.remove();
          for (let m of n.doors)
            r.dimension.runCommand(
              `execute positioned ${r.location.x} ${r.location.y} ${r.location.z} as @e[type=${r.typeId},c=1,r=1] run summon aurrora_ve:dummy ${g}.${m.name} ^${m.position.x} ^${m.position.y} ^${m.position.z}`
            );
          l.runTimeout(() => {
            let m;
            if (!n.doors) return;
            for (let V of n.doors) {
              let U = r.dimension.getEntities({
                type: "aurrora_ve:dummy",
                name: `${g}.${V.name}`,
              });
              if (U.length > 0) {
                let J = U[0],
                  W = Math.abs(z.distance(J.location, u));
                (m === void 0 || W < m[0]) && (m = [W, V]), J.remove();
              }
            }
            if (m === void 0) return;
            let j = r.getProperty(`aurrora_ve:door_${m[1].name}_open`);
            j !== void 0 &&
              (j !== "closed"
                ? r.getComponent(_.Rideable).addRider(e)
                : r.triggerEvent(`aurrora_ve:door_${m[1].name}_open`));
          }, 0);
          break;
        }
    },
    doorInteractiones new DoorInteraction();
}