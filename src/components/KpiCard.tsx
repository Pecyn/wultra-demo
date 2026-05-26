import styles from './KpiCard.module.css';

type KpiCardProps = {
  label: string;
  value: number;
  accent?: string;
};

export function KpiCard({ label, value, accent }: KpiCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.value} style={accent ? { color: accent } : undefined}>
        {value.toLocaleString()}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
