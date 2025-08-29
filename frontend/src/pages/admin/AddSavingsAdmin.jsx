import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import FormDateInput from "../../components/FormDateInput";
import api from "../../services/api";

const AddSavingsAdmin = () => {
  const [formData, setFormData] = useState({
    wajib: "",
    pokok: "",
    date: "",
  });

  // format angka ke "Rp. xxx"
  const handleLoanAmountChange = (e) => {
    const { name, value } = e.target;
    const numeric = value.replace(/\D/g, ""); // hanya ambil angka
    if (numeric) {
      setFormData({
        ...formData,
        [name]: "Rp. " + parseInt(numeric, 10).toLocaleString("id-ID"),
      });
    } else {
      setFormData({
        ...formData,
        [name]: "",
      });
    }
  };

  // format date ke backend
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
      // ambil angka asli (hapus Rp dan titik)
      const wajibValue = formData.wajib.replace(/\D/g, "");
      const pokokValue = formData.pokok.replace(/\D/g, "");
      const formattedDate = formatDateForBackend(formData.date);

      const payload = {
        wajib: wajibValue,
        pokok: pokokValue,
        date: formattedDate,
      };

      await api.post("/savings", payload);
      alert("Simpanan berhasil ditambahkan!");

      setFormData({ wajib: "", pokok: "", date: "" });
    } catch (err) {
      console.error("Gagal tambah simpanan:", err);
      alert("Gagal tambah simpanan");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className="text-3xl font-bold mb-4">Tambah Simpanan</h1>

        <div className="bg-white shadow-md rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Simpanan Wajib"
              type="text"
              name="wajib"
              value={formData.wajib}
              onChange={handleLoanAmountChange}
              placeholder="Masukkan simpanan wajib"
            />

            <FormInput
              label="Simpanan Pokok"
              type="text"
              name="pokok"
              value={formData.pokok}
              onChange={handleLoanAmountChange}
              placeholder="Masukkan simpanan pokok"
            />

            <FormDateInput
              label="Bulan"
              name="date"
              value={formData.date}
              placeholder="Pilih Tanggal (YYYY-MM-DD)"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
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

export default AddSavingsAdmin;
