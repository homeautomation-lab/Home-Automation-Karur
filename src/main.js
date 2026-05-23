import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getPATHS,
  refPath,
  allControlPaths,
  allTogglePaths,
  getControlRoots,
  getDeviceCounts,
} from "./db-paths.js";
import {
  initRuntimeConfig,
  getFirebaseConfig,
  configReady,
  loadDevSettings,
  saveDevSettings,
  clearDevSettings,
  countsLabel,
} from "./dev-config.js";
import { rebuildCatalog } from "./firebase-catalog.js";
import {
  isTimingKind,
  metaForKey,
  timingPathsFor,
  hasBuiltInSchedule,
  pushKeyFor,
} from "./firebase-catalog.js";
import {
  defaultLayout,
  setLayoutRemoteSaver,
  roomsForType,
  findRoom,
  addRoom,
  removeRoom,
  renameRoom,
  renameDevice,
  addDeviceToRoom,
  removeDeviceFromRoom,
  availableKeys,
  usesPushControl,
  canChooseControlMode,
  roomAbbr,
  canAddRoom,
  roomCountForType,
  MAX_ROOMS_PER_TYPE,
  MAX_ADDITIONAL_ROOMS,
} from "./room-store.js";
import { subscribeLayout, queueSaveLayout } from "./layout-sync.js";
import {
  parseTimeValue,
  formatTimeValue,
  formatTimeDisplay,
  clockHourPosition,
  angleFromPoint,
  hour12FromAngle,
  minuteFromAngle,
  handAngle,
} from "./time-picker.js";
import "./styles.css";

initRuntimeConfig();
rebuildCatalog();

const ON_VALUES = new Set(["1", "ON", "on", "true", "TRUE", true, 1]);

function isOn(value) {
  if (value === null || value === undefined) return false;
  return ON_VALUES.has(value) || ON_VALUES.has(String(value).trim());
}

function nextToggleValue(current) {
  return isOn(current) ? "0" : "1";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning.";
  if (h < 17) return "Good Afternoon.";
  return "Good Evening.";
}

function collectAllKeys() {
  return allControlPaths();
}

function scheduleSummary(values) {
  const P = getPATHS();
  for (const m of P.motors.toggles) {
    const t = timingPathsFor(m);
    const onD = values[refPath(P.motors.root, t.on)];
    const offD = values[refPath(P.motors.root, t.off)];
    if (onD || offD) {
      const onS = onD ? formatTimeDisplay(parseTimeValue(onD)) : "—";
      const offS = offD ? formatTimeDisplay(parseTimeValue(offD)) : "—";
      return `${m} · ON ${onS} · OFF ${offS}`;
    }
  }
  return "Set ON/OFF times on motors or switches from room view";
}

function devicePath(firebaseKey) {
  const meta = metaForKey(firebaseKey);
  return meta ? refPath(meta.root, firebaseKey) : null;
}

function countStats(values, layout) {
  const toggleKeys = allTogglePaths();
  const total = toggleKeys.length;
  const active = toggleKeys.filter((p) => isOn(values[p])).length;
  const roomCount =
    layout.switchRooms.length + layout.motorRooms.length + layout.alarmRooms.length;
  const channelCount = allControlPaths().length;
  return { total, active, roomCount, channelCount };
}

function roomActiveCount(room, values) {
  return room.devices.filter((d) => {
    if (isTimingKind(d.kind)) return false;
    const p = devicePath(d.firebaseKey);
    return p && isOn(values[p]);
  }).length;
}

function renderSetupScreen() {
  return `
    <div class="shell shell--setup shell--dev-only">
      <main class="setup-card setup-card--wide">
        <p class="brand"><span class="brand__lumina">Lumina</span><span class="brand__slash">/OS</span></p>
        <h1>Connect Firebase</h1>
        <p>Add credentials below (saved in this browser), then <strong>Save & reload</strong>.</p>
      </main>
    </div>
  `;
}

