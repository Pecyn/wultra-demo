import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { KeyValuePair } from '../types/api';
import styles from './EventTypeBarChart.module.css';

type Props = {
  data: KeyValuePair[];
};

export function EventTypeBarChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Events by Type</p>
      <ResponsiveContainer width="100%" height={sorted.length * 44 + 40}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 24, top: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="key"
            width={160}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar dataKey="value" fill="#0099ff" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
