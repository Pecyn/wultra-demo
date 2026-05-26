import { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import type { Statistics } from '../types/api';

export default function Overview() {
  const [data, setData] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Statistics>('statistics.json')
      .then(setData)
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  const { devices, users, activeDevices } = data.totals;

  return (
    <div>
      <h1>Overview</h1>
      <p>Devices: {devices}</p>
      <p>Users: {users}</p>
      <p>Active devices: {activeDevices}</p>
    </div>
  );
}
