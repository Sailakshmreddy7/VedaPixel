import React from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaUsers, FaClock } from "react-icons/fa";

function HomePage() {
    return (
        <div className="min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white h-screen flex items-center">
                <div className="absolute inset-0 bg-gray-600 bg-opacity-40"></div>
                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                        Find, Book & Enjoy Events
                    </h1>
                    <p className="text-lg md:text-xl mb-8 drop-shadow">
                        Discover the best events around you, grab tickets, and create memories.
                    </p>
                    <Link
                        to="/events"
                        className="inline-block bg-white text-indigo-700 font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transform transition"
                    >
                        Browse Events
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12 text-gray-800">
                        Why VedaPixel Events
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transform transition">
                            <FaTicketAlt className="text-indigo-600 text-5xl mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Easy Booking</h3>
                            <p className="text-gray-600">
                                Book tickets in just a few clicks with our simple and fast interface.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transform transition">
                            <FaUsers className="text-pink-500 text-5xl mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Community Events</h3>
                            <p className="text-gray-600">
                                Connect with other attendees and enjoy experiences together.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transform transition">
                            <FaClock className="text-purple-600 text-5xl mb-4 mx-auto" />
                            <h3 className="text-2xl font-semibold mb-2">Real-Time Updates</h3>
                            <p className="text-gray-600">
                                Stay updated with event timings, seat availability, and notifications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            {/* {show only when user is not logged in} */}
            {
                !localStorage.getItem("token") && (
                    <section className="py-20 px-6 bg-indigo-600 text-white text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl font-bold mb-6">
                                Ready to Join the Fun?
                            </h2>
                            <p className="text-lg mb-8">
                                Sign up now and start exploring amazing events near you!
                            </p>
                            <Link
                                to="/signup"
                                className="inline-block bg-white text-indigo-700 font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transform transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </section>
                )
            }
            {/* Footer */}
            <footer className="py-6 text-center text-gray-600 bg-gray-100">
                &copy; 2025 VedaPixel Events. All rights reserved.
            </footer>
        </div>
    );
}

export default HomePage;
