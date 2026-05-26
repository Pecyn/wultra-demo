const BASE_URL = 'https://wultra.github.io/mtoken-tools/react-demo-api';

export async function fetchJson<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}
