import React from "react";

const FormTextArea = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  style,
}) => {
  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg font-normal">{label}</legend>
        <textarea
          className="textarea h-24 w-1/2"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={style}
        ></textarea>
      </fieldset>
    </div>
  );
};

export default FormTextArea;
