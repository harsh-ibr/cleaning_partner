import React from "react";

export default function Input({
  name,
  value,
  onChange,
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
    <>
      <div className="mb-3">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          {title ? title : formatLabel(name)}

          {isRequired && <sup className="text-red-500">*</sup>}
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder ? placeholder : formatLabel(name)}
        />
        {error && <div className="text-red-700">{error}</div>}
      </div>
    </>
  );
}
