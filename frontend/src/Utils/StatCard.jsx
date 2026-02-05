import React from "react";

function StatCard({ title, value, icon, bg }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg text-white ${bg}`}
    >
      <div className="p-5">
        <div className="text-4xl font-bold">{value}</div>
        <div className="mt-1 text-sm opacity-90">{title}</div>
      </div>

      {/* Icon */}
      <div className="absolute right-4 top-4 text-white/30 text-6xl">
        {icon}
      </div>

      {/* Footer */}
      <div className="bg-black/15 px-5 py-2 text-sm flex justify-between items-center">
        <span>More info</span>
        <span>➜</span>
      </div>
    </div>
  );
}

export default StatCard;
