import { getPATHS } from "./db-paths.js";
import {
  catalogForType,
  addableCatalog,
  pushKeyFor,
  defaultDisplayLabel,
} from "./firebase-catalog.js";

const STORAGE_KEY = "lumina-room-layout-v4";

export const MAX_ADDITIONAL_ROOMS = 25;
export const MAX_ROOMS_PER_TYPE = 1 + MAX_ADDITIONAL_ROOMS;

let remoteSave = null;

export function setLayoutRemoteSaver(fn) {
  remoteSave = fn;
}

function uid() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function defaultLayout() {
  return {
    switchRooms: [{ id: "switch-main", name: "Switches", devices: [] }],
    motorRooms: [{ id: "motor-main", name: "Motors", devices: [] }],
    alarmRooms: [{ id: "alarm-security", name: "Security", devices: [] }],
  };
}

function normalizeDeviceLabel(label, firebaseKey, kind) {
  const friendly = defaultDisplayLabel(firebaseKey, kind);
  const raw = String(label || "").trim();
  if (!raw || raw === firebaseKey || raw.toLowerCase() === firebaseKey.toLowerCase()) {
    return friendly;
  }
  const lower = raw.toLowerCase();
  const friendlyLower = friendly.toLowerCase();
  if (lower === friendlyLower) return friendly;
  if (lower === `${kind} ${friendlyLower}` || lower === `${kind} ${firebaseKey.toLowerCase()}`) {
    return friendly;
  }
  if (kind === "alarm" && /^alarm\s+/i.test(raw) && lower.includes(firebaseKey.toLowerCase())) {
    return friendly;
  }
  if (kind === "switch" && /^switch\s+/i.test(raw) && lower.includes(firebaseKey.toLowerCase())) {
    return friendly;
  }
  if (kind === "motor" && /^motor\s+/i.test(raw) && lower.includes(firebaseKey.toLowerCase())) {
    return friendly;
  }
  return raw;
}

function normalizeRoom(room) {
  if (!room || typeof room !== "object") return null;
  return {
    id: room.id || uid(),
    name: String(room.name || "Room"),
    devices: Array.isArray(room.devices)
      ? room.devices
          .filter((d) => d && d.firebaseKey && !isStandaloneAuxKey(d.firebaseKey))
          .map((d) => {
            const kind = d.kind || inferKind(d.firebaseKey);
            return {
              firebaseKey: d.firebaseKey,
              label: normalizeDeviceLabel(d.label, d.firebaseKey, kind),
              kind,
              controlMode: normalizeControlMode(d.controlMode, kind),
            };
          })
      : [],
  };
}

function isStandaloneAuxKey(firebaseKey) {
  const { meta } = getPATHS();
  return (
    firebaseKey.endsWith(meta.onTimingSuffix) ||
    firebaseKey.endsWith(meta.offTimingSuffix) ||
    firebaseKey.endsWith(meta.pushSuffix)
  );
}

function inferKind(firebaseKey) {
  const { meta } = getPATHS();
  if (firebaseKey.endsWith(meta.onTimingSuffix)) return "timing-on";
  if (firebaseKey.endsWith(meta.offTimingSuffix)) return "timing-off";
  if (firebaseKey.startsWith(meta.switchPrefix)) return "switch";
  if (firebaseKey.startsWith(meta.motorPrefix)) {
    return firebaseKey.endsWith(meta.pushSuffix) ? "motor-push" : "motor";
  }
  if (firebaseKey.startsWith(meta.alarmPrefix) || firebaseKey.startsWith("ALRM")) {
    return firebaseKey.endsWith(meta.pushSuffix) ? "alarm-push" : "alarm";
  }
  return "switch";
}

/** @returns {"toggle" | "push"} */
function normalizeControlMode(mode, kind) {
  if (kind === "switch") return "toggle";
  if (mode === "push" || mode === "toggle") return mode;
  if (kind === "motor" || kind === "alarm") return "push";
  return "toggle";
}

export function usesPushControl(device) {
  return device?.controlMode === "push";
}

export function canChooseControlMode(roomType) {
  return roomType === "motor" || roomType === "alarm";
}

export function normalizeLayout(data) {
  const fallback = defaultLayout();
  if (!data || typeof data !== "object") return fallback;
  const norm = (rooms, fb) => {
    if (!Array.isArray(rooms)) return fb;
    return rooms.map(normalizeRoom).filter(Boolean);
  };
  return {
    switchRooms: norm(data.switchRooms, fallback.switchRooms),
    motorRooms: norm(data.motorRooms, fallback.motorRooms),
    alarmRooms: norm(data.alarmRooms, fallback.alarmRooms),
  };
}

