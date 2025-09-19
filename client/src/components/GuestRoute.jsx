import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const GuestRoute = ({ children }) => {
    const { token, role } = useSelector((state) => state.user);
    if (token && (role === null || role === undefined)) {
        return <div className="p-8">Loading...</div>;
    }
    if (token && role === "user") {
        return <Navigate to="/events" replace />;
    }
    if (token && role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default GuestRoute;
