import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMyOrderDetail } from "../api/orders";

export default function MyOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchMyOrderDetail(id).then(setOrder);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Order: {order.order_no}</h2>
      <p>Status: {order.status}</p>
      <p>Total: ₦{order.total}</p>

      <h3>Items</h3>
      <ul>
        {order.items.map((i, idx) => (
          <li key={idx}>
            {i.name} x{i.quantity} (₦{i.unit_price})
          </li>
        ))}
      </ul>
    </div>
  );
}
