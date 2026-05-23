import { ref, get, remove } from "firebase/database";
import { getPATHS, refPath } from "./db-paths.js";
import { catalogForType } from "./firebase-catalog.js";
import { roomsForType, persistLayout } from "./room-store.js";

function allowedKeysByRoot() {
  const P = getPATHS();
  return [
    {
      root: P.switches.root,
      allowed: new Set([...P.switches.toggles, ...P.switches.timings]),
    },
    {
      root: P.motors.root,
      allowed: new Set([...P.motors.toggles, ...P.motors.timings, ...P.motors.pushes]),
    },
    {
      root: P.alarms.root,
      allowed: new Set([...P.alarms.toggles, ...P.alarms.pushes]),
    },
  ];
}

/** Remove Firebase keys above the configured switch/motor/alarm counts. */
export async function pruneChannelsToCounts(db) {
  const plans = allowedKeysByRoot();
  const removed = [];
  for (const { root, allowed } of plans) {
    const snap = await get(ref(db, root));
    const data = snap.val();
    if (!data || typeof data !== "object") continue;
    for (const key of Object.keys(data)) {
      if (!allowed.has(key)) {
        await remove(ref(db, refPath(root, key)));
        removed.push(`${root}/${key}`);
      }
    }
  }
  return removed;
}

/** Drop room devices that are no longer in the catalog for current counts. */
export function pruneLayoutDevices(layout) {
  const allowed = new Set([
    ...catalogForType("switch").map((d) => d.key),
    ...catalogForType("motor").map((d) => d.key),
    ...catalogForType("alarm").map((d) => d.key),
  ]);
  for (const roomType of ["switch", "motor", "alarm"]) {
    for (const room of roomsForType(layout, roomType)) {
      room.devices = room.devices.filter((d) => allowed.has(d.firebaseKey));
    }
  }
  return layout;
}

export async function applyCountLimits(db, layout) {
  await pruneChannelsToCounts(db);
  const next = pruneLayoutDevices(layout);
  persistLayout(next);
  return next;
}
