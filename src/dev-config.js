import { firebaseConfig as fileFirebase } from "./firebase-config.js";
import { applyPathConfig, getDeviceCounts, DEFAULT_PATH_SETTINGS } from "./db-paths.js";

const STORAGE_KEY = "lumina-dev-config";

export { DEFAULT_PATH_SETTINGS };

function loadRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Apply saved developer settings (call once at startup). */
export function initRuntimeConfig() {
  const saved = loadRaw();
  const paths = { ...DEFAULT_PATH_SETTINGS, ...(saved?.paths || {}) };
  applyPathConfig(paths);
  return { paths, firebase: getFirebaseConfig() };
}

export function getFirebaseConfig() {
  const saved = loadRaw();
  const overrides = saved?.firebase || {};
  return {
    ...fileFirebase,
    ...overrides,
    apiKey: overrides.apiKey || fileFirebase.apiKey,
    databaseURL: overrides.databaseURL || fileFirebase.databaseURL,
    appId: overrides.appId || fileFirebase.appId,
  };
}

export function getLayoutRoot() {
  const saved = loadRaw();
  return saved?.paths?.layoutRoot || DEFAULT_PATH_SETTINGS.layoutRoot;
}

export function loadDevSettings() {
  const saved = loadRaw();
  return {
    firebase: {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      ...fileFirebase,
      ...(saved?.firebase || {}),
    },
    paths: {
      ...DEFAULT_PATH_SETTINGS,
      ...(saved?.paths || {}),
    },
    useFileFirebase: !saved?.firebase || Object.keys(saved.firebase).length === 0,
  };
}

export function saveDevSettings({ firebase, paths }) {
  const payload = {
    version: 1,
    updatedAt: Date.now(),
    firebase: {
      apiKey: String(firebase.apiKey || "").trim(),
      authDomain: String(firebase.authDomain || "").trim(),
      databaseURL: String(firebase.databaseURL || "").trim(),
      projectId: String(firebase.projectId || "").trim(),
      storageBucket: String(firebase.storageBucket || "").trim(),
      messagingSenderId: String(firebase.messagingSenderId || "").trim(),
      appId: String(firebase.appId || "").trim(),
    },
    paths: {
      switchRoot: String(paths.switchRoot || DEFAULT_PATH_SETTINGS.switchRoot).trim(),
      motorRoot: String(paths.motorRoot || DEFAULT_PATH_SETTINGS.motorRoot).trim(),
      alarmRoot: String(paths.alarmRoot || DEFAULT_PATH_SETTINGS.alarmRoot).trim(),
      layoutRoot: String(paths.layoutRoot || DEFAULT_PATH_SETTINGS.layoutRoot).trim(),
      switchCount: clampInt(paths.switchCount, 1, 64, DEFAULT_PATH_SETTINGS.switchCount),
      motorCount: clampInt(paths.motorCount, 1, 32, DEFAULT_PATH_SETTINGS.motorCount),
      alarmCount: clampInt(paths.alarmCount, 1, 32, DEFAULT_PATH_SETTINGS.alarmCount),
      switchPrefix: String(paths.switchPrefix || "SW").trim(),
      motorPrefix: String(paths.motorPrefix || "M").trim(),
      alarmPrefix: String(paths.alarmPrefix || "alarm").trim(),
      onTimingSuffix: String(paths.onTimingSuffix || "-ON_TIMING").trim(),
      offTimingSuffix: String(paths.offTimingSuffix || "-OFF_TIMING").trim(),
      pushSuffix: String(paths.pushSuffix || "-PUSH").trim(),
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  applyPathConfig(payload.paths);
  return payload;
}

export function clearDevSettings() {
  localStorage.removeItem(STORAGE_KEY);
  applyPathConfig(DEFAULT_PATH_SETTINGS);
}

function clampInt(val, min, max, fallback) {
  const n = parseInt(val, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function configReady() {
  const c = getFirebaseConfig();
  return (
    c?.apiKey &&
    !String(c.apiKey).includes("YOUR_") &&
    c?.appId &&
    !String(c.appId).includes("YOUR_") &&
    c?.databaseURL
  );
}

export function countsLabel() {
  const n = getDeviceCounts();
  return `${n.switchCount} switches · ${n.motorCount} motors · ${n.alarmCount} alarms`;
}
