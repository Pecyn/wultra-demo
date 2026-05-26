import styles from './StatusBadge.module.css';

type Status = 'active' | 'removed' | 'expired' | 'blocked';

type Props = { status: Status };

const classMap: Record<Status, string> = {
  active: styles.active,
  removed: styles.removed,
  expired: styles.expired,
  blocked: styles.blocked,
};

export function StatusBadge({ status }: Props) {
  return (
    <span className={`${styles.badge} ${classMap[status]}`}>
      {status}
    </span>
  );
}
