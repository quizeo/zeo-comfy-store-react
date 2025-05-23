import React from "react";

const FormSelect = ({ label, name, list, defaultValue, size }) => {
  return (
    <div className="form control ">
      <label htmlFor={name} className="label block">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        className={`select select-bordered ${size}`}
        name={name}
        id={name}
        defaultValue={defaultValue}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
