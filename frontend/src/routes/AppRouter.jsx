import React from "react";
import { Navigate } from "react-router-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";

import authRoutes from "@/features/auth/routes/authRoutes.jsx";

import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/features/home/pages/Home";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import { dashboardRoutes } from "./dashboardRoutes";


const AppRouter = () => {


return (

<BrowserRouter>

<Routes>


{/* Authentication Routes */}

<Route element={<AuthLayout />}>

{
authRoutes.map((route)=>(

<Route

key={route.path}

path={route.path}

element={

<PublicRoute>

{route.element}

</PublicRoute>

}

/>

))
}

</Route>


<Route element={<PublicLayout />}>

<Route

path="/"

element={<Home />}

/>

</Route>

{/* Dashboard */}

{/* Dashboard */}

<Route

path="/dashboard"

element={

<ProtectedRoute>

<DashboardLayout />

</ProtectedRoute>

}

>


<Route

index

element={<Dashboard />}

/>


{
dashboardRoutes.map((route)=>(


<Route

key={route.path}

path={route.path}

element={route.element}

/>


))

}


</Route>



<Route

path="*"

element={
<Navigate to="/login" replace />
}

/>


</Routes>


</BrowserRouter>

);


};


export default AppRouter;