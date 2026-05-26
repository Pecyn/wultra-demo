import { useUsers } from "../hooks/useUsers";
import { DataTable } from "../components/DataTable";
import { Spinner } from "../components/Spinner";
import type { Column, User } from "../types/api";

const columns: Column<User>[] = [
  { key: "displayName", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "country", label: "Country", sortable: true },
  { key: "tier", label: "Tier", sortable: true },
  { key: "deviceCount", label: "Devices", sortable: true },
];

export default function Users() {
  const { data, loading, error } = useUsers();

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
