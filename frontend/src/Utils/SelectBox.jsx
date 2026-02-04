import React from "react";

export default function SelectBox({
  name,
  value,
  onChange,
  options = [], // [{ value: "", label: "" }]
  isRequired = false,
  error = "",
  title = "",
  placeholder = "",
}) {
  const formatLabel = (text) => {
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {title ? title : formatLabel(name)}
        {isRequired && <sup className="text-red-500">*</sup>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">
          {placeholder ? placeholder : `Select ${formatLabel(name)}`}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <div className="text-red-700">{error}</div>}
    </div>
  );
}
