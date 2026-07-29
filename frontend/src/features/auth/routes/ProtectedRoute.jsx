import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";


const ProtectedRoute = ({
    children,
    allowedRoles = []
}) => {


const { user, loading } = useAuth();



if(loading){

    return (
        <div className="flex h-screen items-center justify-center">
            Loading...
        </div>
    );
}



if(!user){

    return (
        <Navigate 
            to="/login"
            replace
        />
    );

}



if(
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
){

    return (
        <Navigate 
            to="/unauthorized"
            replace
        />
    );

}



return children;


};


export default ProtectedRoute;