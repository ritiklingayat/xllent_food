import {

ClipboardCheck,
Users,
ShoppingCart,
Target,
MapPin,
TrendingUp

} from "lucide-react";


import {

motion

} from "framer-motion";


import RoleDashboardLayout

from "./components/RoleDashboardLayout";





const KPI_DATA=[


{
title:"Daily Orders",
value:"32",
description:"Orders created",
icon:ShoppingCart,
gradient:"from-blue-600 to-indigo-600"
},


{
title:"Retailers Visited",
value:"18",
description:"Today's visits",
icon:Users,
gradient:"from-green-500 to-emerald-600"
},


{
title:"Sales Target",
value:"72%",
description:"Achievement",
icon:Target,
gradient:"from-purple-600 to-pink-600"
},


{
title:"Pending Tasks",
value:"6",
description:"Follow ups",
icon:ClipboardCheck,
gradient:"from-orange-500 to-red-500"
}


];






export default function SODashboard(){


return (

<RoleDashboardLayout

title="Sales Officer Dashboard"

subtitle="
Manage daily sales activities and retailer orders
"

>



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


className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
shadow-xl
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
mb-5
`}

>

<Icon/>

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








<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mt-8
"

>


<Card

icon={<ShoppingCart/>}

title="Create Order"

text="Place retailer orders"
/>



<Card

icon={<MapPin/>}

title="Field Visit"

text="Update customer visits"
/>




<Card

icon={<TrendingUp/>}

title="Performance"

text="View sales progress"
/>



</div>





</RoleDashboardLayout>

);

}








function Card({

icon,

title,

text

}){


return (

<div

className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
shadow-xl
p-6
"

>


<div className="
h-12
w-12
rounded-xl
bg-blue-600
text-white
flex
items-center
justify-center
mb-4
">

{icon}

</div>



<h3 className="
font-bold
dark:text-white
">

{title}

</h3>



<p className="
text-sm
text-slate-500
mt-2
">

{text}

</p>



</div>


)

}