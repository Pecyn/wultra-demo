import { useNavigate } from "react-router-dom";
import { useDevices } from "../hooks/useDevices";
import { DataTable } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import { Spinner } from "../components/Spinner";
import type { Column, Device } from "../types/api";

const columns: Column<Device>[] = [
  { key: "model", label: "Model", sortable: true },
  { key: "vendor", label: "Vendor", sortable: true },
  { key: "platform", label: "Platform", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (d) => <StatusBadge status={d.status} />,
  },
  { key: "user", label: "User", render: (d) => d.user.displayName },
  {
    key: "lastActiveAt",
    label: "Last Active",
    sortable: true,
    render: (d) =>
      new Date(d.lastActiveAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
];

export default function Devices() {
  const navigate = useNavigate();
  const { data, loading, error } = useDevices();

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Devices</h1>
      <DataTable data={data} columns={columns} onRowClick={(d) => navigate(`/devices/${d.id}`)} />
    </div>
  );
}
