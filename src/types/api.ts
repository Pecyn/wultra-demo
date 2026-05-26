import type { ReactNode } from 'react';

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
};

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

export type Device = {
  id: string;
  shortId: string;
  vendor: string;
  model: string;
  platform: string;
  osVersion: string;
  appVersion: string;
  status: 'active' | 'removed' | 'expired' | 'blocked';
  biometryEnabled: boolean;
  createdAt: string;
  lastActiveAt: string;
  user: { id: string; displayName: string };
};

export type DevicesResponse = {
  items: Device[];
};

export type Event = {
  id: string;
  type: string;
  timestamp: string;
  ip: string;
  location: string;
  result: 'success' | 'failure';
};

export type DeviceDetail = Device & {
  events: Event[];
};
