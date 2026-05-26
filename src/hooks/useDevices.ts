import { useEffect, useState } from 'react';
import { fetchJson } from '../api/client';
import type { Device, DevicesResponse } from '../types/api';

export function useDevices() {
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchJson<DevicesResponse>('devices/index.json', controller.signal)
      .then((res) => setData(res.items))
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === 'AbortError') return;
        setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
