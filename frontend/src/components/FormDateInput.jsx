import React, { useEffect, useRef } from "react";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";

const FormDateInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  style,
}) => {
  const myDatepicker = useRef(null);

  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
      format: "YYYY-MM-DD", // Format yang akan ditampilkan di input
      onSelect: (date) => {
        // Pastikan format yang dikirim selalu YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        console.log("Selected date:", formattedDate); // Debug log

        onChange &&
          onChange({
            target: {
              name,
              value: formattedDate, // Format YYYY-MM-DD
            },
          });
      },
    });

    // Set initial value jika ada
    if (value) {
      // Pastikan value dalam format yang benar
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        picker.setDate(dateValue, true);
      }
    }

    return () => picker.destroy();
  }, [name, onChange, value]);

  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg font-normal">{label}</legend>
        <input
          className="input input-bordered w-full"
          ref={myDatepicker}
          type="text"
          name={name}
          value={value}
          placeholder={placeholder || "YYYY-MM-DD"}
          style={style}
          readOnly
        />
      </fieldset>
    </div>
  );
};

export default FormDateInput;
