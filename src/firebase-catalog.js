import { getPATHS } from "./db-paths.js";

function entry(root, key, kind, label) {
  return { key, root, kind, defaultLabel: label ?? key };
}

function timingKindForKey(key, onSuffix, offSuffix) {
  if (key.endsWith(onSuffix)) return "timing-on";
  if (key.endsWith(offSuffix)) return "timing-off";
  return null;
}

function buildSwitchCatalog() {
  const { switches, meta } = getPATHS();
  const { root, toggles, timings } = switches;
  return [
    ...toggles.map((key) => entry(root, key, "switch", key)),
    ...timings
      .map((key) => {
        const kind = timingKindForKey(key, meta.onTimingSuffix, meta.offTimingSuffix);
        return kind ? entry(root, key, kind, key) : null;
      })
      .filter(Boolean),
  ];
}

function buildMotorCatalog() {
  const { motors, meta } = getPATHS();
  const { root, toggles, timings } = motors;
  return [
    ...toggles.map((key) => entry(root, key, "motor", key)),
    ...timings
      .map((key) => {
        const kind = timingKindForKey(key, meta.onTimingSuffix, meta.offTimingSuffix);
        return kind ? entry(root, key, kind, key) : null;
      })
      .filter(Boolean),
  ];
}

function buildAlarmCatalog() {
  const { root, toggles } = getPATHS().alarms;
  return toggles.map((key) => entry(root, key, "alarm", key));
}

let catalogCache = null;

export function rebuildCatalog() {
  catalogCache = {
    switch: buildSwitchCatalog(),
    motor: buildMotorCatalog(),
    alarm: buildAlarmCatalog(),
  };
}

function getCatalog() {
  if (!catalogCache) rebuildCatalog();
  return catalogCache;
}

export function catalogForType(roomType) {
  const C = getCatalog();
  if (roomType === "switch") return C.switch;
  if (roomType === "motor") return C.motor;
  return C.alarm;
}

export function addableCatalog(roomType) {
  if (roomType === "switch") return catalogForType("switch").filter((d) => d.kind === "switch");
  if (roomType === "motor") return catalogForType("motor").filter((d) => d.kind === "motor");
  return catalogForType("alarm");
}

export function timingPathsFor(baseKey) {
  const { onTimingSuffix, offTimingSuffix } = getPATHS().meta;
  return {
    on: `${baseKey}${onTimingSuffix}`,
    off: `${baseKey}${offTimingSuffix}`,
  };
}

export function hasBuiltInSchedule(kind) {
  return kind === "switch" || kind === "motor";
}

export function metaForKey(firebaseKey) {
  const C = getCatalog();
  return (
    C.switch.find((d) => d.key === firebaseKey) ||
    C.motor.find((d) => d.key === firebaseKey) ||
    C.alarm.find((d) => d.key === firebaseKey)
  );
}

export function isTimingKind(kind) {
  return kind === "timing-on" || kind === "timing-off";
}
