import {
useState
}
from "react";


import {
useNavigate
}
from "react-router-dom";


import {
loginAdmin
}
from "@/auth/authService";


import {
useAuth
}
from "@/auth/AuthProvider";



export default function Login(){


const navigate = useNavigate();


const {
setUser
}=useAuth();



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);



async function submit(e){

e.preventDefault();


try{


setLoading(true);



const data =
await loginAdmin(
email,
password
);



setUser(
data.user
);



navigate("/dashboard");



}

catch(error){


alert(
"Invalid email or password"
);


}

finally{


setLoading(false);


}


}



return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
">


<form

onSubmit={submit}

className="
bg-white
p-8
rounded-2xl
shadow-xl
w-full
max-w-md
"


>


<h1 className="
text-3xl
font-black
text-center
mb-6
">

Xllent Foods

</h1>



<input

className="
w-full
border
rounded-xl
p-3
mb-4
"

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>



<input

className="
w-full
border
rounded-xl
p-3
mb-6
"

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>



<button

disabled={loading}

className="
w-full
bg-blue-600
text-white
rounded-xl
py-3
font-bold
"

>

{
loading
?
"Logging in..."
:
"Login"
}

</button>



</form>


</div>

)

}