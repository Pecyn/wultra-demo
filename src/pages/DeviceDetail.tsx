import { useParams, useNavigate } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';
import { Spinner } from '../components/Spinner';
import { StatusBadge } from '../components/StatusBadge';
import { EventTimeline } from '../components/EventTimeline';
import styles from './DeviceDetail.module.css';

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default function DeviceDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const { data: device, loading, error } = useDevice(id);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!device) return null;

  return (
    <div>
      <button className={styles.back} onClick={() => navigate(-1)}>&lt; Back</button>
      <h1>{device.model}</h1>
      <div className={styles.card}>
        <dl className={styles.grid}>
          <dt>Vendor</dt>
          <dd>{device.vendor}</dd>

          <dt>Platform</dt>
          <dd>{device.platform}</dd>

          <dt>OS Version</dt>
          <dd>{device.osVersion}</dd>

          <dt>App Version</dt>
          <dd>{device.appVersion}</dd>

          <dt>Biometry</dt>
          <dd>{device.biometryEnabled ? 'Enabled' : 'Disabled'}</dd>

          <dt>Status</dt>
          <dd><StatusBadge status={device.status} /></dd>

          <dt>Owner</dt>
          <dd>{device.user.displayName}</dd>

          <dt>Created</dt>
          <dd>{dateFmt.format(new Date(device.createdAt))}</dd>

          <dt>Last Active</dt>
          <dd>{dateFmt.format(new Date(device.lastActiveAt))}</dd>
        </dl>
      </div>

      <h2 className={styles.sectionTitle}>Event History</h2>
      <EventTimeline events={device.events} />
    </div>
  );
}
