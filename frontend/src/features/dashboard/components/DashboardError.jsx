import {
AlertTriangle,
RefreshCcw
}
from "lucide-react";



export default function DashboardError({

message,

onRetry

}){


return (

<div
className="
min-h-[400px]
flex
items-center
justify-center
"
>


<div
className="
max-w-md
rounded-3xl
border
border-red-200
bg-red-50
p-8
text-center
shadow-lg
"
>


<div
className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-red-500
text-white
"
>

<AlertTriangle/>

</div>




<h2
className="
mt-5
text-xl
font-black
text-slate-900
"
>

Dashboard unavailable

</h2>



<p
className="
mt-3
text-sm
text-slate-600
"
>

{
message ||
"Unable to load dashboard data"
}

</p>



<button

onClick={onRetry}

className="
mt-6
flex
mx-auto
items-center
gap-2
rounded-xl
bg-red-500
px-5
py-3
font-bold
text-white
shadow-lg
hover:bg-red-600
transition
"

>

<RefreshCcw size={18}/>


Try Again


</button>


</div>


</div>

)

}