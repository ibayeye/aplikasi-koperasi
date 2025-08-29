import React, { useState } from "react";
import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";
import FormInputFile from "./FormInputFile";

const SettleLoanModal = ({ isOpen, onClose, loan, onConfirm }) => {
  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState(null);
  const [date, setDate] = useState("");

  if (!isOpen || !loan) return null;

  const handleLoanAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value) {
      const formatted = parseInt(value, 10).toLocaleString("id-ID");
      setAmount(`Rp ${formatted}`);
    } else {
      setAmount("");
    }
  };

  const getNumericAmount = () => {
    return amount.replace(/\D/g, "");
  };

  const formatDateForBackend = (dateString) => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return "";
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formattedDate = formatDateForBackend(date);
      if (!formattedDate) {
        alert("Format tanggal tidak valid");
        return;
      }

      const numericAmount = getNumericAmount();
      if (!numericAmount || numericAmount === "0") {
        alert("Jumlah bayar harus diisi");
        return;
      }

      const formData = new FormData();
      formData.append("loan_id", loan.id);
      formData.append("amount", numericAmount);
      formData.append("date", formattedDate);
      if (proof) formData.append("proof", proof);

      setAmount("");
      setDate("");
      setProof(null);

      onConfirm(formData);
    } catch (error) {
      console.error("Error settling loan:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Pelunasan Pinjaman</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FormInput
              label="Jumlah Bayar"
              type="text"
              name="amount"
              placeholder="Rp 0"
              value={amount}
              onChange={handleLoanAmountChange}
              required
            />
            {loan?.remaining_amount && (
              <p className="text-sm text-blue-600 mt-1">
                Sisa pinjaman:{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(loan.remaining_amount)}
              </p>
            )}
          </div>

          <div>
            <FormDateInput
              label="Tanggal Bayar"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

          <div>
            <FormInputFile
              label="Bukti Pembayaran"
              name="proof"
              onChange={(e) => setProof(e.target.files[0])}
              accept="image/*,.pdf"
              required
              maxSize={2}
              allowedTypes={[
                "image/jpeg",
                "image/png",
                "image/jpg",
                "application/pdf",
              ]}
              helperText="Upload bukti pembayaran (JPG, PNG, PDF - maks 2MB)"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettleLoanModal;
