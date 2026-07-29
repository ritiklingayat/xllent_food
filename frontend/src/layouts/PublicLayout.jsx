import React from "react";

import {
Outlet
}
from "react-router-dom";


import Footer from "./components/Footer";



const PublicLayout = () => {


return (

<div className="
min-h-screen
flex
flex-col
">


<header className="
h-16
bg-white
shadow
flex
items-center
px-6
">


<h1 className="
font-bold
text-xl
">

Xllent Foods

</h1>


</header>




<main className="
flex-1
">

<Outlet />

</main>



<Footer />



</div>

);


};


export default PublicLayout;