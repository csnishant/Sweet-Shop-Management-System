import React from "react";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) return <p>Please login first</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Sweet Shop Dashboard</h1>
    </div>
  );
};

export default Dashboard;
