import React from "react";


export default function CustomerTable({

customers=[],

onDelete

}){


return (

<div className="
bg-white
rounded-3xl
shadow
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-slate-100
">


<tr>

<th className="p-4">
Name
</th>

<th className="p-4">
Type
</th>

<th className="p-4">
Phone
</th>

<th className="p-4">
Credit
</th>

<th className="p-4">
Action
</th>

</tr>


</thead>



<tbody>


{

customers.map(customer=>(


<tr

key={customer.id}

className="
border-t
"


>


<td className="p-4 font-bold">

{customer.name}

</td>


<td className="p-4">

{customer.customerType}

</td>


<td className="p-4">

{customer.phone}

</td>


<td className="p-4">

₹{customer.creditLimit}

</td>


<td className="p-4">


<button

onClick={()=>onDelete(customer)}

className="
bg-red-100
text-red-700
px-4
py-2
rounded-xl
"

>

Delete

</button>


</td>


</tr>


))


}



</tbody>


</table>


</div>

);



}