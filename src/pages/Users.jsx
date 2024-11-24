import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(storedUsers);
    setRoles(storedRoles);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill out all fields.");
      return;
    }
    if (!validateEmail(newUser.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    const newUserWithId = { ...newUser, id: users.length + 1 };
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUserWithId];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleEditUser = (id) => {
    const user = users.find((u) => u.id === id);
    setEditingUser(user);
  };

  const handleSaveUser = () => {
    if (!editingUser.name || !editingUser.email || !editingUser.role) {
      alert("Please fill out all fields.");
      return;
    }
    if (!validateEmail(editingUser.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((u) =>
        u.id === editingUser.id ? editingUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((u) => u.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-2 text-sm text-gray-800">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.role}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{user.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingUser ? "Edit User" : "Add New User"}
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={editingUser ? editingUser.role : newUser.role}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, role: e.target.value })
                : setNewUser({ ...newUser, role: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            value={editingUser ? editingUser.status : newUser.status}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, status: e.target.value })
                : setNewUser({ ...newUser, status: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mt-4">
          <button
            onClick={editingUser ? handleSaveUser : handleAddUser}
            className={`px-6 py-2 text-white rounded-lg ${
              editingUser
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editingUser ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
