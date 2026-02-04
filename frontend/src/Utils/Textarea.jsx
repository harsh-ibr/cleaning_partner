import React from "react";

export default function Textarea({
  name,
  value,
  onChange,
  isRequired = false,
  title = "",
  rows = 8,
  error = "",
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
          {isRequired && <sup className="text-red-700">*</sup>}
        </label>
        <textarea
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={formatLabel(name)}
          rows={rows}
        ></textarea>
        {error && <div className="text-red-700">{error}</div>}
      </div>
    </>
  );
}
