import React from "react";

const FormInput = ({
  label,
  type,
  name,
  value,
  defaultValue,
  placeholder,
  onChange,
  style,
  disabled,
  readOnly,
}) => {
  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg font-normal">{label}</legend>
        <input
          className="input w-full"
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          style={style}
          disabled={disabled}
          readOnly={readOnly}
        />
      </fieldset>
    </div>
  );
};

export default FormInput;
