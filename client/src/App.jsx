import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/userSlice";
import { getProfile } from "./api";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import EventBookingsPage from "./pages/EventBookingsPage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/Signup";
import EventsPage from "./pages/EventsPage";
import CreateUpdateEventForm from "./pages/CreateUpdateEventPage";
import BookingsPage from "./pages/BookingsPage";
import HomePage from "./pages/HomePage";
import EventFullPage from "./pages/EventFullPage";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GuestRoute from "./components/GuestRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const res = await getProfile();
        // Accept all fields from backend response (firstName, lastName, email, role, ...)
        const token = localStorage.getItem("token");
        const userData = res.data.user || res.data;
        console.log("[App] getProfile response:", userData);
        dispatch(setUser({ ...userData, token }));
      } catch (err) {
        console.error("[App] getProfile error:", err);
        dispatch(clearUser());
      }
    };
    const token = localStorage.getItem("token");
    console.log("[App] token in localStorage:", token);
    if (token) {
      validateUser();
    } else {
      dispatch(clearUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Public route */}
        <Route path="/signup" element={
          <GuestRoute>
            <SignupPage />
          </GuestRoute>
        } />
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/events" element={
          <RoleProtectedRoute allowedRoles={['user']}>
            <EventsPage />
          </RoleProtectedRoute>} />
        <Route path="/events/create" element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <CreateUpdateEventForm isCreate={true} />
          </RoleProtectedRoute>
        }
        />
        <Route path="/events/update/:id" element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <CreateUpdateEventForm isCreate={false} />
          </RoleProtectedRoute>
        } />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/events/:id" element={<EventFullPage />} />
        <Route path="/" element={<HomePage />} />
        {/* User routes */}
        <Route
          path="/profile"
          element={
            <RoleProtectedRoute allowedRoles={['user']}>
              <Profile />
            </RoleProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/event/:eventId/bookings"
          element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <EventBookingsPage />
            </RoleProtectedRoute>
          }
        />
        {/* Redirect unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router >
  );
}

export default App;
