import {
Bell
}
from "lucide-react";


import data
from "../data/advancedDashboardData";


export default function NotificationPanel(){


return (

<div
className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"
>


<div
className="
flex
items-center
gap-3
mb-5
"
>

<Bell/>

<h3
className="
font-black
text-xl
"
>

Notifications

</h3>

</div>



{
data.notifications.map(
(item,index)=>(

<div

key={index}

className="
flex
gap-3
py-3
border-b
"

>


<div
className="
w-3
h-3
rounded-full
bg-orange-500
mt-2
"
/>


<div>

<p
className="
font-semibold
"
>

{item.title}

</p>


<span
className="
text-sm
text-slate-500
"
>

{item.time}

</span>


</div>


</div>


))
}



</div>

)

}