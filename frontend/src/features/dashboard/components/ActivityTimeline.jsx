import data
from "../data/advancedDashboardData";


export default function ActivityTimeline(){


return (

<div
className="
bg-white
rounded-3xl
border
p-6
"
>


<h3
className="
font-black
text-xl
mb-6
"
>

Recent Activity

</h3>


<div
className="
space-y-5
"
>


{
data.activities.map(
(item,index)=>(


<div
key={index}
className="
flex
gap-4
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

<p>

<strong>
{item.user}
</strong>

{" "}

{item.action}

</p>


<p
className="
text-sm
text-slate-500
"
>

{item.time}

</p>


</div>


</div>


))
}


</div>


</div>

)

}