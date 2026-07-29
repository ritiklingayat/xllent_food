import React,{
useEffect,
useState
} from "react";


import {
useNavigate
}
from "react-router-dom";


import CustomerTable from "./CustomerTable";


import {
getCustomers,
saveCustomers
}
from "./utils/customerStorage";



export default function Customers(){



const navigate=useNavigate();


const [customers,setCustomers]=useState([]);




const load=()=>{


setCustomers(
getCustomers()
);


};




useEffect(()=>{


load();


window.addEventListener(
"customersUpdated",
load
);



return()=>{


window.removeEventListener(
"customersUpdated",
load
);


};



},[]);







const deleteCustomer=(customer)=>{


const updated=

customers.filter(

item=>

item.id!==customer.id

);


saveCustomers(updated);


};






return (

<div className="space-y-6">


<div className="
flex
justify-between
">


<div>


<h1 className="
text-3xl
font-black
">

Customers

</h1>


<p className="
text-slate-500
">

Manage Shops & Retailers

</p>


</div>




<button

onClick={()=>navigate(
"/dashboard/customers/create"
)}

className="
bg-orange-500
text-white
px-6
py-3
rounded-xl
font-bold
"

>

+ Add Shop

</button>



</div>






<CustomerTable

customers={customers}

onDelete={deleteCustomer}

/>






</div>

);

}