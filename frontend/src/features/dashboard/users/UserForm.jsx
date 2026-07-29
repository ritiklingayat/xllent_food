import React,{
useState
} from "react";


import {
useNavigate
}
from "react-router-dom";


import {
getUsers,
saveUsers
}
from "./utils/userStorage";




const initialForm={


name:"",

email:"",

password:"",

role:"ADMIN",

phone:"",

area:"",

status:"Active"


};






export default function UserForm(){



const navigate=useNavigate();


const [form,setForm]=useState(initialForm);






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:

e.target.value

});


};








const submit=(e)=>{


e.preventDefault();





if(
!form.name ||
!form.email ||
!form.password
){


alert(
"Please fill required fields"
);


return;


}







const users=getUsers();






const exists=

users.find(

user=>

user.email===form.email

);





if(exists){


alert(
"Email already exists"
);


return;


}







saveUsers([


...users,

{

id:

Date.now().toString(),


...form,


createdBy:

"SUPER_ADMIN",


createdAt:

new Date().toISOString()


}


]);







alert(
"User Created Successfully"
);



navigate(
"/dashboard/users"
);



};








return (

<div className="
bg-white
rounded-3xl
shadow
p-8
max-w-4xl
">





<h1 className="
text-3xl
font-black
mb-8
">

Create User

</h1>






<form

onSubmit={submit}

className="
space-y-5
"

>








<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Full Name"

className="
border
rounded-xl
p-3
w-full
"

/>







<input

name="email"

type="email"

value={form.email}

onChange={handleChange}

placeholder="Email ID"

className="
border
rounded-xl
p-3
w-full
"

/>









<input

name="password"

type="password"

value={form.password}

onChange={handleChange}

placeholder="Password"

className="
border
rounded-xl
p-3
w-full
"

/>









<select

name="role"

value={form.role}

onChange={handleChange}

className="
border
rounded-xl
p-3
w-full
"

>


<option value="ADMIN">

Admin

</option>



<option value="ASM">

ASM - Area Sales Manager

</option>




<option value="SO">

SO - Sales Officer

</option>



</select>









<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Mobile Number"

className="
border
rounded-xl
p-3
w-full
"

/>









<input

name="area"

value={form.area}

onChange={handleChange}

placeholder="Area / Territory"

className="
border
rounded-xl
p-3
w-full
"

/>









<select

name="status"

value={form.status}

onChange={handleChange}

className="
border
rounded-xl
p-3
"

>


<option>

Active

</option>


<option>

Inactive

</option>



</select>









<button

className="
bg-orange-500
text-white
px-8
py-3
rounded-xl
font-bold
"

>

Create User

</button>









</form>






</div>


);


}