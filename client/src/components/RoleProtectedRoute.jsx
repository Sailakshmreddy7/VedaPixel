import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = useSelector((state) => state.user);
    console.log('[RoleProtectedRoute] token:', token, 'role:', role, 'allowedRoles:', allowedRoles);
    // Show loading if token exists but role is not yet loaded
    if (token && (role === null || role === undefined)) {
        return <div className="p-8">Loading...</div>;
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
        console.log("Access denied. User role:", role);
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};

export default RoleProtectedRoute;
