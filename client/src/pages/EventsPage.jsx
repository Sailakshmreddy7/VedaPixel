import { useEffect, useState } from "react";
import { getAllEvents, bookEvent } from "../api";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EventsPage() {
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.user);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [registeringId, setRegisteringId] = useState(null);
    const [messages, setMessages] = useState({});

    const handleRegister = async (id) => {
        setRegisteringId(id);
        setMessages((prev) => ({ ...prev, [id]: "" }));
        try {
            await bookEvent(id);
            await fetchEvents();
            setMessages((prev) => ({ ...prev, [id]: "Successfully registered for the event!" }));
        } catch (err) {
            setMessages((prev) => ({
                ...prev,
                [id]: err?.response?.data?.message || "Failed to register for the event."
            }));
        } finally {
            setRegisteringId(null);
        }
    };
    const fetchEvents = async () => {
        try {
            const res = await getAllEvents();
            setEvents(res.data?.events || []);
        } catch (err) {
            setEvents([]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl text-gray-700 bg-gray-100">
                Loading events...
            </div>
        );
    }

    if (!events.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-700 bg-gray-100 px-4">
                <h1 className="mb-4 text-4xl font-extrabold">No Events Found</h1>
                <p>There are currently no upcoming events. Please check back later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            <div className="flex flex-col items-center mb-10">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Upcoming Events</h1>
                {role === 'admin' && (
                    <button
                        className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                        onClick={() => navigate('/events/create')}
                    >
                        + Create Event
                    </button>
                )}
            </div>
            <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        handleRegister={handleRegister}
                        loading={registeringId === event._id}
                        message={messages[event._id] || ""}
                    />
                ))}
            </div>
        </div>
    );
}

export default EventsPage;
