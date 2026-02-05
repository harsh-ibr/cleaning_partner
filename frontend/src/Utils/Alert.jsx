import React from "react";

export default function Alert({ color = "green", message = "", onClose }) {
  if (!message) return null; // 👈 hide completely if no message

  return (
    <div className="relative h-14 pt-3">
      <div
        className={`flex items-start justify-between rounded-md bg-${color}-50 p-3 border border-${color}-200`}
      >
        <p className={`text-sm text-${color}-700`}>
          <span className="font-medium">Success!</span> {message}
        </p>

        <button
          onClick={onClose}
          className={`ml-4 text-${color}-700 hover:text-red-700 font-bold`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
