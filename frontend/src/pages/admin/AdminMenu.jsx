import { useEffect, useState } from "react";
import {
  fetchMenu,
  fetchCategories,
  createMenuItem,
  toggleMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/admin";
import { formatMoney } from "../../utils/money";
import "../../styles/admin.css";

export default function AdminMenu() {
  const token = localStorage.getItem("admin_token");

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- ADD ITEM FORM ---------- */
  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  /* ---------- FILTERS ---------- */
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [availability, setAvailability] = useState("");
  const [ordering, setOrdering] = useState("");

  /* ---------- EDIT MENU ITEM ---------- */
  const [editingItem, setEditingItem] = useState(null);

  /* ---------- DELETE CONFIRMATION MODAL ---------- */
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------- CATEGORY MANAGER ---------- */
  const [showCategories, setShowCategories] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  /* ---------- FETCH MENU + CATEGORIES ---------- */
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (categoryFilter) params.append("category", categoryFilter);
    if (availability !== "") params.append("is_available", availability);
    if (ordering) params.append("ordering", ordering);

    const qs = params.toString() ? `?${params.toString()}` : "";

    setLoading(true);

    Promise.all([
      fetchMenu(token, qs),
      fetchCategories(token),
    ])
      .then(([menuData, categoryData]) => {
        setMenu(menuData);
        setCategories(categoryData);
      })
      .finally(() => setLoading(false));
  }, [token, search, categoryFilter, availability, ordering]);

  /* ---------- ADD MENU ITEM ---------- */
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.price || !form.category_id) return;

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category_id", form.category_id);
    data.append("description", form.description || "");

    if (imageFile) {
      data.append("image", imageFile);
    }

    createMenuItem(token, data).then((newItem) => {
      setMenu((prev) => [...prev, newItem]);

      setForm({
        name: "",
        price: "",
        category_id: "",
        description: "",
        image_url: "",
      });

      setImageFile(null);
    });
  }

  /* ---------- SAVE EDIT ---------- */
  function saveEdit() {
    const data = new FormData();
    data.append("name", editingItem.name);
    data.append("price", editingItem.price);
    data.append("category_id", editingItem.category_id);
    data.append("description", editingItem.description || "");

    // only send image if admin selects a new one
    if (editingItem.imageFile) {
      data.append("image", editingItem.imageFile);
    }

    updateMenuItem(token, editingItem.id, data).then((updated) => {
      setMenu((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setEditingItem(null);
    });
  }

  /* ---------- DELETE MENU ITEM ---------- */
  function handleDelete(id) {
    if (!window.confirm("Delete this item?")) return;

    deleteMenuItem(token, id).then(() => {
      setMenu((prev) => prev.filter((i) => i.id !== id));
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
            <option key={c.id} value={c.id}>{c.name}</option>
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
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

        <button className="btn btn-success">Add Item</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowCategories(true)}
        >
          Manage Categories
        </button>
      </form>

      {/* FILTERS */}
      <div className="menu-filters">
        <input
          className="filter-input"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <select
          className="filter-select"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="">Default order</option>
          <option value="name">Name A–Z</option>
          <option value="-name">Name Z–A</option>
          <option value="price">Price Low → High</option>
          <option value="-price">Price High → Low</option>
        </select>
      </div>

      {/* MENU TABLE */}
      {loading ? (
        <p>Loading menu…</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  ) : (
                    <span style={{ opacity: 0.6 }}>No image</span>
                  )}
                </td>

                <td>{item.name}</td>

                <td style={{ maxWidth: "280px" }}>
                  <span style={{ opacity: 0.9 }}>
                    {item.description ? item.description : "No description"}
                  </span>
                </td>

                <td>₦{formatMoney(item.price)}</td>

                <td>
                  <span
                    className={`order-status ${
                      item.is_available ? "completed" : "cancelled"
                    }`}
                  >
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="action-buttons">
                  {item.is_available ? (
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        toggleMenuItem(token, item.id, false).then((u) =>
                          setMenu((p) => p.map((i) => (i.id === u.id ? u : i)))
                        )
                      }
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        toggleMenuItem(token, item.id, true).then((u) =>
                          setMenu((p) => p.map((i) => (i.id === u.id ? u : i)))
                        )
                      }
                    >
                      Enable
                    </button>
                  )}

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setEditingItem({
                        ...item,
                        category_id: item.category.id,
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => setDeleteTarget(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>

              // <tr key={item.id}>
              //   <td>{item.name}</td>
              //   <td>₦{formatMoney(item.price)}</td>
              //   <td>
              //     <span className={`order-status ${item.is_available ? "completed" : "cancelled"}`}>
              //       {item.is_available ? "Available" : "Unavailable"}
              //     </span>
              //   </td>
              //   <td className="action-buttons">
              //     {item.is_available ? (
              //       <button
              //         className="btn btn-warning"
              //         onClick={() =>
              //           toggleMenuItem(token, item.id, false).then((u) =>
              //             setMenu((p) => p.map((i) => i.id === u.id ? u : i))
              //           )
              //         }
              //       >
              //         Disable
              //       </button>
              //     ) : (
              //       <button
              //         className="btn btn-success"
              //         onClick={() =>
              //           toggleMenuItem(token, item.id, true).then((u) =>
              //             setMenu((p) => p.map((i) => i.id === u.id ? u : i))
              //           )
              //         }
              //       >
              //         Enable
              //       </button>
              //     )}

              //     <button
              //       className="btn btn-primary"
              //       onClick={() =>
              //         setEditingItem({
              //           ...item,
              //           category_id: item.category.id,
              //         })
              //       }
              //     >
              //       Edit
              //     </button>

              //     <button
              //       className="btn btn-danger"
              //       onClick={() => setDeleteTarget(item)}
              //     >
              //       Delete
              //     </button>
              //   </td>
              // </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="modal">
          <h3>Edit Menu Item</h3>

          <input
            value={editingItem.name}
            onChange={(e) =>
              setEditingItem({ ...editingItem, name: e.target.value })
            }
          />

          <input
            type="number"
            value={editingItem.price}
            onChange={(e) =>
              setEditingItem({ ...editingItem, price: e.target.value })
            }
          />

          <select
            value={editingItem.category_id}
            onChange={(e) =>
              setEditingItem({ ...editingItem, category_id: e.target.value })
            }
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea
            value={editingItem.description || ""}
            onChange={(e) =>
              setEditingItem({ ...editingItem, description: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                imageFile: e.target.files?.[0] || null,
              })
            }
          />

          <button className="btn btn-success" onClick={saveEdit}>Save</button>
          <button className="btn btn-danger" onClick={() => setEditingItem(null)}>Cancel</button>
        </div>
      )}

      {/* CATEGORY MANAGER */}
      {showCategories && (
        <div className="modal">
          <h3>Manage Categories</h3>

          {categories.map((c) => (
            <div key={c.id} className="category-row">
              <input
                value={c.name}
                onChange={(e) =>
                  updateCategory(token, c.id, { name: e.target.value })
                }
              />
              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteCategory(token, c.id).then(() =>
                    setCategories((prev) =>
                      prev.filter((x) => x.id !== c.id)
                    )
                  )
                }
              >
                Delete
              </button>
            </div>
          ))}

          <input
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={() =>
              createCategory(token, { name: newCategory }).then((cat) => {
                setCategories((p) => [...p, cat]);
                setNewCategory("");
              })
            }
          >
            Add Category
          </button>

          <button
            className="btn btn-danger"
            onClick={() => setShowCategories(false)}
          >
            Close
          </button>
        </div>
      )}

      {deleteTarget && (
        <div className="modal">
          <h3>Confirm Delete</h3>

          <p>
            Are you sure you want to delete{" "}
            <strong>{deleteTarget.name}</strong>?
          </p>

          <button
            className="btn btn-danger"
            onClick={() => {
              deleteMenuItem(token, deleteTarget.id).then(() => {
                setMenu((prev) =>
                  prev.filter((i) => i.id !== deleteTarget.id)
                );
                setDeleteTarget(null);
              });
            }}
          >
            Delete
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setDeleteTarget(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
