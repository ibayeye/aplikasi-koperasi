import React, { useCallback, useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../services/api";
import SavingModal from "../../components/SavingModal";

const SavingsAdmin = () => {
  const [savings, setSavings] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: null,
    savingsId: null,
  });
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const [selectedSaving, setSelectedSaving] = useState(null);
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

  const handleSavingModal = (saving) => {
    setSelectedSaving(saving);
    setIsSavingModalOpen(true);
  };

  const confirmSaving = async (updatedSaving) => {
    try {
      await api.put(`/savings/${updatedSaving.id}`, updatedSaving);
      fetchSavings();
      setIsSavingModalOpen(false);
      setSelectedSaving(null);
    } catch (err) {
      console.error("Gagal update simpanan", err);
    }
  };

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

      <div className="bg-white shadow-md rounded-md p-4">
        <div>
          <button onClick={exportCSV} className="btn btn-success mb-4 mt-4">
            Export CSV
          </button>
          <div className="h-[400px] overflow-y-auto rounded-md border border-base-300">
            <table className="table table-md table-pin-rows table-pin-cols">
              <thead>
                <tr className="text-md font-bold">
                  <td>No</td>
                  <td>Jenis Simpanan</td>
                  <td>Besar Simpanan</td>
                  <td>Bulan</td>
                  <td>Total Bagi Hasil Tahunan</td>
                  <td>Aksi</td>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="h-[300px]">
                      {" "}
                      <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>
                    </td>
                  </tr>
                ) : savings.length > 0 ? (
                  savings.map((item, index) => (
                    <tr key={item.id} className="hover:bg-base-300">
                      <td className="text-center text-md">{index + 1}</td>
                      <td className="capitalize">{item.type}</td>
                      <td>{formatCurrency(item.value)}</td>
                      <td>{item.date ? formatDate(item.date) : "-"}</td>
                      <td>{formatCurrency(item.bagi_hasil)}</td>

                      <td>
                        <div className="grid gap-2">
                          <button
                            className="btn btn-xs btn-info"
                            onClick={() => handleSavingModal(item)}
                          >
                            Detail
                          </button>

                          <button
                            className="btn btn-xs btn-error"
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: "delete",
                                savingsId: item.id,
                              })
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <SavingModal
              isOpen={isSavingModalOpen}
              onClose={() => setIsSavingModalOpen(false)}
              saving={selectedSaving}
              onConfirm={confirmSaving}
            />

            {/* Reusable Modal */}
            <ConfirmModal
              isOpen={confirmModal.open}
              title={`Konfirmasi Hapus Simpanan`}
              message={`Apakah Anda yakin ingin menghapus simpanan ini?`}
              onCancel={() =>
                setConfirmModal({ open: false, type: null, savingsId: null })
              }
              onConfirm={async () => {
                try {
                  if (confirmModal.type === "delete") {
                    await api.delete(`/savings/${confirmModal.savingsId}`);
                  }
                  fetchSavings();
                  setConfirmModal({ open: false, type: null, savingsId: null });
                } catch (err) {
                  console.error("Gagal menghapus simpanan", err);
                }
              }}
              confirmText="Hapus"
              cancelText="Batal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsAdmin;
