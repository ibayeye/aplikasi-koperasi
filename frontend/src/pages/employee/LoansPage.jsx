import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import FormDateInput from "../../components/FormDateInput";
import { useSelector } from "react-redux";
import api from "../../services/api";

const LoansPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [amount, setAmout] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value) {
      setAmout("Rp. " + parseInt(value, 10).toLocaleString("id-ID"));
    } else {
      setAmout("");
    }
  };

  const formatDateForBackend = (dateString) => {
    if (!dateString) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date format:", dateString);
      return "";
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = formatDateForBackend(date);

      console.log("Original date:", date);
      console.log("Formatted date:", formattedDate);

      if (!formattedDate) {
        alert("Format tanggal tidak valid");
        return;
      }

      const payload = {
        user_id: user.id,
        amount: parseInt(amount.replace(/\D/g, ""), 10),
        phone,
        address,
        date: formattedDate,
      };

      console.log("Payload to backend:", payload);

      const res = await api.post("/loans", payload);
      alert("Pinjaman berhasil diajukan!");

      setAmout("");
      setPhone("");
      setAddress("");
      setDate("");
    } catch (err) {
      console.error("Error details:", err.response?.data);
      alert(err.response?.data?.msg || "Gagal menyimpan pinjaman");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-3xl font-bold mb-4">Form Pinjaman</h1>

        <div className="bg-white shadow-md rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nama Karyawan"
              type="text"
              name="employeeName"
              defaultValue={user?.name || ""}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />

            <FormInput
              label="Besar Pinjaman"
              type="text"
              name="loanAmount"
              value={amount}
              onChange={handleLoanAmountChange}
              placeholder="Masukkan jumlah pinjaman"
            />

            <FormInput
              label="No Telepon"
              type="tel"
              value={phone}
              name="phoneNumber"
              placeholder="08xxxxxxxxxx"
              onChange={(e) => setPhone(e.target.value)}
            />

            <FormDateInput
              label="Tanggal Pinjam"
              name="loan_date"
              value={date}
              placeholder="Pilih Tanggal (YYYY-MM-DD)"
              onChange={(e) => {
                console.log("Date changed:", e.target.value);
                setDate(e.target.value);
              }}
            />
          </div>

          <div className="mt-4">
            <FormTextArea
              label="Alamat"
              name="address"
              value={address}
              placeholder="Masukkan alamat karyawan"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoansPage;
