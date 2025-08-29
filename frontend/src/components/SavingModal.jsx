import React, { useState, useEffect } from "react";

const SavingModal = ({ isOpen, onClose, saving, onConfirm }) => {
  const [formData, setFormData] = useState({
    type: "",
    value: "",
    date: "",
  });

  useEffect(() => {
    if (saving) {
      setFormData({
        type: saving.type || "wajib",
        value: saving.value || "",
        date: saving.date || "",
      });
    }
  }, [saving]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ ...formData, id: saving.id });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-xl font-bold mb-4">Detail Simpanan</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Jenis Simpanan pakai dropdown */}
          <div>
            <label className="block text-sm">Jenis Simpanan</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="wajib">Wajib</option>
              <option value="pokok">Pokok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Besar Simpanan</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm">Bulan</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavingModal;
