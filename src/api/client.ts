const BASE_URL = 'https://wultra.github.io/mtoken-tools/react-demo-api';

export async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}
