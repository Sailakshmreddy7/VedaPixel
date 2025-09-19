import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api";

const EventFullPage = () => {
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
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-center py-12 px-2">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row gap-10">
                {/* Left: Event Main Info */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">{event.name}</h1>
                    <p className="mb-6 text-lg text-gray-700 leading-relaxed">{event.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div><span className="font-semibold">Date:</span> {event.date}</div>
                        <div><span className="font-semibold">Time:</span> {event.time}</div>
                        <div><span className="font-semibold">Location:</span> {event.location}</div>
                        <div><span className="font-semibold">Price:</span> ₹{event.price}</div>
                        <div><span className="font-semibold">Available Seats:</span> {event.availableSeats}</div>
                        <div><span className="font-semibold">Total Seats:</span> {event.totalSeats}</div>
                    </div>
                    <div className="mt-4 text-gray-600 text-base">
                        <span className="font-semibold">Organizer:</span> {event.organizer?.name} ({event.organizer?.email})
                    </div>
                </div>
                {/* Right: Project/Event Details */}
                <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 shadow-inner">
                    <h2 className="text-2xl font-bold text-purple-700 mb-3">About This Event</h2>
                    <p className="text-gray-700 text-base mb-4 text-center">
                        PixelVibe Events is a platform to discover, book, and manage unique events. This event is part of our curated collection, offering a memorable experience for all participants. Enjoy seamless booking, real-time updates, and a vibrant community.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 text-left mb-2">
                        <li>Easy online booking and instant confirmation</li>
                        <li>Secure payments and transparent pricing</li>
                        <li>Live seat availability and event updates</li>
                        <li>Connect with organizers and attendees</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EventFullPage;
