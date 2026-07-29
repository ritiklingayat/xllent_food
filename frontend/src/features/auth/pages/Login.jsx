import React from "react";


import LoginForm from "../components/LoginForm";



const Login = () => {


return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
">


<div className="
bg-white
p-8
rounded-xl
shadow-lg
w-full
max-w-md
">


<h1 className="
text-3xl
font-bold
text-center
mb-6
">

Xllent Foods

</h1>



<p className="
text-center
mb-6
text-gray-500
">

Super Admin Login

</p>




<LoginForm />


</div>


</div>

);


};


export default Login;