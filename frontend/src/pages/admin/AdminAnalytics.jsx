import { useEffect, useState } from "react";
import { fetchAdminAnalytics } from "../../api/adminAnalytics";
import "../../styles/AdminAnalytics.css";
import { formatMoney } from "../../utils/money";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const PIE_COLORS = ["#f4b400", "#16a34a", "#2563eb", "#dc2626", "#7c3aed"];

function formatDayLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { weekday: "short" }); // Mon, Tue...
}

function formatMonthLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { month: "short" }); // Jan, Feb...
}

export default function AdminAnalytics() {
  const token = localStorage.getItem("admin_token");

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminAnalytics()
      .then(setData)
      .catch(() => setError("Failed to load analytics dashboard"));
  }, []);

  if (error) return <p className="admin-error">{error}</p>;
  if (!data) return <p className="admin-loading">Loading analytics...</p>;

  const { summary, status_breakdown, top_items, trend_daily, trend_monthly } = data;

  // ---------------------------
  // INSIGHTS (Peak / Lowest Days)
  // ---------------------------
  const peakRevenueDay = [...trend_daily].sort((a, b) => b.revenue - a.revenue)[0];
  const lowestRevenueDay = [...trend_daily].sort((a, b) => a.revenue - b.revenue)[0];

  const peakOrdersDay = [...trend_daily].sort((a, b) => b.orders - a.orders)[0];
  const lowestOrdersDay = [...trend_daily].sort((a, b) => a.orders - b.orders)[0];

  return (
    <div className="admin-analytics-page">
      <h2 className="admin-analytics-title">Sales Analytics</h2>
      <p className="admin-analytics-subtitle">
        Track sales performance, customer activity, and revenue trends.
      </p>

      {/* SUMMARY CARDS */}
      <div className="analytics-grid">
        <AnalyticsCard title="Today Orders" value={summary.today.orders} variant="blue" />
        <AnalyticsCard title="Today Revenue" value={`₦${formatMoney(summary.today.revenue)}`} variant="green" />
        <AnalyticsCard title="This Week Orders" value={summary.week.orders} variant="purple" />
        <AnalyticsCard title="This Week Revenue" value={`₦${formatMoney(summary.week.revenue)}`} variant="gold" />
        <AnalyticsCard title="This Month Orders" value={summary.month.orders} variant="orange" />
        <AnalyticsCard title="This Month Revenue" value={`₦${formatMoney(summary.month.revenue)}`} variant="teal" />
        <AnalyticsCard title="This Year Orders" value={summary.year.orders} variant="red" />
        <AnalyticsCard title="This Year Revenue" value={`₦${formatMoney(summary.year.revenue)}`} variant="dark" />
      </div>

      {/* INSIGHTS */}
      <div className="insights-grid">
        <div className="insight-card">
          <h3>📈 Peak Revenue Day</h3>
          <p>
            <strong>{formatDayLabel(peakRevenueDay.period)}</strong> — ₦{formatMoney(peakRevenueDay.revenue)}
          </p>
        </div>

        <div className="insight-card">
          <h3>📉 Lowest Revenue Day</h3>
          <p>
            <strong>{formatDayLabel(lowestRevenueDay.period)}</strong> — ₦{formatMoney(lowestRevenueDay.revenue)}
          </p>
        </div>

        <div className="insight-card">
          <h3>🔥 Highest Orders Day</h3>
          <p>
            <strong>{formatDayLabel(peakOrdersDay.period)}</strong> — {peakOrdersDay.orders} orders
          </p>
        </div>

        <div className="insight-card">
          <h3>🧊 Lowest Orders Day</h3>
          <p>
            <strong>{formatDayLabel(lowestOrdersDay.period)}</strong> — {lowestOrdersDay.orders} orders
          </p>
        </div>
      </div>

      {/* DAILY CHARTS */}
      <div className="charts-grid">
        {/* Revenue Line Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Revenue Trend (Last 7 Days)</h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend_daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tickFormatter={formatDayLabel} />
              <YAxis tickFormatter={(value) => `₦${Number(value).toLocaleString()}`} />
              <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Bar Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Orders Trend (Last 7 Days)</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trend_daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tickFormatter={formatDayLabel} />
              <YAxis />
              <Tooltip formatter={(value) => `${value} orders`} />
              <Legend />
              <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MONTHLY CHARTS */}
      <div className="charts-grid">
        {/* Monthly Revenue */}
        <div className="chart-card">
          <h3 className="chart-title">Monthly Revenue Trend (Last 12 Months)</h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend_monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tickFormatter={formatMonthLabel} />
              <YAxis tickFormatter={(value) => `₦${Number(value).toLocaleString()}`} />
              <Tooltip formatter={(value) => `₦${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Orders */}
        <div className="chart-card">
          <h3 className="chart-title">Monthly Orders Trend (Last 12 Months)</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trend_monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tickFormatter={formatMonthLabel} />
              <YAxis />
              <Tooltip formatter={(value) => `${value} orders`} />
              <Legend />
              <Bar dataKey="orders" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* STATUS + TOP ITEMS */}
      <div className="charts-grid">
        {/* Status Pie */}
        <div className="chart-card">
          <h3 className="chart-title">Order Status Distribution</h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={status_breakdown}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {status_breakdown.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Table */}
        <div className="chart-card">
          <h3 className="chart-title">Top Selling Items</h3>

          <div className="top-items-table">
            <div className="top-items-header">
              <span>Item</span>
              <span>Qty Sold</span>
            </div>

            {top_items.length === 0 ? (
              <p className="empty-chart">No sales recorded yet.</p>
            ) : (
              top_items.map((item, idx) => (
                <div className="top-items-row" key={idx}>
                  <span className="rank-badge">#{idx + 1}</span>
                  <span className="top-item-name">{item.name}</span>
                  <span className="top-item-qty">{item.total_quantity}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* STATUS BREAKDOWN LIST */}
      <div className="analytics-section">
        <h3>Orders Status Breakdown</h3>

        <div className="status-list">
          {status_breakdown.map((s, idx) => (
            <div key={idx} className="status-row">
              <span className="status-name">{s.status}</span>
              <span className="status-count">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, variant = "green" }) {
  return (
    <div className={`analytics-card analytics-${variant}`}>
      <p className="analytics-card-title">{title}</p>
      <h3 className="analytics-card-value">{value}</h3>
    </div>
  );
}
