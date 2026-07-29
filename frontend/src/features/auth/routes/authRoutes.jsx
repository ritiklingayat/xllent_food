import React from "react";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";


const authRoutes = [

    {
        path: "/login",
        element: <Login />,
    },


    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },


    {
        path: "/reset-password/:token",
        element: <ResetPassword />,
    },

];


export default authRoutes;