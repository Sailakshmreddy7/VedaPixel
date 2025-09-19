import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";

const Navbar = () => {
    const { token, role, firstName } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        window.location.href = "/login";
    };

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative">
            {/* Logo and Desktop Links */}
            <div className="flex items-center gap-6">
                <Link to="/" className="text-2xl font-bold text-blue-700">
                    PixelVibe Events
                </Link>
                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {role !== "admin" && (role !== null) && (
                        <Link to="/events" className="text-gray-700 hover:text-blue-700 font-medium">
                            Events
                        </Link>
                    )}
                    {token && role !== "admin" && (
                        <Link to="/bookings" className="text-gray-700 hover:text-blue-700 font-medium">
                            My Bookings
                        </Link>
                    )}
                    {role === "admin" && (
                        <Link to="/admin" className="text-gray-700 hover:text-blue-700 font-medium">
                            Admin Panel
                        </Link>
                    )}
                </div>
            </div>
            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center gap-4">
                {token ? (
                    <>
                        <span className="text-gray-700 font-medium hidden sm:inline">Hi, {firstName || "User"}</span>
                        {role === "user" && (
                            <Link to="/profile" className="text-gray-700 hover:text-blue-700 font-medium">
                                Profile
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                            Login
                        </Link>
                        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
            {/* Hamburger for mobile - moved to end */}
            <button
                className="md:hidden ml-2 focus:outline-none order-last"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
            >
                <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col md:hidden animate-fade-in">
                    <div className="flex flex-col gap-2 py-4 px-6 border-b">
                        {role !== "admin" && (role !== null) && (
                            <Link to="/events" className="text-gray-700 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>
                                Events
                            </Link>
                        )}
                        {token && role !== "admin" && (
                            <Link to="/bookings" className="text-gray-700 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>
                                My Bookings
                            </Link>
                        )}
                        {role === "admin" && (
                            <Link to="/admin" className="text-gray-700 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>
                                Admin Panel
                            </Link>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 py-4 px-6">
                        {token ? (
                            <>
                                <span className="text-gray-700 font-medium">Hi, {firstName || "User"}</span>
                                {role === "user" && (
                                    <Link to="/profile" className="text-gray-700 hover:text-blue-700 font-medium" onClick={() => setMenuOpen(false)}>
                                        Profile
                                    </Link>
                                )}
                                <button
                                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded font-semibold transition w-fit self-start text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-blue-600 font-semibold hover:underline" onClick={() => setMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/signup" className="text-blue-600 font-semibold hover:underline" onClick={() => setMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
