import {
Calendar,
Download
}
from "lucide-react";


export default function DashboardFilters(){


return (

<div
className="
flex
flex-col
md:flex-row
justify-between
gap-4
bg-white
p-5
rounded-3xl
border
border-slate-200
shadow-sm
"
>


<div>

<h1
className="
text-3xl
font-black
text-slate-900
"
>

Analytics Overview

</h1>

<p
className="
text-slate-500
mt-1
"
>

Track Xllent Foods performance

</p>

</div>



<div
className="
flex
gap-3
"
>


<button
className="
flex
items-center
gap-2
px-4
py-3
rounded-xl
bg-slate-100
font-semibold
"
>

<Calendar size={18}/>

Last 30 Days

</button>



<button
className="
flex
items-center
gap-2
px-4
py-3
rounded-xl
bg-orange-500
text-white
font-semibold
"
>

<Download size={18}/>

Export

</button>


</div>


</div>

)

}