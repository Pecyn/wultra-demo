import type { Event } from '../types/api';
import styles from './EventTimeline.module.css';

type Props = {
  events: Event[];
};

const fmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function EventTimeline({ events }: Props) {
  if (events.length === 0) {
    return <p className={styles.empty}>No events recorded.</p>;
  }

  const sorted = [...events].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp),
  );

  return (
    <ul className={styles.list}>
      {sorted.map((event) => (
        <li key={event.id} className={styles.row}>
          <span className={styles.eventType}>{event.type}</span>
          <span>{fmt.format(new Date(event.timestamp))}</span>
          <span className={styles.meta}>{event.ip}</span>
          <span className={styles.meta}>{event.location}</span>
          <span className={event.result === 'success' ? styles.success : styles.failure}>
            {event.result}
          </span>
        </li>
      ))}
    </ul>
  );
}
