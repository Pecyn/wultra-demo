import { useEffect, useState } from 'react';
import { fetchApi } from '../api/client';
import type { Statistics } from '../types/api';
import { KpiCard } from '../components/KpiCard';
import styles from './Overview.module.css';

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

  return (
    <div>
      <h1>Overview</h1>
      <div className={styles.kpiRow}>
        <KpiCard label="Total Devices" value={120} />
        <KpiCard label="Active Devices" value={70} accent="#2ea043" />
        <KpiCard label="Total Users" value={25} />
        <KpiCard label="Total Events" value={410} />
      </div>
    </div>
  );
}
