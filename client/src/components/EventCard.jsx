
import React from "react";
import { useNavigate } from "react-router-dom";


function EventCard({ event, handleRegister, loading, message }) {
    const navigate = useNavigate();
    const {
        _id,
        name,
        description,
        date,
        time,
        location,
        price,
        totalSeats,
        availableSeats,
        organizer,
        registered
    } = event;

    // Show badge if seats are less than 20% of total
    const showHotBadge = totalSeats > 0 && availableSeats / totalSeats <= 0.2;

    return (
        <div className="flex flex-col p-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {showHotBadge && (
                <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                    🔥 Hot / Trending
                </span>
            )}

            <h2 className="mb-4 text-2xl font-bold text-gray-900">{name}</h2>

            <p className="mb-4 text-gray-700 leading-relaxed">{description}</p>

            <div className="mb-4 text-gray-600 space-y-1">
                <p>
                    <span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}
                </p>
                <p>
                    <span className="font-medium">Time:</span> {time}
                </p>
                <p>
                    <span className="font-medium">Location:</span> {location}
                </p>
                <p>
                    <span className="font-medium">Price:</span> ${price}
                </p>
                <p>
                    <span className="font-medium">Available Seats:</span> {availableSeats}/{totalSeats}
                </p>
            </div>

            <div className="mt-auto text-gray-500 text-sm border-t border-gray-200 pt-3">
                <p>
                    <span className="font-medium">Organizer:</span> {organizer.name}
                </p>
                <p>
                    <span className="font-medium">Email:</span> {organizer.email}
                </p>
            </div>

            {message && (
                <div className={`mt-2 text-center ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </div>
            )}
            <div className="flex flex-col gap-2 mt-4">
                {registered ? (
                    <button
                        className="w-full py-2 bg-red-200 text-white font-semibold rounded-lg shadow-md"
                        disabled={true}
                    >
                        Already Registered
                    </button>
                ) : (
                    <button
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                        onClick={() => handleRegister(_id)}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                )}
                <button
                    className="w-full py-2 bg-gray-200 text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-200 transition"
                    onClick={() => navigate(`/events/${_id}`)}
                >
                    View Event
                </button>
            </div>

        </div>
    );
}

export default EventCard;
