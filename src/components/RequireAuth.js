import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log("Auth:"+auth?.user);
    console.log("Roles:"+auth?.roles);

    

    return (
        //auth?.roles?.find(role => allowedRoles?.includes(role))
        auth?.user//?.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
    
    
}

export default RequireAuth;