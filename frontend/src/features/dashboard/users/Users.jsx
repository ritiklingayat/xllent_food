import React,{
useEffect,
useState
} from "react";


import {
useNavigate
}
from "react-router-dom";


import UserTable from "./UserTable";


import {
getUsers,
saveUsers
}
from "./utils/userStorage";





export default function Users(){



const navigate=useNavigate();


const [users,setUsers]=useState([]);







const loadUsers=()=>{


setUsers(

getUsers()

);


};







useEffect(()=>{


loadUsers();


window.addEventListener(
"usersUpdated",
loadUsers
);



return()=>{


window.removeEventListener(
"usersUpdated",
loadUsers
);


};


},[]);








const deleteUser=(user)=>{


const confirmDelete=

window.confirm(

`Delete ${user.name}?`

);



if(!confirmDelete)

return;






const updated=

users.filter(

item=>

item.id!==user.id

);





saveUsers(updated);



};









return (

<div className="
space-y-6
">





<div className="
flex
justify-between
items-center
">


<div>


<h1 className="
text-3xl
font-black
">

User Management

</h1>



<p className="
text-slate-500
">

Create Admin, ASM and Sales Officers

</p>


</div>








<button

onClick={()=>navigate(
"/dashboard/users/create"
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

+ Create User

</button>





</div>







<UserTable

users={users}

onDelete={deleteUser}

/>








</div>


);


}