import {
  Users,
  Target,
  TrendingUp,
  MapPin,
  ShoppingCart,
  ClipboardList,
  Activity,
} from "lucide-react";


import {
  motion
} from "framer-motion";


import RoleDashboardLayout
from "./components/RoleDashboardLayout";





const KPI_DATA = [

{
title:"Assigned Distributors",
value:"24",
description:"Active network",
icon:Users,
gradient:"from-blue-600 to-indigo-600"
},


{
title:"Monthly Target",
value:"₹35L",
description:"Sales target",
icon:Target,
gradient:"from-purple-600 to-pink-600"
},


{
title:"Achievement",
value:"86%",
description:"Target completed",
icon:TrendingUp,
gradient:"from-green-500 to-emerald-600"
},


{
title:"Market Visits",
value:"42",
description:"This month",
icon:MapPin,
gradient:"from-orange-500 to-red-500"
}

];






const SALES_ACTIVITY=[

{
title:"Distributor Order Generated",
value:"₹2.8L",
time:"Today"
},

{
title:"New Retailer Added",
value:"12 Retailers",
time:"Yesterday"
},

{
title:"Target Progress Updated",
value:"86%",
time:"2 days ago"
}

];







export default function ASMDashboard(){


return (

<RoleDashboardLayout

title="ASM Dashboard"

subtitle="
Manage area sales performance and distributor network
"

>


{/* KPI CARDS */}


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

KPI_DATA.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div


key={item.title}


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index*0.1
}}


whileHover={{
y:-5
}}



className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
border-white/30
shadow-xl
backdrop-blur-xl
p-6
"

>


<div

className={`
h-14
w-14
rounded-2xl
bg-gradient-to-br
${item.gradient}
text-white
flex
items-center
justify-center
shadow-lg
mb-5
`}

>

<Icon size={26}/>

</div>




<p className="
text-sm
text-slate-500
">

{item.title}

</p>



<h2 className="
text-3xl
font-black
dark:text-white
mt-2
">

{item.value}

</h2>



<p className="
text-xs
text-slate-500
mt-2
">

{item.description}

</p>



</motion.div>

)


})

}


</div>









{/* SALES MANAGEMENT */}



<div

className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
mt-8
"

>


<div

className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
shadow-xl
border
border-white/30
p-6
"

>


<h2 className="
text-xl
font-bold
dark:text-white
mb-5
">

Sales Management

</h2>



<div className="
space-y-4
">


<Action

icon={<ShoppingCart/>}

title="Distributor Orders"

text="View incoming orders"
/>



<Action

icon={<ClipboardList/>}

title="Sales Reports"

text="Analyze performance"
/>



<Action

icon={<MapPin/>}

title="Field Visits"

text="Track market visits"
/>



</div>


</div>







<div

className="
rounded-3xl
bg-gradient-to-br
from-indigo-600
to-purple-600
text-white
p-6
shadow-xl
"

>


<div className="
flex
items-center
gap-3
">

<Activity/>

<h2 className="
text-xl
font-bold
">

Sales Activity

</h2>


</div>





<div className="
mt-5
space-y-4
">


{

SALES_ACTIVITY.map(item=>(


<div

key={item.title}

className="
rounded-2xl
bg-white/10
p-4
"

>


<p className="font-semibold">

{item.title}

</p>


<p className="
text-sm
opacity-80
">

{item.value} • {item.time}

</p>


</div>


))

}



</div>


</div>




</div>





</RoleDashboardLayout>

);

}








function Action({

icon,

title,

text

}){


return (

<div

className="
flex
gap-4
items-center
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
"

>


<div

className="
h-10
w-10
rounded-xl
bg-blue-600
text-white
flex
items-center
justify-center
"

>

{icon}

</div>


<div>

<h3 className="
font-bold
dark:text-white
">

{title}

</h3>


<p className="
text-sm
text-slate-500
">

{text}

</p>


</div>


</div>


)

}