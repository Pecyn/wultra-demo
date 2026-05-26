export type KeyValuePair = {
  key: string;
  value: number;
};

export type ActivationDay = {
  date: string;
  activations: number;
};

export type StatisticsTotals = {
  devices: number;
  users: number;
  activeDevices: number;
  removedDevices: number;
  expiredDevices: number;
  blockedDevices: number;
  events: number;
};

export type Statistics = {
  generatedAt: string;
  totals: StatisticsTotals;
  byStatus: KeyValuePair[];
  byPlatform: KeyValuePair[];
  byVendor: KeyValuePair[];
  byCountry: KeyValuePair[];
  byEventType: KeyValuePair[];
  activationsLast30Days: ActivationDay[];
};
