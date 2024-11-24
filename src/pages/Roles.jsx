import React, { useState, useEffect } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissionsList] = useState(["Read", "Write", "Delete"]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles"));
    if (savedRoles) {
      setRoles(savedRoles);
    } else {
      const sampleRoles = [
        {
          id: 1,
          name: "Admin",
          permissions: ["Read", "Write", "Delete"],
        },
        {
          id: 2,
          name: "Editor",
          permissions: ["Read", "Write"],
        },
        {
          id: 3,
          name: "Viewer",
          permissions: ["Read"],
        },
      ];
      setRoles(sampleRoles);
      localStorage.setItem("roles", JSON.stringify(sampleRoles));
    }
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }, [roles]);

  const handleAddRole = () => {
    if (!newRole.name) return;
    const newRoleWithId = { ...newRole, id: roles.length + 1 };
    setRoles([...roles, newRoleWithId]);
    setNewRole({ name: "", permissions: [] });
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const togglePermission = (permission, isEditing = false) => {
    if (isEditing) {
      setEditingRole((prevRole) => ({
        ...prevRole,
        permissions: prevRole.permissions.includes(permission)
          ? prevRole.permissions.filter((perm) => perm !== permission)
          : [...prevRole.permissions, permission],
      }));
    } else {
      setNewRole((prevRole) => ({
        ...prevRole,
        permissions: prevRole.permissions.includes(permission)
          ? prevRole.permissions.filter((perm) => perm !== permission)
          : [...prevRole.permissions, permission],
      }));
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
  };

  const handleUpdateRole = () => {
    if (!editingRole.name) return;
    setRoles(
      roles.map((role) => (role.id === editingRole.id ? editingRole : role))
    );
    setEditingRole(null);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Role Management</h2>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Permissions</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{role.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{role.permissions.join(", ")}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingRole ? (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Role</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <input
              type="text"
              className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editingRole.name}
              onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
              placeholder="Role Name"
            />

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Update Permissions:</label>
              <div className="flex flex-wrap gap-2">
                {permissionsList.map((permission) => (
                  <label key={permission} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                      checked={editingRole.permissions.includes(permission)}
                      onChange={() => togglePermission(permission, true)}
                    />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleUpdateRole}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Update Role
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Role</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <input
              type="text"
              className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              placeholder="Role Name"
            />

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Select Permissions:</label>
              <div className="flex flex-wrap gap-2">
                {permissionsList.map((permission) => (
                  <label key={permission} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                    />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddRole}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Add Role
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
