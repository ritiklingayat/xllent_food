import KPICardSkeleton
from "./KPICardSkeleton";



export default function DashboardSkeleton(){


return (

<div
className="
space-y-8
"
>


{/* KPI */}

<div
className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
"
>


{
Array.from({
length:4
})
.map((_,index)=>(


<KPICardSkeleton
key={index}
/>


))

}


</div>




{/* Charts */}

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
"
>


<div
className="
h-96
rounded-3xl
bg-slate-200
animate-pulse
"
/>


<div
className="
h-96
rounded-3xl
bg-slate-200
animate-pulse
"
/>


</div>





{/* Table */}

<div
className="
h-72
rounded-3xl
bg-slate-200
animate-pulse
"
/>



</div>

)

}