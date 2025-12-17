import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useVolunteer from "../hooks/useVolunteer";

const VolunteerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isVolunteer, isVolunteerLoading] = useVolunteer();
    const location = useLocation();

    if (loading || isVolunteerLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isVolunteer) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default VolunteerRoute;
