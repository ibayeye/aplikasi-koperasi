import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";

const Dashboard = () => {
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/savings");
        setSavings(data.data);
      } catch (err) {
        console.error("Error fetching savings:", err);
      }
    };
    fetchData();
  }, []);

  // === GROUP DATA PER BULAN ===
  const monthlyData = savings.reduce((acc, item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!acc[key]) {
      acc[key] = { name: key, wajib: 0, pokok: 0 };
    }

    if (item.type === "wajib") {
      acc[key].wajib += item.value;
    } else if (item.type === "pokok") {
      acc[key].pokok += item.value;
    }

    return acc;
  }, {});

  const chartData = Object.values(monthlyData);

  // === RINGKASAN TOTAL ===
  const totalWajib = savings
    .filter((s) => s.type === "wajib")
    .reduce((sum, s) => sum + s.value, 0);

  const totalPokok = savings
    .filter((s) => s.type === "pokok")
    .reduce((sum, s) => sum + s.value, 0);

  const totalKeseluruhan = totalWajib + totalPokok;

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Tren Simpanan Per Bulan
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#374151" }} />
            <YAxis tick={{ fill: "#374151" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="wajib"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Simpanan Wajib"
            />
            <Line
              type="monotone"
              dataKey="pokok"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Simpanan Pokok"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
