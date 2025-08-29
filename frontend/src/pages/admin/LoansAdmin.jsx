import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import ConfirmModal from "../../components/ConfirmModal";

const LoansAdmin = () => {
  const [loan, setLoan] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: null,
    loanId: null,
  });
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

  const handleApproveLoan = async (id) => {
    try {
      await api.post(`/loans/approve/${id}`);
      fetchLoan();
    } catch (err) {
      console.error("Gagal approve pinjaman", err);
    }
  };

  const handleRejectLoan = async (id) => {
    try {
      await api.post(`/loans/reject/${id}`);
      fetchLoan();
    } catch (err) {
      console.error("Gagal reject pinjaman", err);
    }
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
                  <td>Nama Karyawan</td>
                  <td>Besar Pinjaman</td>
                  <td>Jumlah Sisa Pinjaman</td>
                  <td>Tanggal Pengajuan</td>
                  <td>No Telepon</td>
                  <td>Alamat</td>
                  <td>Status</td>
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
                ) : loan.length > 0 ? (
                  loan.map((item, index) => (
                    <tr key={item.id} className="hover:bg-base-300">
                      <td className="text-center text-md">{index + 1}</td>
                      <td className="capitalize">{item.user?.name}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{formatCurrency(item.remaining_amount)}</td>
                      <td>{item.date ? formatDate(item.date) : "-"}</td>
                      <td className="capitalize">{item.phone}</td>
                      <td className="capitalize">{item.address}</td>
                      <td className="capitalize">{item.status}</td>

                      <td>
                        <div className="grid gap-2">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: "approve",
                                loanId: item.id,
                              })
                            }
                            disabled={
                              item.remaining_amount <= 0 ||
                              item.status === "approved"
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-xs btn-error"
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: "reject",
                                loanId: item.id,
                              })
                            }
                            disabled={
                              item.remaining_amount <= 0 ||
                              item.status === "approved" ||
                              item.status === "rejected"
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <ConfirmModal
              isOpen={confirmModal.open}
              title={`Konfirmasi ${
                confirmModal.type === "approve" ? "Approve" : "Reject"
              } Pinjaman`}
              message={`Apakah Anda yakin ingin ${
                confirmModal.type === "approve" ? "menyetujui" : "menolak"
              } pinjaman ini?`}
              onCancel={() =>
                setConfirmModal({ open: false, type: null, loanId: null })
              }
              onConfirm={async () => {
                try {
                  if (confirmModal.type === "approve") {
                    await api.post(`/loans/approve/${confirmModal.loanId}`);
                  } else {
                    await api.post(`/loans/reject/${confirmModal.loanId}`);
                  }
                  fetchLoan();
                  setConfirmModal({ open: false, type: null, loanId: null });
                } catch (err) {
                  console.error("Gagal update pinjaman", err);
                }
              }}
              confirmText="Konfirmasi"
              cancelText="Batal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansAdmin;
