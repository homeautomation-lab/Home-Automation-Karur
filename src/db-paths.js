export const DEFAULT_PATH_SETTINGS = {
  switchRoot: "SWITCH_CONTROL",
  motorRoot: "MOTOR_CONTROL",
  alarmRoot: "ALARM_CONTROLS",
  layoutRoot: "HOME_CONSOLE_LAYOUT",
  switchCount: 40,
  motorCount: 10,
  alarmCount: 10,
  switchPrefix: "SW",
  motorPrefix: "M",
  alarmPrefix: "ALRM",
  onTimingSuffix: "-ON_TIMING",
  offTimingSuffix: "-OFF_TIMING",
  pushSuffix: "-PUSH",
};

function numList(prefix, count) {
  return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
}

function timingKeys(prefix, count, onSuffix, offSuffix) {
  const keys = [];
  for (let i = 1; i <= count; i++) {
    keys.push(`${prefix}${i}${onSuffix}`, `${prefix}${i}${offSuffix}`);
  }
  return keys;
}

function pushKeys(prefix, count, pushSuffix) {
  return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}${pushSuffix}`);
}

export function buildPaths(cfg) {
  const c = { ...DEFAULT_PATH_SETTINGS, ...cfg };
  const sw = Math.max(1, parseInt(c.switchCount, 10) || 40);
  const mo = Math.max(1, parseInt(c.motorCount, 10) || 10);
  const al = Math.max(1, parseInt(c.alarmCount, 10) || 10);
  return {
    switches: {
      root: c.switchRoot,
      toggles: numList(c.switchPrefix, sw),
      timings: timingKeys(c.switchPrefix, sw, c.onTimingSuffix, c.offTimingSuffix),
    },
    motors: {
      root: c.motorRoot,
      toggles: numList(c.motorPrefix, mo),
      timings: timingKeys(c.motorPrefix, mo, c.onTimingSuffix, c.offTimingSuffix),
      pushes: pushKeys(c.motorPrefix, mo, c.pushSuffix),
    },
    alarms: {
      root: c.alarmRoot,
      toggles: numList(c.alarmPrefix, al),
      pushes: pushKeys(c.alarmPrefix, al, c.pushSuffix),
    },
    meta: {
      switchCount: sw,
      motorCount: mo,
      alarmCount: al,
      onTimingSuffix: c.onTimingSuffix,
      offTimingSuffix: c.offTimingSuffix,
      pushSuffix: c.pushSuffix,
    },
  };
}

let pathState = buildPaths(DEFAULT_PATH_SETTINGS);

export function applyPathConfig(cfg) {
  pathState = buildPaths(cfg);
}

export function getPATHS() {
  return pathState;
}

export function getDeviceCounts() {
  return pathState.meta;
}

export function refPath(root, key) {
  return `${root}/${key}`;
}

export function allControlPaths() {
  const paths = [];
  const P = pathState;
  for (const k of P.switches.toggles) paths.push(refPath(P.switches.root, k));
  for (const k of P.switches.timings) paths.push(refPath(P.switches.root, k));
  for (const k of P.motors.toggles) paths.push(refPath(P.motors.root, k));
  for (const k of P.motors.timings) paths.push(refPath(P.motors.root, k));
  for (const k of P.motors.pushes) paths.push(refPath(P.motors.root, k));
  for (const k of P.alarms.toggles) paths.push(refPath(P.alarms.root, k));
  for (const k of P.alarms.pushes) paths.push(refPath(P.alarms.root, k));
  return paths;
}

export function allTogglePaths() {
  const paths = [];
  const P = pathState;
  for (const k of P.switches.toggles) paths.push(refPath(P.switches.root, k));
  for (const k of P.motors.toggles) paths.push(refPath(P.motors.root, k));
  for (const k of P.alarms.toggles) paths.push(refPath(P.alarms.root, k));
  return paths;
}

export function getControlRoots() {
  const P = pathState;
  return [P.switches.root, P.motors.root, P.alarms.root];
}
