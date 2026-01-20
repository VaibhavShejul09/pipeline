import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { loginApi } from "../services/authService";
import { getRoleFromToken } from "../utils/jwtUtils";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // API call
      const res = await loginApi({
        username: form.username,
        password: form.password,
      });

      const token = res?.data?.accessToken;
      if (!token) throw new Error("Access token not received");

      // store token
      localStorage.setItem("token", token);

      // decode role
      const role = getRoleFromToken(token);
      console.log("Decoded role:", role);

      if (role !== "ROLE_ADMIN") {
        throw new Error("Unauthorized: Admin access only");
      }

      localStorage.setItem("role", role);

      // redirect to admin dashboard
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Admin Login to access dashboard"
      className="bg-gray-50 min-h-screen flex justify-center items-center"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 mt-4 bg-green-600 hover:bg-green-700
                     text-white font-semibold rounded-lg transition
                     disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400 text-sm">
        Admin access only
      </div>
    </AuthLayout>
  );
}
