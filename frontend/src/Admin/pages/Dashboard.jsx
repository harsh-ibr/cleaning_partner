import React from "react";
import StatCard from "../../Utils/StatCard";

function Dashboard() {
  return (
    <div>
      <h1 className="mb-2 fill-sky-600" style={{ fontSize: "x-large" }}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="New Orders" value="150" bg="bg-cyan-500" icon="🛍️" />
        <StatCard title="Bounce Rate" value="53%" bg="bg-green-500" icon="📊" />
        <StatCard
          title="User Registrations"
          value="44"
          bg="bg-yellow-400 text-black"
          icon="👤"
        />
        <StatCard
          title="Unique Visitors"
          value="65"
          bg="bg-red-500"
          icon="📈"
        />
      </div>
    </div>
  );
}

export default Dashboard;
