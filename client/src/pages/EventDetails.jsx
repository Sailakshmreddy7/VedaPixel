import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const res = await getEventById(id);
                setEvent(res.data.event || res.data);
                setError(null);
            } catch (err) {
                setError("Failed to load event details");
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading event...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!event) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">{event.name}</h1>
                <p className="mb-2 text-gray-700">{event.description}</p>
                <div className="mb-2"><span className="font-semibold">Date:</span> {event.date}</div>
                <div className="mb-2"><span className="font-semibold">Time:</span> {event.time}</div>
                <div className="mb-2"><span className="font-semibold">Location:</span> {event.location}</div>
                <div className="mb-2"><span className="font-semibold">Price:</span> ₹{event.price}</div>
                <div className="mb-2"><span className="font-semibold">Available Seats:</span> {event.availableSeats}</div>
                <div className="mb-2"><span className="font-semibold">Organizer:</span> {event.organizer?.name} ({event.organizer?.email})</div>
            </div>
        </div>
    );
};

export default EventDetails;
