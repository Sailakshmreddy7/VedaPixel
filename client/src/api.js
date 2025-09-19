// src/api.js
import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Auth APIs =====
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

// ===== Booking APIs =====
export const getUserBookings = () => API.get("/booking/bookings");
export const bookEvent = (eventId) => API.post("/booking/book", { eventId });
export const cancelBooking = (bookingId) =>
  API.post("/booking/cancel", { eventId: bookingId });

// ===== Event APIs =====
export const createEvent = (data) => API.post("/events/create", data);
export const updateEvent = (id, data) => API.put(`/events/update/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/delete/${id}`);
export const getFutureEvents = () => API.get("/events/events");
export const getEventById = (id) => API.get(`/events/event/${id}`);
export const getAllEvents = () => API.get("/events/events");

// ===== Bookings APIs =====
// Get bookings for a specific event (admin)
export const getEventBookings = (eventId) =>
  API.get(`/booking/bookings/${eventId}`);

// ===== User APIs =====

export const updateProfile = (data) => API.put("/auth/profile", data);
export const getProfile = () => API.get("/user/profile");

export default API;
