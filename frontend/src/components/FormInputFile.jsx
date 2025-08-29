import React from "react";

const FormInputFile = ({
  label = "Upload File",
  name,
  onChange,
  accept = "*/*",
  multiple = false,
  required = false,
  disabled = false,
  className = "",
  placeholder = "Pilih file...",
  maxSize, // dalam MB
  allowedTypes, // array of file types
  showFileInfo = true,
  value, // untuk display selected file name
  error,
  helperText,
  ...props
}) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    const file = multiple ? files : files[0];

    // Validasi ukuran file jika maxSize ditentukan
    if (maxSize && file) {
      const filesToCheck = multiple ? Array.from(files) : [file];
      const oversizedFiles = filesToCheck.filter(
        (f) => f.size > maxSize * 1024 * 1024
      );

      if (oversizedFiles.length > 0) {
        alert(`File terlalu besar! Maksimal ${maxSize}MB`);
        e.target.value = ""; // Reset input
        return;
      }
    }

    // Validasi tipe file jika allowedTypes ditentukan
    if (allowedTypes && file) {
      const filesToCheck = multiple ? Array.from(files) : [file];
      const invalidFiles = filesToCheck.filter(
        (f) => !allowedTypes.includes(f.type)
      );

      if (invalidFiles.length > 0) {
        alert(`Tipe file tidak diizinkan! Hanya: ${allowedTypes.join(", ")}`);
        e.target.value = ""; // Reset input
        return;
      }
    }

    // Panggil onChange callback
    if (onChange) {
      onChange({
        target: {
          name,
          value: file,
          files: files,
        },
      });
    }
  };

  const getFileInfo = () => {
    if (!value) return null;

    if (value instanceof File) {
      return (
        <div className="text-sm text-gray-600 mt-1">
          <span className="font-medium">{value.name}</span>
          <span className="ml-2">
            ({(value.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      );
    }

    if (typeof value === "string") {
      return (
        <div className="text-sm text-gray-600 mt-1">
          <span className="font-medium">{value}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="form-control">
      <div className="fieldset">
        <legend className="fieldset-legend text-lg font-normal">
          {label}
          {/* {required && <span className="text-red-500 ml-1">*</span>} */}
        </legend>

        <input
          type="file"
          name={name}
          className={`file-input file-input-bordered w-full ${
            error ? "file-input-error border-red-500" : ""
          } ${disabled ? "file-input-disabled" : ""} ${className}`}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />

        {/* Info file yang dipilih */}
        {showFileInfo && getFileInfo()}

        {/* Helper text */}
        {helperText && (
          <div className="text-sm text-gray-500 mt-1">{helperText}</div>
        )}

        {/* Error message */}
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default FormInputFile;