export function loadLayoutLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultLayout();
    return normalizeLayout(JSON.parse(raw));
  } catch {
    return defaultLayout();
  }
}

export function saveLayoutLocal(layout) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    /* quota / private mode */
  }
}

export function persistLayout(layout) {
  saveLayoutLocal(layout);
  remoteSave?.(layout);
}

export function roomsForType(layout, roomType) {
  if (roomType === "switch") return layout.switchRooms;
  if (roomType === "motor") return layout.motorRooms;
  return layout.alarmRooms;
}

export function roomCountForType(layout, roomType) {
  return roomsForType(layout, roomType).length;
}

export function canAddRoom(layout, roomType) {
  return roomCountForType(layout, roomType) < MAX_ROOMS_PER_TYPE;
}

export function findRoom(layout, roomType, roomId) {
  return roomsForType(layout, roomType).find((r) => r.id === roomId);
}

export function addRoom(layout, roomType, name) {
  const rooms = roomsForType(layout, roomType);
  if (rooms.length >= MAX_ROOMS_PER_TYPE) {
    return {
      room: null,
      error: `Limit reached: max ${MAX_ADDITIONAL_ROOMS} additional rooms (${MAX_ROOMS_PER_TYPE} total per type).`,
    };
  }
  const room = { id: uid(), name: name.trim() || "New Room", devices: [] };
  rooms.push(room);
  persistLayout(layout);
  return { room, error: null };
}

export function removeRoom(layout, roomType, roomId) {
  const rooms = roomsForType(layout, roomType);
  if (rooms.length <= 1) {
    return { error: "Keep at least one room in this category." };
  }
  const i = rooms.findIndex((r) => r.id === roomId);
  if (i >= 0) rooms.splice(i, 1);
  persistLayout(layout);
  return { error: null };
}

export function renameRoom(layout, roomType, roomId, name) {
  const room = findRoom(layout, roomType, roomId);
  if (room) room.name = name.trim() || room.name;
  persistLayout(layout);
}

export function renameDevice(layout, roomType, roomId, firebaseKey, label) {
  const room = findRoom(layout, roomType, roomId);
  const dev = room?.devices.find((d) => d.firebaseKey === firebaseKey);
  if (dev) dev.label = label.trim() || dev.label;
  persistLayout(layout);
}

export function addDeviceToRoom(layout, roomType, roomId, firebaseKey, controlMode = "toggle") {
  const room = findRoom(layout, roomType, roomId);
  const meta = addableCatalog(roomType).find((d) => d.key === firebaseKey);
  if (!room || !meta) return false;
  if (room.devices.some((d) => d.firebaseKey === firebaseKey)) return false;
  room.devices.push({
    firebaseKey: meta.key,
    label: meta.defaultLabel,
    kind: meta.kind,
    controlMode: normalizeControlMode(controlMode, meta.kind),
  });
  persistLayout(layout);
  return true;
}

export function removeDeviceFromRoom(layout, roomType, roomId, firebaseKey) {
  const room = findRoom(layout, roomType, roomId);
  if (!room) return;
  room.devices = room.devices.filter((d) => d.firebaseKey !== firebaseKey);
  persistLayout(layout);
}

export function availableKeys(layout, roomType) {
  const catalog = addableCatalog(roomType);
  const used = new Set();
  for (const room of roomsForType(layout, roomType)) {
    for (const d of room.devices) used.add(d.firebaseKey);
  }
  return catalog.filter((d) => !used.has(d.key));
}

export function roomAbbr(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function countRoomActive(room, values) {
  return room.devices.filter((d) => {
    if (isTimingKind(d.kind)) return false;
    const meta = catalogForType(
      d.kind === "switch" ? "switch" : d.kind === "alarm" ? "alarm" : "motor"
    ).find((x) => x.key === d.firebaseKey);
    if (!meta) return false;
    const key = usesPushControl(d) ? pushKeyFor(d.firebaseKey) : d.firebaseKey;
    const path = `${meta.root}/${key}`;
    const v = values[path];
    return ["1", "ON", "on", "true", true, 1].includes(v) || String(v).trim() === "1";
  }).length;
}

function isTimingKind(kind) {
  return kind === "timing-on" || kind === "timing-off";
}
