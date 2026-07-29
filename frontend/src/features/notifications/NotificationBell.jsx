import {
Bell
}
from "lucide-react";


import {
useSelector
}
from "react-redux";



export default function NotificationBell(){



const unread =
useSelector(

state=>

state.notifications.unread

);




return (

<button

className="
relative
p-3
rounded-xl
bg-white
shadow
"


>


<Bell/>


{

unread>0 &&


<span

className="
absolute
-top-2
-right-2
bg-red-500
text-white
rounded-full
text-xs
px-2
"

>


{unread}


</span>


}



</button>

);


}