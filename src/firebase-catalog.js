import { getPATHS } from "./db-paths.js";

function entry(root, key, kind, label) {
  return { key, root, kind, defaultLabel: label ?? defaultDisplayLabel(key, kind) };
}

function channelNumber(key, prefix) {
  if (!key.startsWith(prefix)) return null;
  const m = key.slice(prefix.length).match(/^(\d+)/);
  return m ? m[1] : null;
}

/** Human name for a channel key, e.g. alarm1 → "Alarm 1", SW3 → "Switch 3". */
export function defaultDisplayLabel(firebaseKey, kind) {
  const { meta } = getPATHS();
  if (kind === "switch" || firebaseKey.startsWith(meta.switchPrefix)) {
    const n = channelNumber(firebaseKey, meta.switchPrefix);
    return n ? `Switch ${n}` : firebaseKey;
  }
  if (kind === "motor" || firebaseKey.startsWith(meta.motorPrefix)) {
    const n = channelNumber(firebaseKey, meta.motorPrefix);
    return n ? `Motor ${n}` : firebaseKey;
  }
  if (kind === "alarm" || firebaseKey.startsWith(meta.alarmPrefix) || firebaseKey.startsWith("ALRM")) {
    let n = channelNumber(firebaseKey, meta.alarmPrefix);
    if (!n && firebaseKey.startsWith("ALRM")) n = channelNumber(firebaseKey, "ALRM");
    return n ? `Alarm ${n}` : firebaseKey;
  }
  return firebaseKey;
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
    ...toggles.map((key) => entry(root, key, "switch")),
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
  const { root, toggles, timings, pushes } = motors;
  return [
    ...toggles.map((key) => entry(root, key, "motor")),
    ...pushes.map((key) => entry(root, key, "motor-push", key)),
    ...timings
      .map((key) => {
        const kind = timingKindForKey(key, meta.onTimingSuffix, meta.offTimingSuffix);
        return kind ? entry(root, key, kind, key) : null;
      })
      .filter(Boolean),
  ];
}

function buildAlarmCatalog() {
  const { alarms } = getPATHS();
  const { root, toggles, pushes } = alarms;
  return [
    ...toggles.map((key) => entry(root, key, "alarm")),
    ...pushes.map((key) => entry(root, key, "alarm-push", key)),
  ];
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

export function isPushKind(kind) {
  return kind === "motor-push" || kind === "alarm-push";
}

export function isPushRoomType(roomType) {
  return roomType === "motor" || roomType === "alarm";
}

export function pushKeyFor(baseKey) {
  return `${baseKey}${getPATHS().meta.pushSuffix}`;
}
