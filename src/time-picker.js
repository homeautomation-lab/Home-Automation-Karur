/** Parse Firebase timing value → { hour12, minute, am }. */
export function parseTimeValue(raw) {
  if (raw == null || raw === "") {
    return { hour12: 7, minute: 0, am: true };
  }
  const s = String(raw).trim();

  const ampm = s.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (ampm) {
    let h = parseInt(ampm[1], 10);
    const m = parseInt(ampm[2], 10);
    const pm = ampm[3].toUpperCase() === "PM";
    if (h === 12) h = pm ? 12 : 0;
    else if (pm) h += 12;
    return from24(h % 24, m);
  }

  const hm = s.match(/^(\d{1,2}):(\d{2})$/);
  if (hm) {
    return from24(parseInt(hm[1], 10) % 24, parseInt(hm[2], 10));
  }

  const n = parseInt(s, 10);
  if (!Number.isNaN(n) && n >= 0 && n < 1440) {
    return from24(Math.floor(n / 60) % 24, n % 60);
  }

  return { hour12: 7, minute: 0, am: true };
}

function from24(h24, minute) {
  const am = h24 < 12;
  let hour12 = h24 % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute, am };
}

export function formatTimeValue({ hour12, minute, am }) {
  const h24 = to24(hour12, am);
  const hh = String(h24).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function formatTimeDisplay({ hour12, minute, am }) {
  const mm = String(minute).padStart(2, "0");
  const suffix = am ? "AM" : "PM";
  return `${hour12}:${mm} ${suffix}`;
}

function to24(hour12, am) {
  if (am) return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

export function clockHourPosition(hour12) {
  return hour12 === 12 ? 12 : hour12;
}

/** Degrees from 12 o'clock clockwise (0–360). */
export function angleFromPoint(cx, cy, x, y) {
  const dx = x - cx;
  const dy = y - cy;
  let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (deg < 0) deg += 360;
  return deg;
}

export function hour12FromAngle(deg) {
  let h = Math.round(deg / 30) % 12;
  if (h === 0) h = 12;
  return h;
}

export function minuteFromAngle(deg) {
  return Math.round(deg / 6) % 60;
}

export function handAngle(time, mode) {
  if (mode === "minute") return time.minute * 6;
  return (clockHourPosition(time.hour12) % 12) * 30;
}
