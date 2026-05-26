import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { KeyValuePair } from '../types/api';
import styles from './PlatformBarChart.module.css';

type Props = {
  data: KeyValuePair[];
};

export function PlatformBarChart({ data }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Devices by Platform</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="key" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar dataKey="value" fill="#0099ff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
