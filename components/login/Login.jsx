"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ state for toggle

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email address.";

    if (!form.password) newErrors.password = "Password is required.";
    else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(form.password)) {
        newErrors.password =
          "Password must have uppercase, lowercase, number & special symbol.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });


      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful ✅ Redirecting...");
        setTimeout(() => router.push("/"), 1000);
      } else {
        setMessage(data.message || "Invalid credentials");
      }
      if(data.success){
        window.location.href = "/admin";
      }else{
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-yellow-200 mt-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center text-yellow-700 font-bold text-xl">
            <img src="/images/logof.jpg" alt="logo" />
          </div>
          <h1 className="text-2xl font-extrabold text-yellow-700 mt-3 text-center">
            Shree Shyam Jewellers
          </h1>
          <p className="text-gray-600 mt-1 text-sm text-center">
            Welcome back! Log in to continue your elegant journey ✨
          </p>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-yellow-800 font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-yellow-300"
            } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <label className="block text-yellow-800 font-medium mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // 👁️ toggle
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-yellow-300"
            } rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          />

          {/* 👁️ Eye Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-yellow-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="bg-yellow-600 text-white w-full py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 font-semibold shadow-md"
        >
          Log In
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("successful") ? "text-green-600" : "text-red-700 bg-red-200 py-2 "
            }`}
          >
            {message}
          </p>
        )}

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-yellow-700 font-medium hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
