import { ref, onValue, set } from "firebase/database";
import { normalizeLayout, saveLayoutLocal, loadLayoutLocal } from "./room-store.js";
import { getLayoutRoot } from "./dev-config.js";

let saveTimer = null;

export function subscribeLayout(db, onLayout, onError) {
  const root = getLayoutRoot();
  return onValue(
    ref(db, root),
    (snap) => {
      const val = snap.val();
      if (val && typeof val === "object" && (val.switchRooms || val.motorRooms || val.alarmRooms)) {
        onLayout(normalizeLayout(val));
      } else {
        const local = loadLayoutLocal();
        onLayout(local);
        queueSaveLayout(db, local);
      }
    },
    (err) => onError?.(err)
  );
}

export function queueSaveLayout(db, layout, callbacks = {}) {
  if (!db) return;
  const root = getLayoutRoot();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    set(ref(db, root), {
      version: 4,
      updatedAt: Date.now(),
      switchRooms: layout.switchRooms,
      motorRooms: layout.motorRooms,
      alarmRooms: layout.alarmRooms,
    })
      .then(() => callbacks.onOk?.())
      .catch((err) => callbacks.onErr?.(err));
  }, 350);
}
