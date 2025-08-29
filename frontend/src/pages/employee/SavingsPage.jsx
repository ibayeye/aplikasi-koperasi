import React, { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card";
import api from "../../services/api";

const SavingsPage = () => {
  const [savings, setSavings] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchSavings = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/savings`);
      setSavings(data.data);
    } catch (error) {
      console.error("Error fetching savings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  const getMonthFromDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.getMonth() + 1;
  };

  const filteredSavings = savings.filter((s) => {
    const month = getMonthFromDate(s.date);

    const matchType = filterType === "all" ? true : s.type === filterType;
    const matchMonth =
      filterMonth === "all" ? true : month === parseInt(filterMonth, 10);

    return matchType && matchMonth;
  });

  // hitung value untuk cards
  const wajib = filteredSavings.find((s) => s.type === "wajib")?.value || 0;
  const pokok = filteredSavings.find((s) => s.type === "pokok")?.value || 0;
  const wajibTahunan =
    filteredSavings.find((s) => s.type === "wajib")?.bagi_hasil || 0;

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const exportCSV = () => {
    const headers = [
      "No",
      "Jenis Simpanan",
      "Besar Simpanan",
      "Bulan",
      "Total Bagi Hasil Tahunan",
    ];
    const rows = savings.map((item, index) => [
      index + 1,
      item.type,
      item.value,
      item.date,
      item.bagi_hasil,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "savings_data.csv");
    link.click();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Daftar Simpanan</h1>

      <div className="mb-4 flex gap-2">
        <select
          className="select select-bordered w-full max-w-xs"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="wajib">Simpanan Wajib</option>
          <option value="pokok">Simpanan Pokok</option>
        </select>

        <select
          className="select select-bordered w-full max-w-xs"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="all">Semua Bulan</option>
          <option value="1">Januari</option>
          <option value="2">Februari</option>
          <option value="3">Maret</option>
          <option value="4">April</option>
          <option value="5">Mei</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">Agustus</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-md p-4">
        <div className="grid grid-cols-3 gap-4">
          <Card title={"Simpanan Wajib"} body={formatCurrency(wajib)} />
          <Card title={"Simpanan Pokok"} body={formatCurrency(pokok)} />
          <Card
            title={"Total Bagi Hasil Tahunan"}
            body={formatCurrency(wajibTahunan)}
          />
        </div>
        <button onClick={exportCSV} className="btn btn-success mb-4 mt-4">
          Export CSV
        </button>
        <div className="h-[300px] overflow-y-auto rounded-md border border-base-300">
          <table className="table table-md table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-md font-bold">
                <td>No</td>
                <td>Jenis Simpanan</td>
                <td>Besar Simpanan</td>
                <td>Bulan</td>
                <td>Total Bagi Hasil Tahunan</td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-4">
                    <div className="flex justify-center items-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : filteredSavings.length > 0 ? (
                filteredSavings.map((item, index) => (
                  <tr key={item.id} className="hover:bg-base-300">
                    <td className="text-center text-md">{index + 1}</td>
                    <td className="capitalize">{item.type}</td>
                    <td>{formatCurrency(item.value)}</td>
                    <td>{item.date ? formatDate(item.date) : "-"}</td>
                    <td>{formatCurrency(item.bagi_hasil)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Tidak ada data untuk filter ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
