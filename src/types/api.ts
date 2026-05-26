export interface KeyValuePair {
  key: string;
  value: number;
}

export interface ActivationDay {
  date: string;
  activations: number;
}

export interface StatisticsTotals {
  devices: number;
  users: number;
  activeDevices: number;
  removedDevices: number;
  expiredDevices: number;
  blockedDevices: number;
  events: number;
}

export interface Statistics {
  generatedAt: string;
  totals: StatisticsTotals;
  byStatus: KeyValuePair[];
  byPlatform: KeyValuePair[];
  byVendor: KeyValuePair[];
  byCountry: KeyValuePair[];
  byEventType: KeyValuePair[];
  activationsLast30Days: ActivationDay[];
}
