import React, { useState, useEffect } from "react";
import Users from "./Users";
import Roles from "./Roles";
import Permissions from "./Permissions";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null);  // Set initial state to null

  // Load active tab from localStorage on component mount
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab("users"); // Set default tab to 'users' if no tab is found in localStorage
    }
  }, []);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <Users />;
      case "roles":
        return <Roles />;
      case "permissions":
        return <Permissions />;
      default:
        return null;  // No fallback needed as activeTab is always set
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage users, roles, and permissions efficiently.
        </p>
      </header>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "roles"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          Roles
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "permissions"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab("permissions")}
        >
          Permissions
        </button>
      </div>
      <main className="bg-white rounded-lg shadow-md p-6">
        {activeTab && renderContent()} {/* Only render content if activeTab is not null */}
      </main>
    </div>
  );
};

export default Dashboard;
