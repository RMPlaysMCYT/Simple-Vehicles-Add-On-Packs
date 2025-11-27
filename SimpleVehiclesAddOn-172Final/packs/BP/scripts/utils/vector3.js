function add(e, r) {
    return { x: e.x + (r.x ?? 0), y: e.y + (r.y ?? 0), z: e.z + (r.z ?? 0) };
}
function subtract(e, r) {
    return { x: e.x - (r.x ?? 0), y: e.y - (r.y ?? 0), z: e.z - (r.z ?? 0) };
}