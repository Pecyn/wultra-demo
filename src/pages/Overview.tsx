import { useStatistics } from '../hooks/useStatistics';
import { KpiCard } from '../components/KpiCard';
import { StatusPieChart } from '../components/StatusPieChart';
import { PlatformBarChart } from '../components/PlatformBarChart';
import { EventTypeBarChart } from '../components/EventTypeBarChart';
import { Spinner } from '../components/Spinner';
import styles from './Overview.module.css';

export default function Overview() {
  const { data, loading, error } = useStatistics();

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  const { devices, activeDevices, users, events } = data.totals;

  return (
    <div>
      <h1>Overview</h1>
      <div className={styles.kpiRow}>
        <KpiCard label="Total Devices" value={devices} />
        <KpiCard label="Active Devices" value={activeDevices} accent="#2ea043" />
        <KpiCard label="Total Users" value={users} />
        <KpiCard label="Total Events" value={events} />
      </div>
      <div className={styles.chartRow}>
        <StatusPieChart data={data.byStatus} />
        <PlatformBarChart data={data.byPlatform} />
      </div>
      <div className={styles.chartFull}>
        <EventTypeBarChart data={data.byEventType} />
      </div>
    </div>
  );
}
