// src/Status.ts
export const Status = {
  Idle: "Idle",
  Error: "Error",
  Loading: "Loading",
  Success: "Success"
} as const;

export type StatusType = typeof Status[keyof typeof Status];
