import React, { useCallback, useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import api from "../../services/api";

const SettlementsAdmin = () => {
  const [settlement, setSettlement] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: null,
    settlementId: null,
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

  const fetchSettlement = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/settlement`);
      console.log(data);
      setSettlement(data.data);
    } catch (error) {
      console.error("Error fetching settlements:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettlement();
  }, [fetchSettlement]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Daftar Pelunasan</h1>

      <div className="flex bg-white shadow-md rounded-md p-4 justify-center ">
        <div>
          <div className="h-[400px] w-[1000px] overflow-y-auto rounded-md border border-base-300">
            <table className="table table-md table-pin-rows table-pin-cols">
              <thead>
                <tr className="text-md font-bold">
                  <td>No</td>
                  <td>Nama Karyawan</td>
                  <td>Besar Pinjaman</td>
                  <td>Jumlah Sisa Pinjaman</td>
                  <td>Jumlah Pelunasan</td>
                  <td>Tanggal Pelunasan</td>
                  <td>Buktif Transfer</td>
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
                ) : settlement.length > 0 ? (
                  settlement.map((item, index) => (
                    <tr key={item.id} className="hover:bg-base-300">
                      <td className="text-center text-md">{index + 1}</td>
                      <td className="capitalize">{item.user?.name}</td>
                      <td>{formatCurrency(item.loan?.amount)}</td>
                      <td>{formatCurrency(item.loan?.remaining_amount)}</td>
                      <td>{formatCurrency(item.amount)}</td>
                      <td>{item.date ? formatDate(item.date) : "-"}</td>
                      <td className="capitalize">
                        <img
                          src={item.proof}
                          className="w-16 h-full object-cover"
                        />
                      </td>
                      <td className="capitalize">{item.status}</td>

                      <td>
                        <div className="grid gap-2">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() =>
                              setConfirmModal({
                                open: true,
                                type: "approve",
                                settlementId: item.id,
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
                                settlementId: item.id,
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
                    <td colSpan="9" className="text-center">
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
              } Pelunasan`}
              message={`Apakah Anda yakin ingin ${
                confirmModal.type === "approve" ? "menyetujui" : "menolak"
              } Pelunasan ini?`}
              onCancel={() =>
                setConfirmModal({ open: false, type: null, settlementId: null })
              }
              onConfirm={async () => {
                try {
                  if (confirmModal.type === "approve") {
                    await api.post(
                      `/settlement/approve/${confirmModal.settlementId}`
                    );
                  } else {
                    await api.post(
                      `/settlement/reject/${confirmModal.settlementId}`
                    );
                  }
                  fetchSettlement();
                  setConfirmModal({
                    open: false,
                    type: null,
                    settlementId: null,
                  });
                } catch (err) {
                  console.error("Gagal update pelunasan", err);
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

export default SettlementsAdmin;