function renderClockFace(state) {
  const t = state.ui.timeModal.time;
  const mode = state.ui.timeModal.picking;
  const labels =
    mode === "minute"
      ? [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
      : [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return labels
    .map((val, i) => {
      const angle = i * 30 - 90;
      const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
      const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
      const sel =
        mode === "minute"
          ? t.minute === val || (val === 0 && t.minute === 0)
          : clockHourPosition(t.hour12) === val;
      const display =
        mode === "minute" ? String(val).padStart(2, "0") : val === 12 ? "12" : String(val).padStart(2, "0");
      return `<button type="button" class="clock-num ${sel ? "clock-num--sel" : ""}"
        data-action="pick-clock-val" data-val="${val}"
        style="left:${x}%;top:${y}%">${display}</button>`;
    })
    .join("");
}

function renderTimeModal(state) {
  const m = state.ui.timeModal;
  if (!m) return "";
  const t = m.time;
  const title = m.kind === "timing-on" ? "Set ON time" : "Set OFF time";
  const hourActive = m.picking === "hour";
  const angle = handAngle(t, m.picking);
  const modeHint = hourActive
    ? "Drag the hand or tap an hour"
    : "Drag the hand or tap minutes (00–55)";

  return `
    <div class="modal-backdrop" data-action="backdrop-close">
      <div class="modal modal__panel modal--time" role="dialog" aria-modal="true">
        <header class="modal__head">
          <h2>${escapeHtml(title)}</h2>
          <button type="button" class="modal__close" data-action="close-modal" aria-label="Close">×</button>
        </header>
        <p class="modal__device">${escapeHtml(m.label)} · <code>${escapeHtml(m.firebaseKey)}</code></p>
        <div class="digital-time">
          <button type="button" class="digital-time__part ${hourActive ? "digital-time__part--active" : ""}" data-action="pick-mode" data-mode="hour" data-digital-hour>${String(t.hour12).padStart(2, "0")}</button>
          <span class="digital-time__sep">:</span>
          <button type="button" class="digital-time__part ${!hourActive ? "digital-time__part--active" : ""}" data-action="pick-mode" data-mode="minute" data-digital-minute>${String(t.minute).padStart(2, "0")}</button>
        </div>
        <p class="clock-hint">${modeHint}</p>
        <div class="clock-face" data-clock-face>
          <div class="clock-face__dial"></div>
          ${renderClockFace(state)}
          <div class="clock-hand" data-clock-hand style="transform: rotate(${angle}deg)"></div>
          <div class="clock-hand-hit" data-clock-hand-hit style="transform: rotate(${angle}deg)"></div>
          <div class="clock-center"></div>
        </div>
        <div class="ampm">
          <button type="button" class="ampm__btn ${t.am ? "ampm__btn--on" : ""}" data-action="set-ampm" data-am="1">AM</button>
          <button type="button" class="ampm__btn ${!t.am ? "ampm__btn--on" : ""}" data-action="set-ampm" data-am="0">PM</button>
        </div>
        <div class="minute-row">
          <label>Minutes</label>
          <input type="range" min="0" max="59" value="${t.minute}" data-action="minute-range" data-minute-slider />
          <span data-minute-label>${String(t.minute).padStart(2, "0")}</span>
        </div>
        <footer class="modal__foot modal__foot--spread">
          ${m.hasTime ? `<button type="button" class="btn-outline btn-outline--danger" data-action="clear-time">Turn off timing</button>` : "<span></span>"}
          <div class="modal__foot-actions">
            <button type="button" class="btn-ghost" data-action="close-modal">Cancel</button>
            <button type="button" class="btn-primary" data-action="save-time">Set time</button>
          </div>
        </footer>
      </div>
    </div>
  `;
}

function renderToast(state) {
  if (!state.ui.toast) return "";
  return `<div class="toast" role="status">${escapeHtml(state.ui.toast)}</div>`;
}

function renderAddRoomModal(state, roomType) {
  const label = roomType === "switch" ? "switch" : roomType === "motor" ? "motor" : "alarm";
  const name = state.ui.draft?.newRoomName ?? "";
  const count = roomCountForType(state.layout, roomType);
  const atLimit = !canAddRoom(state.layout, roomType);
  return `
    <div class="modal-backdrop" data-action="backdrop-close">
      <div class="modal modal--sm modal__panel">
        <header class="modal__head"><h2>Add ${label} room</h2>
          <button type="button" class="modal__close" data-action="close-modal">×</button>
        </header>
        <p class="modal__hint">${count}/${MAX_ROOMS_PER_TYPE} rooms · up to ${MAX_ADDITIONAL_ROOMS} additional saved to Firebase</p>
        <label class="field-label">Room name</label>
        <input class="field-input" id="new-room-name" data-draft="newRoomName" value="${escapeHtml(name)}" placeholder="e.g. Living Room" ${atLimit ? "disabled" : ""} />
        ${atLimit ? `<p class="modal__warn">Room limit reached for this category.</p>` : ""}
        <footer class="modal__foot">
          <button type="button" class="btn-ghost" data-action="close-modal">Cancel</button>
          <button type="button" class="btn-primary" data-action="confirm-add-room" ${atLimit ? "disabled" : ""}>Create room</button>
        </footer>
      </div>
    </div>
  `;
}

function renderAddDeviceModal(state, roomType, roomId) {
  const avail = availableKeys(state.layout, roomType);
  if (!avail.length) {
    return `
      <div class="modal-backdrop" data-action="backdrop-close">
        <div class="modal modal--sm modal__panel">
          <p>All channels are used in other rooms. Remove a device from another room first, then add it here.</p>
          <footer class="modal__foot"><button type="button" class="btn-primary" data-action="close-modal">OK</button></footer>
        </div>
      </div>`;
  }
  const selected = state.ui.draft?.addDeviceKey ?? avail[0].key;
  const controlMode = state.ui.draft?.addDeviceControlMode ?? "toggle";
  const showControlChoice = canChooseControlMode(roomType);
  const opts = avail
    .map((d) => {
      const sel = d.key === selected ? " selected" : "";
      return `<option value="${escapeHtml(d.key)}"${sel}>${escapeHtml(d.key)} — ${escapeHtml(d.defaultLabel)}</option>`;
    })
    .join("");
  const controlChoice = showControlChoice
    ? `
        <p class="field-label">Control type</p>
        <div class="control-mode-picker" role="radiogroup" aria-label="Control type">
          <label class="control-mode-picker__option">
            <input type="radio" name="add-device-control" value="toggle" data-draft="addDeviceControlMode"
              ${controlMode === "toggle" ? "checked" : ""} />
            <span class="control-mode-picker__box">
              <span class="control-mode-picker__title">Toggle</span>
              <span class="control-mode-picker__desc">On/off switch · uses main channel key</span>
            </span>
          </label>
          <label class="control-mode-picker__option">
            <input type="radio" name="add-device-control" value="push" data-draft="addDeviceControlMode"
              ${controlMode === "push" ? "checked" : ""} />
            <span class="control-mode-picker__box">
              <span class="control-mode-picker__title">Push button</span>
              <span class="control-mode-picker__desc">Momentary · creates <code>${escapeHtml(pushKeyFor(selected))}</code> in Firebase</span>
            </span>
          </label>
        </div>`
    : `<p class="modal__hint">Switch channels use an on/off toggle. ON/OFF schedules are added automatically.</p>`;
  const hint = showControlChoice
    ? "Motors and alarms can use a toggle or a momentary push button. ON/OFF schedules are added for motors."
    : "";
  return `
    <div class="modal-backdrop" data-action="backdrop-close">
      <div class="modal modal--sm modal__panel">
        <header class="modal__head"><h2>Add device</h2>
          <button type="button" class="modal__close" data-action="close-modal">×</button>
        </header>
        ${hint ? `<p class="modal__hint">${hint}</p>` : ""}
        <label class="field-label">Channel</label>
        <select class="field-input" id="add-device-key" data-draft="addDeviceKey">${opts}</select>
        ${controlChoice}
        <footer class="modal__foot">
          <button type="button" class="btn-ghost" data-action="close-modal">Cancel</button>
          <button type="button" class="btn-primary" data-action="confirm-add-device" data-room-id="${escapeHtml(roomId)}">Add</button>
        </footer>
      </div>
    </div>
  `;
}

function renderPillToggle(meta, device, on) {
  return `
    <button type="button" class="pill-switch ${on ? "pill-switch--on" : ""}" data-action="toggle"
      data-group="${escapeHtml(meta?.root ?? "")}" data-key="${escapeHtml(device.firebaseKey)}">
      <span class="pill-switch__knob"></span>
    </button>`;
}

function renderPushButton(meta, device) {
  const pushKey = pushKeyFor(device.firebaseKey);
  return `
    <button type="button" class="push-btn" data-action="push-hold"
      data-group="${escapeHtml(meta?.root ?? "")}" data-key="${escapeHtml(pushKey)}"
      aria-label="Push ${escapeHtml(device.label)}">
      <span class="push-btn__bezel" aria-hidden="true">
        <span class="push-btn__cap">PUSH</span>
      </span>
    </button>`;
}

function renderScheduleBtn({ timingKey, kind, label, values, root }) {
  const raw = values[refPath(root, timingKey)];
  const enabled = Boolean(raw);
  const display = enabled ? formatTimeDisplay(parseTimeValue(raw)) : "Off";
  return `
    <button type="button" class="schedule-btn${enabled ? "" : " schedule-btn--off"}" data-action="open-time"
      data-key="${escapeHtml(timingKey)}" data-kind="${kind}" data-label="${escapeHtml(label)}">
      <span class="schedule-btn__k">${kind === "timing-on" ? "ON" : "OFF"}</span>
      <span class="schedule-btn__v">${escapeHtml(display)}</span>
    </button>`;
}

function renameHintFor(roomType) {
  if (roomType === "switch") return "Tap name to rename switch";
  if (roomType === "motor") return "Tap name to rename";
  return "Tap name to rename alarm";
}

function renderDeviceRow(device, room, values, roomType) {
  const path = devicePath(device.firebaseKey);
  const raw = path ? values[path] : "";
  const meta = metaForKey(device.firebaseKey);
  const usePush = usesPushControl(device);
  const pushPath = usePush && meta ? refPath(meta.root, pushKeyFor(device.firebaseKey)) : "";
  const pushOn = pushPath ? isOn(values[pushPath]) : false;
  const on = usePush ? pushOn : isOn(raw);
  const schedules = hasBuiltInSchedule(device.kind)
    ? timingPathsFor(device.firebaseKey)
    : null;
  const control = usePush
    ? renderPushButton(meta, device)
    : renderPillToggle(meta, device, on);

  const scheduleRow = schedules
    ? `<div class="schedule-pair">
        ${renderScheduleBtn({
          timingKey: schedules.on,
          kind: "timing-on",
          label: `${device.label} ON`,
          values,
          root: meta.root,
        })}
        ${renderScheduleBtn({
          timingKey: schedules.off,
          kind: "timing-off",
          label: `${device.label} OFF`,
          values,
          root: meta.root,
        })}
      </div>`
    : "";

  const pushHint = usePush
    ? ` · push · ${pushKeyFor(device.firebaseKey)}`
    : " · toggle";
  const blockClass = on ? (usePush ? "device-block--push" : "device-block--on") : "";

  return `
    <div class="device-block ${blockClass}">
      <div class="device-row-wrap">
        <div class="device-row">
          <button type="button" class="device-row__edit" data-action="edit-label" data-key="${escapeHtml(device.firebaseKey)}" title="${escapeHtml(renameHintFor(roomType))}">
            <span class="device-row__title">${escapeHtml(device.label)}</span>
            <span class="device-row__meta">${escapeHtml(room.name)}</span>
            <span class="device-row__hint">${escapeHtml(renameHintFor(roomType))} · <code>${escapeHtml(device.firebaseKey)}</code>${pushHint}${schedules ? " · ON/OFF timing" : ""}</span>
          </button>
          ${control}
        </div>
        <button type="button" class="icon-btn" title="Remove from room" data-action="remove-device" data-key="${escapeHtml(device.firebaseKey)}">−</button>
      </div>
      ${scheduleRow}
    </div>`;
}

function renderRoomDetail(state) {
  const { roomType, roomId } = state.ui;
  const room = findRoom(state.layout, roomType, roomId);
  if (!room) return "";

  const active = roomActiveCount(room, state.values);
  const typeLabel = roomType === "switch" ? "Switches" : roomType === "motor" ? "Motors" : "Alarms";
  const rows = room.devices.map((d) => renderDeviceRow(d, room, state.values, roomType)).join("");

  return `
    <section class="room-detail">
      <button type="button" class="back-link" data-action="go-overview">← My Home</button>
      <div class="room-detail__head">
        <div>
          <span class="room-detail__type">${typeLabel}</span>
          <h1 class="room-detail__title" data-action="edit-room-name" data-room-id="${room.id}">${escapeHtml(room.name)}</h1>
          <p class="room-detail__sub">${active} active · ${room.devices.length} devices</p>
        </div>
        <div class="room-detail__actions">
          <button type="button" class="btn-outline" data-action="open-add-device" data-room-id="${room.id}">+ Add device</button>
          <button type="button" class="btn-outline btn-outline--danger" data-action="delete-room" data-room-id="${room.id}">Delete room</button>
        </div>
      </div>
      <div class="device-list">${rows || '<p class="empty">No devices — add SW/Motor channels from Firebase.</p>'}</div>
    </section>`;
}

function renderRoomCards(rooms, roomType, values) {
  return rooms
    .map((room) => {
      const active = roomActiveCount(room, values);
      const idle = active === 0;
      const timings = room.devices.filter((d) => hasBuiltInSchedule(d.kind)).length;
      return `
        <button type="button" class="zone-card ${idle ? "zone-card--idle" : "zone-card--active"}"
          data-action="open-room" data-room-type="${roomType}" data-room-id="${room.id}">
          <span class="zone-card__abbr">${escapeHtml(roomAbbr(room.name))}</span>
          ${active > 0 ? `<span class="zone-card__count">${active}</span>` : ""}
          <span class="zone-card__status">${idle ? "Idle" : "Active"}</span>
          <h3 class="zone-card__name">${escapeHtml(room.name)}</h3>
          <p class="zone-card__meta">${room.devices.length} devices · ${timings} schedules</p>
          <span class="zone-card__arrow">↗</span>
        </button>`;
    })
    .join("");
}

function renderStatusChips(state) {
  const { values, layout, connected, error } = state;
  const stats = countStats(values, layout);
  const statusLabel = error ? "Error" : connected ? "System Online" : "Connecting…";
  const statusClass = error ? "status--error" : connected ? "status--ok" : "status--warn";
  return `
    <div class="topbar__chips">
      <span class="chip ${statusClass}"><span class="chip__dot"></span>${escapeHtml(statusLabel)}</span>
      <span class="chip chip--muted">${stats.active}/${stats.total} active</span>
    </div>`;
}

function renderAppBar(state) {
  const end =
    state.ui.view === "overview" || state.ui.view === "room" ? renderStatusChips(state) : "";
  return `
    <header class="app-bar">
      <button type="button" class="menu-btn" data-action="toggle-menu"
        aria-label="${state.ui.menuOpen ? "Close menu" : "Open menu"}"
        aria-expanded="${state.ui.menuOpen ? "true" : "false"}">
        <span class="menu-btn__line" aria-hidden="true"></span>
        <span class="menu-btn__line" aria-hidden="true"></span>
        <span class="menu-btn__line" aria-hidden="true"></span>
      </button>
      <div class="app-bar__end">${end}</div>
    </header>`;
}

function renderMenuDrawer(state) {
  const homeActive = state.ui.view === "overview" || state.ui.view === "room";
  const devActive = state.ui.view === "developer";
  return `
    <div class="menu-backdrop ${state.ui.menuOpen ? "menu-backdrop--open" : ""}" data-action="close-menu" aria-hidden="${state.ui.menuOpen ? "false" : "true"}"></div>
    <aside class="menu-drawer ${state.ui.menuOpen ? "menu-drawer--open" : ""}" role="navigation" aria-label="Main menu" aria-hidden="${state.ui.menuOpen ? "false" : "true"}">
      <nav class="menu-drawer__nav">
        <button type="button" class="menu-drawer__item ${homeActive ? "menu-drawer__item--active" : ""}" data-action="go-overview">My Home</button>
        <button type="button" class="menu-drawer__item ${devActive ? "menu-drawer__item--active" : ""}" data-action="go-developer">Developer</button>
      </nav>
    </aside>`;
}

function renderOverview(state) {
  const { values, layout, connected } = state;
  const stats = countStats(values, layout);

  const eventText = scheduleSummary(values);

  return `
    <section class="hero">
      <h1 class="hero__title">${greeting()}</h1>
      <p class="hero__sub">System synchronized. ${stats.roomCount} rooms · ${countsLabel()}.</p>
      <div class="hero__stats">
        <div><span class="hero__stat-k">Active</span><span class="hero__stat-v">${stats.active}/${stats.total}</span></div>
        <div><span class="hero__stat-k">Motors</span><span class="hero__stat-v">${layout.motorRooms.length}</span></div>
        <div><span class="hero__stat-k">Rooms</span><span class="hero__stat-v">${stats.roomCount}</span></div>
      </div>
    </section>

    <section class="event-card">
      <span class="event-card__icon">🔔</span>
      <p class="event-card__text">${escapeHtml(eventText)}</p>
    </section>

    <section class="section-block">
      <div class="section-head">
        <h2>Switch rooms <span class="section-head__count">${layout.switchRooms.length}/${MAX_ROOMS_PER_TYPE}</span></h2>
        <button type="button" class="btn-text" data-action="open-add-room" data-room-type="switch" ${canAddRoom(layout, "switch") ? "" : "disabled"}>+ Add room</button>
      </div>
      <div class="zone-grid">${renderRoomCards(layout.switchRooms, "switch", values)}</div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <h2>Motor rooms <span class="section-head__count">${layout.motorRooms.length}/${MAX_ROOMS_PER_TYPE}</span></h2>
        <button type="button" class="btn-text" data-action="open-add-room" data-room-type="motor" ${canAddRoom(layout, "motor") ? "" : "disabled"}>+ Add room</button>
      </div>
      <div class="zone-grid">${renderRoomCards(layout.motorRooms, "motor", values)}</div>
    </section>

    <section class="section-block">
      <div class="section-head">
        <h2>Alarm rooms <span class="section-head__count">${layout.alarmRooms.length}/${MAX_ROOMS_PER_TYPE}</span></h2>
        <button type="button" class="btn-text" data-action="open-add-room" data-room-type="alarm" ${canAddRoom(layout, "alarm") ? "" : "disabled"}>+ Add room</button>
      </div>
      <div class="zone-grid">${renderRoomCards(layout.alarmRooms, "alarm", values)}</div>
    </section>

    <footer class="hw-bar">
      <div class="hw-item"><span class="hw-item__k">Hardware</span><span class="hw-item__v">ESP32</span></div>
      <div class="hw-item"><span class="hw-item__k">Signal</span><span class="hw-item__v">${connected ? "Live" : "—"}</span></div>
      <div class="hw-item"><span class="hw-item__k">Backend</span><span class="hw-item__v">Firebase</span></div>
      <div class="hw-item"><span class="hw-item__k">Channels</span><span class="hw-item__v">${stats.channelCount}</span></div>
    </footer>`;
}

function devField(id, label, value, type = "text") {
  return `
    <label class="dev-field">
      <span class="dev-field__label">${escapeHtml(label)}</span>
      <input class="dev-field__input" type="${type}" id="${id}" data-dev-field="${id}" value="${escapeHtml(value ?? "")}" />
    </label>`;
}

function renderDeveloper(state) {
  const d = state.devDraft || loadDevSettings();
  const P = getPATHS();
  return `
    <p class="dev-intro">Credentials and Firebase paths are stored in this browser. After saving, the page reloads to connect with new settings.</p>

    <section class="dev-panel">
      <h2>Firebase credentials</h2>
      <div class="dev-grid">
        ${devField("fb-apiKey", "apiKey", d.firebase.apiKey)}
        ${devField("fb-authDomain", "authDomain", d.firebase.authDomain)}
        ${devField("fb-databaseURL", "databaseURL", d.firebase.databaseURL)}
        ${devField("fb-projectId", "projectId", d.firebase.projectId)}
        ${devField("fb-storageBucket", "storageBucket", d.firebase.storageBucket)}
        ${devField("fb-messagingSenderId", "messagingSenderId", d.firebase.messagingSenderId)}
        ${devField("fb-appId", "appId", d.firebase.appId)}
      </div>
    </section>

    <section class="dev-panel">
      <h2>Firebase paths & channel counts</h2>
      <div class="dev-grid">
        ${devField("path-switchRoot", "Switch root path", d.paths.switchRoot)}
        ${devField("path-motorRoot", "Motor root path", d.paths.motorRoot)}
        ${devField("path-alarmRoot", "Alarm root path", d.paths.alarmRoot)}
        ${devField("path-layoutRoot", "Room layout path", d.paths.layoutRoot)}
        ${devField("path-switchCount", "Switch count", d.paths.switchCount, "number")}
        ${devField("path-motorCount", "Motor count", d.paths.motorCount, "number")}
        ${devField("path-alarmCount", "Alarm count", d.paths.alarmCount, "number")}
        ${devField("path-switchPrefix", "Switch key prefix", d.paths.switchPrefix)}
        ${devField("path-motorPrefix", "Motor key prefix", d.paths.motorPrefix)}
        ${devField("path-alarmPrefix", "Alarm key prefix", d.paths.alarmPrefix)}
        ${devField("path-onTimingSuffix", "ON timing suffix", d.paths.onTimingSuffix)}
        ${devField("path-offTimingSuffix", "OFF timing suffix", d.paths.offTimingSuffix)}
      </div>
      <p class="dev-preview">Live preview: ${escapeHtml(P.switches.root)}/SW1 … ${escapeHtml(P.switches.root)}/SW${P.meta.switchCount} · timings ${escapeHtml(P.meta.onTimingSuffix)}</p>
    </section>

    <footer class="dev-actions">
      ${configReady() ? '<button type="button" class="btn-ghost" data-action="go-overview">← My Home</button>' : ""}
      <button type="button" class="btn-ghost" data-action="reset-dev-config">Reset defaults</button>
      <button type="button" class="btn-primary" data-action="save-dev-config">Save & reload</button>
    </footer>`;
}

function readDevDraftFromDom() {
  const fields = document.querySelectorAll("[data-dev-field]");
  const firebase = {};
  const paths = {};
  fields.forEach((el) => {
    const id = el.dataset.devField;
    const v = el.type === "number" ? el.value : el.value.trim();
    if (id.startsWith("fb-")) firebase[id.slice(3)] = v;
    if (id.startsWith("path-")) paths[id.slice(5)] = v;
  });
  return { firebase, paths };
}

function renderShell(state) {
  const main =
    state.ui.view === "developer"
      ? renderDeveloper(state)
      : state.ui.view === "room"
        ? renderRoomDetail(state)
        : renderOverview(state);

  return `
    ${renderMenuDrawer(state)}
    <div class="shell ${state.ui.menuOpen ? "shell--menu-open" : ""}">
      ${renderAppBar(state)}
      <main class="main">
        ${state.layoutSync === "saving" ? '<p class="sync-banner sync-banner--saving">Saving layout to Firebase…</p>' : ""}
        ${state.layoutSync === "saved" ? '<p class="sync-banner sync-banner--saved">Layout saved permanently</p>' : ""}
        ${state.layoutSync === "error" ? '<p class="sync-banner sync-banner--error">Could not save layout — check Firebase rules</p>' : ""}
        ${main}
      </main>
    </div>
    ${renderToast(state)}`;
}

function renderModalLayer(state) {
  if (state.ui.modal === "time") return renderTimeModal(state);
  if (state.ui.modal === "add-room") return renderAddRoomModal(state, state.ui.addRoomType);
  if (state.ui.modal === "add-device")
    return renderAddDeviceModal(state, state.ui.roomType, state.ui.roomId);
  return "";
}

function closeModal(state) {
  state.ui.clockAbort?.abort();
  state.ui.modal = null;
  state.ui.timeModal = null;
  state.ui.draft = {};
}

async function ensurePushKey(db, baseKey, values) {
  const meta = metaForKey(baseKey);
  if (!meta) return;
  const key = pushKeyFor(baseKey);
  const path = refPath(meta.root, key);
  if (values[path] === undefined) {
    await set(ref(db, path), "0");
    values[path] = "0";
  }
}

async function ensureRoomPushKeys(db, layout, roomType, roomId, values) {
  const room = findRoom(layout, roomType, roomId);
  if (!room) return;
  for (const d of room.devices) {
    if (usesPushControl(d)) await ensurePushKey(db, d.firebaseKey, values);
  }
}

function mountApp(db) {
  const root = document.getElementById("app");
  const state = {
    connected: false,
    error: null,
    values: {},
    layout: defaultLayout(),
    layoutReady: false,
    layoutSync: null,
    devDraft: null,
    ui: {
      view: "overview",
      roomType: "switch",
      roomId: null,
      modal: null,
      addRoomType: "switch",
      timeModal: null,
      draft: {},
      pushHeld: new Set(),
      menuOpen: false,
    },
  };

  let shellEl = null;
  let modalEl = null;
  let paintQueued = false;
  let interacting = false;
  let ignoreLayoutRemoteUntil = 0;
  let pushActiveBtn = null;

  function ensureDom() {
    if (shellEl?.isConnected && modalEl?.isConnected) return;
    root.innerHTML = '<div id="app-shell"></div><div id="app-modal"></div>';
    shellEl = document.getElementById("app-shell");
    modalEl = document.getElementById("app-modal");
  }

  /** Full UI refresh (shell + modal). */
  function paintNow() {
    ensureDom();
    shellEl.innerHTML = renderShell(state);
    modalEl.innerHTML = renderModalLayer(state);
    focusModalField();
    if (state.ui.modal === "time") bindClockControls();
  }

  function updateClockVisuals() {
    const m = state.ui.timeModal;
    if (!m || !modalEl) return;
    const t = m.time;
    const angle = handAngle(t, m.picking);
    const hand = modalEl.querySelector("[data-clock-hand]");
    const hit = modalEl.querySelector("[data-clock-hand-hit]");
    if (hand) hand.style.transform = `rotate(${angle}deg)`;
    if (hit) hit.style.transform = `rotate(${angle}deg)`;
    const dh = modalEl.querySelector("[data-digital-hour]");
    const dm = modalEl.querySelector("[data-digital-minute]");
    if (dh) dh.textContent = String(t.hour12).padStart(2, "0");
    if (dm) dm.textContent = String(t.minute).padStart(2, "0");
    const slider = modalEl.querySelector("[data-minute-slider]");
    const label = modalEl.querySelector("[data-minute-label]");
    if (slider) slider.value = String(t.minute);
    if (label) label.textContent = String(t.minute).padStart(2, "0");
    modalEl.querySelectorAll(".clock-num").forEach((btn) => {
      const val = parseInt(btn.dataset.val, 10);
      const sel =
        m.picking === "minute"
          ? t.minute === val
          : clockHourPosition(t.hour12) === val;
      btn.classList.toggle("clock-num--sel", sel);
    });
    modalEl.querySelectorAll(".digital-time__part").forEach((btn) => {
      const isHour = btn.dataset.mode === "hour";
      btn.classList.toggle("digital-time__part--active", isHour ? m.picking === "hour" : m.picking === "minute");
    });
  }

  function applyClockPointer(clientX, clientY) {
    const m = state.ui.timeModal;
    const face = modalEl?.querySelector("[data-clock-face]");
    if (!m || !face) return;
    const rect = face.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const deg = angleFromPoint(cx, cy, clientX, clientY);
    if (m.picking === "minute") {
      m.time.minute = minuteFromAngle(deg);
    } else {
      m.time.hour12 = hour12FromAngle(deg);
    }
    updateClockVisuals();
  }

  function bindClockControls() {
    state.ui.clockAbort?.abort();
    const ctrl = new AbortController();
    state.ui.clockAbort = ctrl;
    const { signal } = ctrl;

    const face = modalEl?.querySelector("[data-clock-face]");
    if (!face) return;

    const onPointerDown = (e) => {
      if (e.target.closest(".clock-num")) return;
      e.preventDefault();
      face.setPointerCapture(e.pointerId);
      face.classList.add("clock-face--dragging");
      applyClockPointer(e.clientX, e.clientY);
    };

    const onPointerMove = (e) => {
      if (!face.hasPointerCapture(e.pointerId)) return;
      e.preventDefault();
      applyClockPointer(e.clientX, e.clientY);
    };

    const onPointerUp = (e) => {
      if (!face.hasPointerCapture(e.pointerId)) return;
      face.releasePointerCapture(e.pointerId);
      face.classList.remove("clock-face--dragging");
    };

    face.addEventListener("pointerdown", onPointerDown, { signal });
    face.addEventListener("pointermove", onPointerMove, { signal });
    face.addEventListener("pointerup", onPointerUp, { signal });
    face.addEventListener("pointercancel", onPointerUp, { signal });
  }

  /** Debounced refresh — skips shell while modal open to avoid freezing. */
  function schedulePaint() {
    if (paintQueued) return;
    paintQueued = true;
    requestAnimationFrame(() => {
      paintQueued = false;
      if (interacting || state.ui.modal) {
        updateLiveIndicators();
        return;
      }
      paintNow();
    });
  }

  function focusModalField() {
    if (state.ui.modal !== "add-room") return;
    requestAnimationFrame(() => {
      const input = modalEl?.querySelector("#new-room-name");
      input?.focus();
    });
  }

  /** Update toggles while a modal is open (avoids destroying the dialog). */
  function updateLiveIndicators() {
    if (!shellEl) return;
    shellEl.querySelectorAll("[data-action='toggle']").forEach((btn) => {
      const path = refPath(btn.dataset.group, btn.dataset.key);
      const on = isOn(state.values[path]);
      btn.classList.toggle("pill-switch--on", on);
      btn.closest(".device-block")?.classList.toggle("device-block--on", on);
      btn.closest(".device-row-wrap")?.classList.toggle("device-row-wrap--on", on);
    });
    shellEl.querySelectorAll("[data-action='push-hold']").forEach((btn) => {
      const path = refPath(btn.dataset.group, btn.dataset.key);
      const on = state.ui.pushHeld.has(path) || isOn(state.values[path]);
      btn.closest(".device-block")?.classList.toggle("device-block--push", on);
    });
  }

  async function setPushActive(btn, active) {
    if (!btn) return;
    const path = refPath(btn.dataset.group, btn.dataset.key);
    btn.closest(".device-block")?.classList.toggle("device-block--push", active);
    if (active) state.ui.pushHeld.add(path);
    else state.ui.pushHeld.delete(path);
    try {
      await set(ref(db, path), active ? "1" : "0");
    } catch (err) {
      state.error = err.message;
      paintNow();
    }
  }

  async function releasePush(e) {
    if (!pushActiveBtn) return;
    const btn = pushActiveBtn;
    if (e?.pointerId != null && btn.hasPointerCapture?.(e.pointerId)) {
      btn.releasePointerCapture(e.pointerId);
    }
    pushActiveBtn = null;
    await setPushActive(btn, false);
  }

  function syncDraftFromModal() {
    const nameInput = modalEl?.querySelector("#new-room-name");
    if (nameInput) state.ui.draft.newRoomName = nameInput.value;
    const keySelect = modalEl?.querySelector("#add-device-key");
    if (keySelect) state.ui.draft.addDeviceKey = keySelect.value;
    const controlRadio = modalEl?.querySelector(
      'input[name="add-device-control"]:checked'
    );
    if (controlRadio) state.ui.draft.addDeviceControlMode = controlRadio.value;
  }

  function showToast(message, ms = 3500) {
    state.ui.toast = message;
    paintNow();
    clearTimeout(state.ui.toastTimer);
    state.ui.toastTimer = setTimeout(() => {
      state.ui.toast = null;
      paintNow();
    }, ms);
  }

  function markLayoutSaving() {
    state.layoutSync = "saving";
    clearTimeout(state.layoutSyncTimer);
    state.layoutSyncTimer = setTimeout(() => {
      if (state.layoutSync === "saving") paintNow();
    }, 50);
  }

  function markLayoutSaved() {
    state.layoutSync = "saved";
    paintNow();
    clearTimeout(state.layoutSyncTimer);
    state.layoutSyncTimer = setTimeout(() => {
      state.layoutSync = null;
      paintNow();
    }, 2000);
  }

  setLayoutRemoteSaver((layout) => {
    ignoreLayoutRemoteUntil = Date.now() + 900;
    markLayoutSaving();
    queueSaveLayout(db, layout, {
      onOk: () => markLayoutSaved(),
      onErr: () => {
        state.layoutSync = "error";
        showToast("Firebase could not save rooms. Add HOME_CONSOLE_LAYOUT to database rules.");
        paintNow();
      },
    });
  });

  subscribeLayout(
    db,
    (layout) => {
      if (Date.now() < ignoreLayoutRemoteUntil) return;
      state.layout = layout;
      state.layoutReady = true;
      paintNow();
    },
    () => {
      state.layoutSync = "error";
      showToast("Cannot load room layout from Firebase. Using local backup.");
      paintNow();
    }
  );

  paintNow();

  const rootsSeen = new Set();
  for (const root of getControlRoots()) {
    onValue(
      ref(db, root),
      (snap) => {
        const data = snap.val() || {};
        for (const [key, val] of Object.entries(data)) {
          state.values[refPath(root, key)] = val;
        }
        rootsSeen.add(root);
        if (rootsSeen.size >= getControlRoots().length) state.connected = true;
        schedulePaint();
      },
      (err) => {
        state.error = err.message;
        schedulePaint();
      }
    );
  }

  root.addEventListener("pointerdown", async (e) => {
    const btn = e.target.closest("[data-action='push-hold']");
    if (!btn) return;
    e.preventDefault();
    pushActiveBtn = btn;
    btn.setPointerCapture(e.pointerId);
    await setPushActive(btn, true);
  });

  root.addEventListener("pointerup", (e) => {
    void releasePush(e);
  });

  root.addEventListener("pointercancel", (e) => {
    void releasePush(e);
  });

  root.addEventListener("input", (e) => {
    const draftKey = e.target.dataset?.draft;
    if (draftKey && state.ui.draft) {
      state.ui.draft[draftKey] = e.target.value;
    }
    if (e.target.matches("#add-device-key") && state.ui.modal === "add-device") {
      state.ui.draft.addDeviceKey = e.target.value;
      paintNow();
      return;
    }
    if (e.target.matches("[data-action='minute-range']") && state.ui.timeModal) {
      state.ui.timeModal.time.minute = parseInt(e.target.value, 10);
      state.ui.timeModal.picking = "minute";
      updateClockVisuals();
    }
  });

  root.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;

    if (action === "backdrop-close") {
      if (e.target !== el) return;
      closeModal(state);
      paintNow();
      return;
    }

    if (action === "toggle-menu") {
      state.ui.menuOpen = !state.ui.menuOpen;
      paintNow();
      return;
    }

    if (action === "close-menu") {
      state.ui.menuOpen = false;
      paintNow();
      return;
    }

    if (action === "go-overview") {
      state.ui.view = "overview";
      state.ui.menuOpen = false;
      closeModal(state);
      paintNow();
      return;
    }

    if (action === "go-developer") {
      state.ui.view = "developer";
      state.ui.menuOpen = false;
      state.devDraft = loadDevSettings();
      closeModal(state);
      paintNow();
      return;
    }

    if (action === "save-dev-config") {
      saveDevSettings(readDevDraftFromDom());
      location.reload();
      return;
    }

    if (action === "reset-dev-config") {
      if (confirm("Reset all developer settings to defaults?")) {
        clearDevSettings();
        location.reload();
      }
      return;
    }

    if (action === "open-room") {
      state.ui.view = "room";
      state.ui.roomType = el.dataset.roomType;
      state.ui.roomId = el.dataset.roomId;
      closeModal(state);
      paintNow();
      void ensureRoomPushKeys(db, state.layout, state.ui.roomType, state.ui.roomId, state.values);
      return;
    }

    if (action === "open-add-room") {
      syncDraftFromModal();
      state.ui.modal = "add-room";
      state.ui.addRoomType = el.dataset.roomType;
      state.ui.draft = { newRoomName: "" };
      paintNow();
      return;
    }

    if (action === "confirm-add-room") {
      e.preventDefault();
      syncDraftFromModal();
      const name = state.ui.draft.newRoomName?.trim() || "New Room";
      const { room, error } = addRoom(state.layout, state.ui.addRoomType, name);
      if (error) {
        showToast(error);
        return;
      }
      closeModal(state);
      state.ui.view = "room";
      state.ui.roomType = state.ui.addRoomType;
      state.ui.roomId = room.id;
      showToast(`Room "${room.name}" saved permanently`);
      paintNow();
      return;
    }

    if (action === "delete-room") {
      const { error } = removeRoom(state.layout, state.ui.roomType, el.dataset.roomId);
      if (error) {
        showToast(error);
        return;
      }
      state.ui.view = "overview";
      showToast("Room deleted");
      paintNow();
      return;
    }

    if (action === "open-add-device") {
      syncDraftFromModal();
      const avail = availableKeys(state.layout, state.ui.roomType);
      state.ui.modal = "add-device";
      state.ui.roomId = el.dataset.roomId;
      state.ui.draft = {
        addDeviceKey: avail[0]?.key ?? "",
        addDeviceControlMode: canChooseControlMode(state.ui.roomType) ? "toggle" : "toggle",
      };
      paintNow();
      return;
    }

    if (action === "confirm-add-device") {
      e.preventDefault();
      syncDraftFromModal();
      const key = state.ui.draft.addDeviceKey;
      const controlMode = state.ui.draft.addDeviceControlMode ?? "toggle";
      if (
        key &&
        addDeviceToRoom(state.layout, state.ui.roomType, state.ui.roomId, key, controlMode)
      ) {
        if (controlMode === "push") {
          try {
            await ensurePushKey(db, key, state.values);
          } catch (err) {
            state.error = err.message;
          }
        }
      }
      closeModal(state);
      paintNow();
      return;
    }

    if (action === "close-modal") {
      closeModal(state);
      paintNow();
      return;
    }

    if (action === "edit-room-name") {
      interacting = true;
      const room = findRoom(state.layout, state.ui.roomType, state.ui.roomId);
      const name = prompt("Room name", room?.name ?? "");
      interacting = false;
      if (name != null) renameRoom(state.layout, state.ui.roomType, state.ui.roomId, name);
      paintNow();
      return;
    }

    if (action === "edit-label") {
      e.stopPropagation();
      interacting = true;
      const key = el.dataset.key;
      const room = findRoom(state.layout, state.ui.roomType, state.ui.roomId);
      const dev = room?.devices.find((d) => d.firebaseKey === key);
      const title =
        state.ui.roomType === "switch"
          ? "Switch display name"
          : state.ui.roomType === "motor"
            ? "Motor display name"
            : "Alarm display name";
      const name = prompt(title, dev?.label ?? key);
      interacting = false;
      if (name != null) renameDevice(state.layout, state.ui.roomType, state.ui.roomId, key, name);
      paintNow();
      return;
    }

    if (action === "remove-device") {
      removeDeviceFromRoom(state.layout, state.ui.roomType, state.ui.roomId, el.dataset.key);
      paintNow();
      return;
    }

    if (action === "toggle") {
      const path = refPath(el.dataset.group, el.dataset.key);
      try {
        await set(ref(db, path), nextToggleValue(state.values[path]));
      } catch (err) {
        state.error = err.message;
        paintNow();
      }
      return;
    }

    if (action === "open-time") {
      const path = devicePath(el.dataset.key);
      const raw = path ? state.values[path] : "";
      state.ui.modal = "time";
      state.ui.timeModal = {
        firebaseKey: el.dataset.key,
        kind: el.dataset.kind,
        label: el.dataset.label,
        time: parseTimeValue(raw),
        hasTime: Boolean(raw),
        picking: "hour",
      };
      paintNow();
      return;
    }

    if (action === "pick-clock-val") {
      const val = parseInt(el.dataset.val, 10);
      if (state.ui.timeModal.picking === "minute") {
        state.ui.timeModal.time.minute = val;
      } else {
        state.ui.timeModal.time.hour12 = val === 0 ? 12 : val;
      }
      updateClockVisuals();
      return;
    }

    if (action === "pick-mode") {
      state.ui.timeModal.picking = el.dataset.mode;
      paintNow();
      return;
    }

    if (action === "set-ampm") {
      state.ui.timeModal.time.am = el.dataset.am === "1";
      updateClockVisuals();
      return;
    }

    if (action === "save-time") {
      const m = state.ui.timeModal;
      const path = devicePath(m.firebaseKey);
      if (path) {
        try {
          await set(ref(db, path), formatTimeValue(m.time));
        } catch (err) {
          state.error = err.message;
        }
      }
      closeModal(state);
      paintNow();
      return;
    }

    if (action === "clear-time") {
      const m = state.ui.timeModal;
      const path = devicePath(m.firebaseKey);
      if (path) {
        try {
          await set(ref(db, path), "");
        } catch (err) {
          state.error = err.message;
        }
      }
      closeModal(state);
      paintNow();
      return;
    }
  });
}

function main() {
  const root = document.getElementById("app");
  if (!configReady()) {
    root.innerHTML = renderSetupScreen() + `<div id="dev-mount"></div>`;
    const mount = document.getElementById("dev-mount");
    const miniState = { ui: { view: "developer" }, devDraft: loadDevSettings() };
    mount.innerHTML = renderDeveloper(miniState);
    mount.querySelector('[data-action="save-dev-config"]')?.addEventListener("click", () => {
      saveDevSettings(readDevDraftFromDom());
      location.reload();
    });
    mount.querySelector('[data-action="reset-dev-config"]')?.addEventListener("click", () => {
      if (confirm("Reset to defaults?")) {
        clearDevSettings();
        location.reload();
      }
    });
    return;
  }
  mountApp(getDatabase(initializeApp(getFirebaseConfig())));
}

main();
