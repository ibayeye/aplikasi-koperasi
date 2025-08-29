import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import SettleLoanModal from "../../components/SettleLoanModal";

const ListLoansPage = () => {
  const [loan, setLoan] = useState([]);
  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const fetchLoan = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/loans`);
      console.log(data);
      setLoan(data.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoan();
  }, [fetchLoan]);

  const confirmSettleLoan = async (formData) => {
    try {
      await api.post("/settlement", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsSettleModalOpen(false);
      setSelectedLoan(null);
      fetchLoan();
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  const handleSettleLoan = (id) => {
    setSelectedLoan(id);
    setIsSettleModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Daftar Pinjaman</h1>

      <div className="bg-white shadow-md rounded-md p-4">
        <div>
          <div className="h-[400px] overflow-y-auto rounded-md border border-base-300">
            <table className="table table-md table-pin-rows table-pin-cols">
              <thead>
                <tr className="text-md font-bold">
                  <td>No</td>
                  <td>Besar Pinjaman</td>
                  <td>Jumlah Sisa Pinjaman</td>
                  <td>Tanggal Pengajuan</td>
                  <td>Status</td>
                  <td>Aksi</td>
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
                ) : loan.length > 0 ? (
                  loan.map((item, index) => (
                    <tr key={item.id} className="hover:bg-base-300">
                      <td className="text-center text-md">{index + 1}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{formatCurrency(item.remaining_amount)}</td>
                      <td>{item.date ? formatDate(item.date) : "-"}</td>
                      <td className="capitalize">{item.status}</td>

                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleSettleLoan(item)}
                            disabled={
                              item.remaining_amount <= 0 ||
                              item.status === "applied"
                            }
                          >
                            Lunasi
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <SettleLoanModal
          isOpen={isSettleModalOpen}
          onClose={() => setIsSettleModalOpen(false)}
          loan={selectedLoan}
          onConfirm={confirmSettleLoan}
        />
      </div>
    </div>
  );
};

export default ListLoansPage;
