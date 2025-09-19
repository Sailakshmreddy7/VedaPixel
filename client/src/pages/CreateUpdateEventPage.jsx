import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent, createEvent } from "../api";
import { toast } from "react-toastify";

function CreateUpdateEventForm({ isCreate = true }) {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        price: "",
        totalSeats: "",
        availableSeats: "",
        location: "",
        organizer: { name: "", email: "", phone: "" },
    });
    const [eventId, setEventId] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isCreate && id) {
            setFetching(true);
            getEventById(id)
                .then((res) => {
                    const eventData = res.data.event || res.data;
                    setEventId(eventData._id);
                    setFormData({
                        name: eventData.name || "",
                        description: eventData.description || "",
                        date: eventData.date ? eventData.date.split("T")[0] : "",
                        time: eventData.time || "",
                        price: eventData.price || "",
                        totalSeats: eventData.totalSeats || "",
                        availableSeats: eventData.availableSeats || "",
                        location: eventData.location || "",
                        organizer: {
                            name: eventData.organizer?.name || "",
                            email: eventData.organizer?.email || "",
                            phone: eventData.organizer?.phone || "",
                        },
                    });
                })
                .catch(() => {
                    setErrors({ general: "Failed to fetch event data." });
                })
                .finally(() => setFetching(false));
        }
    }, [isCreate, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("organizer.")) {
            const key = name.split(".")[1];
            setFormData({
                ...formData,
                organizer: { ...formData.organizer, [key]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");
        setLoading(true);
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                totalSeats: Number(formData.totalSeats),
                availableSeats: Number(formData.availableSeats),
            };
            if (isCreate) {
                await createEvent(payload);
                setSuccessMessage("Event created successfully!");
                toast("Event created successfully!");
                navigate("/admin");
            } else {
                await updateEvent(eventId || id, payload);
                setSuccessMessage("Event updated successfully!");
                toast("Event updated successfully!");
                navigate("/admin");
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: err?.response?.data?.message || "Something went wrong." });
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching && !isCreate) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-700">
                Loading event data...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                    {isCreate ? "Create Event" : "Update Event"}
                </h1>
                {errors.general && (
                    <div className="mb-6 text-red-700 bg-red-100 px-4 py-2 rounded">
                        {errors.general}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-6 text-green-700 bg-green-100 px-4 py-2 rounded">
                        {successMessage}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Event Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Event Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Event Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Event Description"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="4"
                        />
                        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Date, Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Time</label>
                            <input
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="hh:mm AM/PM"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Price and Seats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Total Seats</label>
                            <input
                                type="number"
                                name="totalSeats"
                                value={formData.totalSeats}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.totalSeats && <p className="text-red-600 text-sm mt-1">{errors.totalSeats}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Available Seats</label>
                            <input
                                type="number"
                                name="availableSeats"
                                value={formData.availableSeats}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.availableSeats && <p className="text-red-600 text-sm mt-1">{errors.availableSeats}</p>}
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Event Location"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                    </div>

                    {/* Organizer */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Organizer Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                name="organizer.name"
                                value={formData.organizer.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors["organizer.name"] && <p className="text-red-600 text-sm mt-1">{errors["organizer.name"]}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="organizer.email"
                                value={formData.organizer.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors["organizer.email"] && <p className="text-red-600 text-sm mt-1">{errors["organizer.email"]}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone</label>
                            <input
                                type="text"
                                name="organizer.phone"
                                value={formData.organizer.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors["organizer.phone"] && <p className="text-red-600 text-sm mt-1">{errors["organizer.phone"]}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center gap-2">
                        <span className="text-gray-500 text-sm">Ready to share your event?</span>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                            disabled={loading}
                        >
                            {loading ? (isCreate ? "Creating..." : "Updating...") : (isCreate ? "Create Event" : "Update Event")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUpdateEventForm;