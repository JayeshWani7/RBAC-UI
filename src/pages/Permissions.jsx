import React, { useState } from "react";

const Permissions = () => {
  const [permissions] = useState(["Read", "Write", "Delete"]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleTogglePermission = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Permissions Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {permissions.map((permission) => (
          <label
            key={permission}
            className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              checked={selectedPermissions.includes(permission)}
              onChange={() => handleTogglePermission(permission)}
            />
            <span className="text-gray-700 font-medium">{permission}</span>
          </label>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Permissions</h3>
        <ul className="list-disc list-inside bg-white p-4 rounded-lg shadow-sm">
          {selectedPermissions.length > 0 ? (
            selectedPermissions.map((permission, index) => (
              <li key={index} className="text-gray-700">
                {permission}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No permissions selected.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Permissions;
