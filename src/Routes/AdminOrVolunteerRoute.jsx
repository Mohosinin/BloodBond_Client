import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useVolunteer from "../hooks/useVolunteer";

const AdminOrVolunteerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isVolunteer, isVolunteerLoading] = useVolunteer();
    const location = useLocation();

    if (loading || isAdminLoading || isVolunteerLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && (isAdmin || isVolunteer)) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminOrVolunteerRoute;
