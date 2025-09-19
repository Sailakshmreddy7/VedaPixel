import React, { useEffect, useState } from "react";
import { getEventBookings } from "../api";
import { useParams } from "react-router-dom";

const EventBookingsPage = () => {
    const { eventId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await getEventBookings(eventId);
                setBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
                setError(null);
            } catch (err) {
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [eventId]);

    if (loading) return <div className="p-8">Loading bookings...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Event Bookings</h2>
            {bookings.length === 0 ? (
                <div className="">No bookings found for this event.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">User Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Booking Date</th>
                                <th className="py-2 px-4 border-b">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="py-2 px-4 border-b">{booking.userId?.firstName} {booking.userId?.lastName}</td>
                                    <td className="py-2 px-4 border-b">{booking.userId?.email || "-"}</td>
                                    <td className="py-2 px-4 border-b">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleString() : "-"}</td>
                                    <td className="py-2 px-4 border-b">{booking.totalPrice ? `₹${booking.totalPrice}` : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EventBookingsPage;
