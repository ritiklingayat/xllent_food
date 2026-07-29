import {
useSelector,
useDispatch
}
from "react-redux";


import {
markAsRead,
markAllRead
}
from "../notifications/notificationSlice";




export default function NotificationDropdown(){


const dispatch=useDispatch();


const notifications =
useSelector(
state=>state.notifications.notifications
);



return (

<div

className="
absolute
right-0
mt-3
w-96
bg-white
rounded-2xl
shadow-2xl
border
z-50
"

>


<div
className="
flex
justify-between
p-4
border-b
"
>

<h3 className="font-bold">

Notifications

</h3>


<button

onClick={()=>
dispatch(markAllRead())
}

className="
text-sm
text-orange-500
"

>

Read all

</button>


</div>





<div
className="
max-h-96
overflow-y-auto
"
>


{
notifications.map(item=>(


<div

key={item.id}

onClick={()=>
dispatch(
markAsRead(item.id)
)
}

className={`

p-4
border-b
cursor-pointer

${

item.read
?

"bg-white"

:

"bg-orange-50"

}

`}

>


<p className="font-semibold">

{item.title}

</p>


<p className="text-sm text-slate-500">

{item.message}

</p>


<span className="text-xs text-slate-400">

{item.time}

</span>


</div>


))

}



</div>


</div>

);


}