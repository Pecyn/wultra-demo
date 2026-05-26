import styles from './Spinner.module.css';

export function Spinner() {
  return (
    <div className={styles.center}>
      <div className={styles.ring} />
    </div>
  );
}
