import React from "react";

const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control flex flex-col items-center gap-y-2">
      <label htmlFor={name} className="label cursor-pointer  ">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
};

export default FormCheckbox;
