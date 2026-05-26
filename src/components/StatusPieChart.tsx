import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { KeyValuePair } from '../types/api';
import styles from './StatusPieChart.module.css';

const STATUS_COLORS: Record<string, string> = {
  active: '#2ea043',
  removed: '#f85149',
  expired: '#d29922',
  blocked: '#484f58',
};

type Props = {
  data: KeyValuePair[];
};

export function StatusPieChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Devices by Status</p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="key" cx="50%" cy="50%" outerRadius={90}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={STATUS_COLORS[entry.key] ?? '#0099ff'} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const entry = payload[0];
              const val = typeof entry.value === 'number' ? entry.value : 0;
              const name = String(entry.name ?? '');
              const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
              return (
                <div className={styles.tooltip}>
                  {name}: {val} ({pct}%)
                </div>
              );
            }}
          />
          <Legend formatter={(value: string) => value.charAt(0).toUpperCase() + value.slice(1)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
