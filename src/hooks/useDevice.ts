import { useEffect, useState } from 'react';
import { fetchJson } from '../api/client';
import type { DeviceDetail } from '../types/api';

export function useDevice(id: string) {
  const [data, setData] = useState<DeviceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchJson<DeviceDetail>(`devices/${id}.json`, controller.signal)
      .then((res) => setData(res))
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === 'AbortError') return;
        setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  return { data, loading, error };
}
