
import React, { useEffect, useState } from 'react';
import { getAllEvents, deleteEvent } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminPanel = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const res = await getAllEvents();
                setEvents(res.data.events || res.data || []);
                setError(null);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/events/update/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await deleteEvent(id);
            setEvents(events.filter(e => e._id !== id));
            toast.success('Event deleted successfully');
        } catch (err) {
            toast.error('Failed to delete event');
        }
    };

    const handleViewBookings = (id) => {
        navigate(`/event/${id}/bookings`);
    };

    if (loading) return <div className="p-8">Loading events...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Admin Event Management</h2>
            {events.length === 0 ? (
                <div>No events found.</div>
            ) : (
                <div className="grid gap-6">
                    {events.map(event => (
                        <div key={event._id} className="border rounded-lg p-6 bg-white shadow flex flex-col md:flex-row gap-6">
                            {/* Images */}
                            {event.images && event.images.length > 0 && (
                                <div className="mb-4 md:mb-0 md:w-1/4 flex-shrink-0">
                                    <img
                                        src={event.images[0]}
                                        alt={event.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="font-bold text-2xl mb-2">{event.name}</div>
                                    <div className="mb-2 text-gray-700">{event.description}</div>
                                    <div className="mb-2 text-gray-600 space-y-1">
                                        <p><span className="font-medium">Date:</span> {event.date ? new Date(event.date).toLocaleDateString() : ''}</p>
                                        <p><span className="font-medium">Time:</span> {event.time}</p>
                                        <p><span className="font-medium">Location:</span> {event.location}</p>
                                        <p><span className="font-medium">Price:</span> ${event.price}</p>
                                        <p><span className="font-medium">Available Seats:</span> {event.availableSeats}/{event.totalSeats}</p>
                                    </div>
                                    <div className="mt-2 text-gray-500 text-sm border-t border-gray-200 pt-2">
                                        <p><span className="font-medium">Organizer:</span> {event.organizer?.name}</p>
                                        <p><span className="font-medium">Email:</span> {event.organizer?.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdate(event._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        onClick={() => handleDelete(event._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                        onClick={() => handleViewBookings(event._id)}
                                    >
                                        View Bookings
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-600 text-sm">Want to add a new event?</span>
                <button
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                    onClick={() => navigate('/events/create')}
                >
                    Create Event
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
