import { useEffect, useState } from "react";
import { fetchCustomers, toggleCustomer } from "../../api/customers";
import "../../styles/admin.css";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading customers…</p>;

  return (
    <div className="admin-dashboard">
      <h2>Customers</h2>

      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td data-label="Email">{c.email}</td>
              <td data-label="Name">{c.first_name} {c.last_name}</td>
              <td data-label="Status">
                <span
                  className={`order-status ${
                    c.is_active ? "completed" : "cancelled"
                  }`}
                >
                  {c.is_active ? "Active" : "Disabled"}
                </span>
              </td>
              <td data-label="Action" className="action-buttons">
                <button
                  className={`btn ${
                    c.is_active ? "btn-warning" : "btn-success"
                  }`}
                  onClick={() =>
                    toggleCustomer(c.id).then((updated) =>
                      setCustomers((prev) =>
                        prev.map((u) =>
                          u.id === c.id ? updated : u
                        )
                      )
                    )
                  }
                >
                  {c.is_active ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
