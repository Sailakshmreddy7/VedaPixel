import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings, cancelBooking } from "../api";

function BookingsPage() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await getUserBookings();
            setBookings(res.data.bookings || []);
        } catch (err) {
            setError("Failed to fetch bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const [cancelingId, setCancelingId] = useState(null);
    const [cancelError, setCancelError] = useState("");

    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        setCancelingId(bookingId);
        setCancelError("");
        try {
            await cancelBooking(bookingId);
            await fetchBookings();
        } catch (err) {
            setCancelError("Failed to cancel booking.");
        } finally {
            setCancelingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-700">
                Loading bookings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600">
                {error}
            </div>
        );
    }

    if (!bookings.length) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-700">
                No bookings found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
                My Bookings
            </h1>

            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => {
                    const { _id, totalPrice, bookingDate, eventId } = booking;
                    return (
                        <div
                            key={_id}
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {eventId.name}
                            </h2>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Date:</span>{" "}
                                {new Date(eventId.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Time:</span> {eventId.time}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Price:</span> ₹{eventId.price}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Total Paid:</span> ₹{totalPrice}
                            </p>
                            <p className="text-gray-500 text-sm mt-auto border-t border-gray-200 pt-3">
                                <span className="font-medium">Booking Date:</span>{" "}
                                {new Date(bookingDate).toLocaleString()}
                            </p>
                            <button
                                className="mt-4 w-full py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                                onClick={() => navigate(`/events/${eventId._id}`)}
                            >
                                View Event
                            </button>
                            <button
                                className="mt-2 w-full py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                                onClick={() => handleCancel(eventId._id)}
                                disabled={cancelingId === eventId._id}
                            >
                                {cancelingId === _id ? "Cancelling..." : "Cancel Booking"}
                            </button>
                            {cancelError && (
                                <div className="mt-2 text-center text-red-600">{cancelError}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BookingsPage;
