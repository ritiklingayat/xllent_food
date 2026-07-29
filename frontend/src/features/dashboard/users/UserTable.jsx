import React from "react";



export default function UserTable({

users=[],

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


<th className="p-4 text-left">
Name
</th>


<th className="p-4">
Role
</th>


<th className="p-4">
Email
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>





<tbody>


{


users.length===0

?


<tr>

<td

colSpan="5"

className="
p-10
text-center
text-slate-500
"

>

No Users Found

</td>

</tr>



:



users.map(user=>(


<tr

key={user.id}

className="
border-t
"


>


<td className="
p-4
font-bold
">

{user.name}

</td>



<td className="
p-4
">

<span className="
bg-orange-100
text-orange-700
px-3
py-1
rounded-full
font-semibold
">

{user.role}

</span>

</td>



<td className="
p-4
">

{user.email}

</td>



<td className="
p-4
">

{user.status}

</td>




<td className="
p-4
">


<button

onClick={()=>onDelete(user)}

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