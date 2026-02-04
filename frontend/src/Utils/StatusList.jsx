import React from "react";

function StatusList({ status = "" }) {
  const statusStyles = {
    active: "bg-green-100 text-green-700 ring-1 ring-green-600/20",
    inactive: "bg-red-100 text-red-700 ring-1 ring-red-600/20",
    pending: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/20",
    completed: "bg-blue-100 text-blue-700 ring-1 ring-blue-600/20",
    draft: "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize ${
        statusStyles[status?.toLowerCase()] ||
        "bg-gray-100 text-gray-700 ring-1 ring-gray-600/20"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusList;
