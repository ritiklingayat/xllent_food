import React from "react";
import ReactDOM from "react-dom/client";


import {
  BrowserRouter
} from "react-router-dom";


import {
  Provider
} from "react-redux";


import {
  Toaster
} from "react-hot-toast";



import {
  store
} from "@/store";



import AuthProvider
from "@/auth/AuthProvider";



import SocketProvider
from "./providers/SocketProvider";



import App
from "./App";



import "@/api/authInterceptor";

import "./index.css";



import seedUsers
from "@/features/auth/utils/seedUsers";




// Seed demo users

seedUsers();






ReactDOM.createRoot(
document.getElementById("root")
)
.render(


<React.StrictMode>


<Provider store={store}>


<BrowserRouter>


<AuthProvider>


<SocketProvider>


<App />


</SocketProvider>



<Toaster

position="top-right"

reverseOrder={false}

/>



</AuthProvider>



</BrowserRouter>



</Provider>



</React.StrictMode>


);