import { useEffect, useState } from "react";
import {
  fetchMenu,
  fetchCategories,
  createMenuItem,
  toggleMenuItem,
} from "../../api/admin";
import { formatMoney } from "../../utils/money";
import "../../styles/admin.css";

export default function AdminMenu() {
  const token = localStorage.getItem("admin_token");

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
  });

  useEffect(() => {
    Promise.all([
      fetchMenu(token),
      fetchCategories(token),
    ]).then(([menuData, categoryData]) => {
      setMenu(menuData);
      setCategories(categoryData);
      setLoading(false);
    });
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.category_id) return;

    createMenuItem(token, {
      name: form.name,
      price: form.price,
      description: form.description,
      category_id: form.category_id,
    }).then((newItem) => {
      setMenu((prev) => [...prev, newItem]);
      setForm({ name: "", price: "", category_id: "", description: "" });
    });
  }

  return (
    <div className="admin-dashboard">
      <h2>Menu Management</h2>

      {/* ADD ITEM */}
      <form className="menu-form" onSubmit={handleSubmit}>
        <select
          value={form.category_id}
          onChange={(e) =>
            setForm({ ...form, category_id: e.target.value })
          }
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Food name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <button className="view-link">Add Item</button>
      </form>

      {/* MENU LIST */}
      {loading ? (
        <p className="loading-text">Loading menu...</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₦{formatMoney(item.price)}</td>
                <td>
                  <span className={`order-status ${item.is_available ? "completed" : "cancelled"}`}>
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>
                  <button
                    className="view-link"
                    onClick={() =>
                      toggleMenuItem(token, item.id, !item.is_available).then(
                        (updated) =>
                          setMenu((prev) =>
                            prev.map((i) =>
                              i.id === item.id ? updated : i
                            )
                          )
                      )
                    }
                  >
                    {item.is_available ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
