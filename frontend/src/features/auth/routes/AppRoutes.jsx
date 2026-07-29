import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


import authRoutes 
from "@/features/auth/routes/authRoutes.jsx";


import DashboardLayout 
from "@/layouts/DashboardLayout";


import AuthLayout 
from "@/layouts/AuthLayout";


import PublicLayout 
from "@/layouts/PublicLayout";


import Home 
from "@/features/home/pages/Home";


import Dashboard 
from "@/features/dashboard/pages/Dashboard";


import {
    dashboardRoutes
} from "./dashboardRoutes";



const AppRouter = () => {


return (

<BrowserRouter>

<Routes>


{/* =========================
    AUTH ROUTES
========================= */}


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




{/* =========================
    PUBLIC WEBSITE
========================= */}


<Route element={<PublicLayout />}>

<Route

path="/"

element={<Home />}

/>

</Route>




{/* =========================
    PROTECTED DASHBOARD
========================= */}


<Route element={<ProtectedRoute />}>



<Route

path="/dashboard"

element={<DashboardLayout />}

>


{/* Dashboard Home */}

<Route

index

element={<Dashboard />}

/>



{/* Products + Categories */}

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



</Route>




{/* =========================
    FALLBACK
========================= */}


<Route

path="*"

element={
<Navigate 
to="/dashboard"
replace
/>
}

/>


</Routes>


</BrowserRouter>

);


};


export default AppRouter;