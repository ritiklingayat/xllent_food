import React from "react";


import AuthCard
from "../components/AuthCard";


import AuthInput
from "../components/AuthInput";



const ForgotPassword=()=>{


return (

<AuthCard

title="Forgot Password"

subtitle="Reset your account password"

>


<div

className="
space-y-5
"

>


<AuthInput

label="Email"

placeholder="Enter email"

/>



<button

className="
w-full
bg-blue-600
text-white
py-3
rounded-lg
"

>

Send Reset Link

</button>


</div>



</AuthCard>

);


};


export default ForgotPassword;