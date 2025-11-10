"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // Delete icon

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users from backend
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Format "Last Active" — minutes / hours / days ago
  const formatLastActive = (date) => {
    if (!date) return "Never";

    const now = new Date();
    const lastActive = new Date(date);
    const diffMs = now - lastActive;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  // Delete user
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (data.success) {
          alert("✅ User deleted successfully");
          setUsers(users.filter((u) => u._id !== id));
        } else {
          alert("❌ Error deleting user");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Something went wrong");
      }
    }
  };

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">
        Registered Users
      </h1>

      {/* Search bar */}
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded-xl px-4 py-2 mx-auto shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Joined</th>
              <th className="py-3 px-6">Last Active</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-100 transition-all"
                >
                  <td className="py-3 px-6 font-medium">{user.name}</td>
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {formatLastActive(user.lastActive)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
