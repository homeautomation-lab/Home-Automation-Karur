/** Display names and zones (Firebase keys unchanged). */
export const ZONES = [
  {
    id: "outside",
    abbr: "Ou",
    name: "Outside",
    root: "SWITCH-CONTROL_OUTSIDE",
    devices: ["SW1", "SW2", "SW3", "SW4", "SW5", "SW6", "SW7", "SW8"],
  },
  {
    id: "motors",
    abbr: "Mo",
    name: "Motor Bay",
    root: "MOTOR_CONTROL",
    devices: ["M1", "M1_OF", "M2", "M2_OF"],
    timings: ["M1-ON_TIMING", "M1-OF_TIMING"],
  },
  {
    id: "security",
    abbr: "Se",
    name: "Security",
    root: "ALARM_CONTROLS",
    devices: ["ALRM1", "ALARM2"],
  },
];

export const DEVICE_LABELS = {
  SW1: { title: "Switch 1", hint: "Exterior · Zone A" },
  SW2: { title: "Switch 2", hint: "Exterior · Zone A" },
  SW3: { title: "Switch 3", hint: "Exterior · Zone B" },
  SW4: { title: "Switch 4", hint: "Exterior · Zone B" },
  SW5: { title: "Switch 5", hint: "Perimeter" },
  SW6: { title: "Switch 6", hint: "Perimeter" },
  SW7: { title: "Switch 7", hint: "Garden" },
  SW8: { title: "Switch 8", hint: "Garden" },
  M1: { title: "Motor 1", hint: "Main pump" },
  M1_OF: { title: "Motor 1 Off", hint: "Stop relay" },
  M2: { title: "Motor 2", hint: "Secondary" },
  M2_OF: { title: "Motor 2 Off", hint: "Stop relay" },
  "M1-ON_TIMING": { title: "M1 On delay", hint: "Seconds" },
  "M1-OF_TIMING": { title: "M1 Off delay", hint: "Seconds" },
  ALRM1: { title: "Alarm 1", hint: "Siren / bell" },
  ALARM2: { title: "Alarm 2", hint: "Secondary alert" },
};

export function labelFor(key) {
  return DEVICE_LABELS[key]?.title ?? key.replace(/_/g, " ");
}

export function hintFor(key) {
  return DEVICE_LABELS[key]?.hint ?? "";
}
