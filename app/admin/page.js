"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "2818") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("❌ Incorrect password! Access denied.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center border border-yellow-200 mt-10">
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">Admin Login</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your secret password to access the dashboard.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Admin Password"
          className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}
