import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, getProfile } from "../api";
import { setUser } from "../store/userSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            let defaultRole = "user";
            const res = await login({ email, password });
            const token = res.data?.token;
            if (token) {
                localStorage.setItem("token", token);
                // Fetch user profile and store in Redux
                try {
                    const profileRes = await getProfile();
                    const { firstName, lastName, role } = profileRes.data.user;
                    defaultRole = role;
                    console.log(firstName, lastName, role, token);
                    dispatch(setUser({ firstName, lastName, role, token }));
                } catch (profileErr) {
                    // If profile fetch fails, clear token
                    localStorage.removeItem("token");
                    setError("Login succeeded but failed to fetch profile.");
                    setLoading(false);
                    return;
                }
                if (defaultRole !== "admin") {
                    setSuccess("Login successful! Redirecting to events...");
                    navigate("/events");
                    setLoading(false);
                    return;
                } if (defaultRole === "admin") {
                    setSuccess("Login successful! Redirecting to admin panel...");
                    navigate("/admin");
                }
            } else {
                setError("Login failed. No token received.");
            }
        } catch (err) {
            setError(
                err?.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Login</h1>
                {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
                {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-700">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
