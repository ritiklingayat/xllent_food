import React,{
useState
} from "react";


import {
useNavigate
}
from "react-router-dom";


import {
getCustomers,
saveCustomers
}
from "./utils/customerStorage";


import {
getAuthUser
}
from "@/features/auth/utils/authStorage";



const initial={


shopName:"",

ownerName:"",

phone:"",

email:"",

shopType:"RETAILER",

address:"",

city:"",

state:"",

assignedSO:"",

status:"Active"


};





export default function CustomerForm(){



const navigate=useNavigate();


const user=getAuthUser();



const [form,setForm]=useState(initial);





const change=(e)=>{


setForm({

...form,

[e.target.name]:

e.target.value

});


};








const submit=(e)=>{


e.preventDefault();




const customers=getCustomers();






saveCustomers([


...customers,


{

id:

Date.now().toString(),


...form,



assignedSO:

user.role==="SO"

?

user.id

:

form.assignedSO,




createdBy:

user.role,



createdAt:

new Date().toISOString()

}


]);





alert(
"Shop Added Successfully"
);



navigate(
"/dashboard/customers"
);



};








return (

<div className="
bg-white
rounded-3xl
p-8
shadow
max-w-4xl
">



<h1 className="
text-3xl
font-black
mb-6
">

Add Shop

</h1>





<form

onSubmit={submit}

className="space-y-4"

>



<input

name="shopName"

placeholder="Shop Name"

value={form.shopName}

onChange={change}

className="
border
rounded-xl
p-3
w-full
"

/>





<input

name="ownerName"

placeholder="Owner Name"

value={form.ownerName}

onChange={change}

className="
border
rounded-xl
p-3
w-full
"

/>





<input

name="phone"

placeholder="Mobile"

value={form.phone}

onChange={change}

className="
border
rounded-xl
p-3
w-full
"

/>





<select

name="shopType"

value={form.shopType}

onChange={change}

className="
border
rounded-xl
p-3
w-full
"

>


<option value="RETAILER">

Retailer

</option>


<option value="WHOLESALER">

Wholesaler

</option>


<option value="DISTRIBUTOR">

Distributor

</option>


</select>






<textarea

name="address"

placeholder="Address"

value={form.address}

onChange={change}

className="
border
rounded-xl
p-3
w-full
"

/>







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

Save Shop

</button>





</form>





</div>

);


}