import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";


import {
  Users,
  Crown,
  UserPlus,
  UserCheck,
  TrendingUp,
} from "lucide-react";





const DEFAULT_DATA = [

{
name:"Premium",
customers:3500,
revenue:38
},

{
name:"Regular",
customers:4500,
revenue:42
},

{
name:"New",
customers:2000,
revenue:20
}

];





const COLORS=[

"#2563eb",
"#8b5cf6",
"#10b981"

];



const ICONS=[

Crown,
UserCheck,
UserPlus

];








export default function CustomerSegmentation({

data

}){


const customers = (

Array.isArray(data)

&&

data.length

?

data

:

DEFAULT_DATA

)

.map(item=>({

name:
item?.name || "Unknown",

customers:
Number(item?.customers ?? 0),

revenue:
Number(item?.revenue ?? 0)

}));






const totalRevenue = customers.reduce(

(sum,item)=>sum + item.revenue,

0

);







return (

<motion.section


initial={{
opacity:0,
y:25
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.5
}}



className="
rounded-3xl
border
border-white/20
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
shadow-xl
p-6
"


>






{/* HEADER */}


<div className="
flex
justify-between
items-center
mb-6
">


<div className="
flex
items-center
gap-4
">


<div className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-green-500
to-emerald-600
flex
items-center
justify-center
text-white
shadow-lg
">


<Users size={24}/>


</div>





<div>


<h2 className="
text-xl
font-black
dark:text-white
">

Customer Segmentation

</h2>


<p className="
text-sm
text-slate-500
">

AI customer intelligence

</p>


</div>


</div>






<div className="
px-4
py-2
rounded-xl
bg-green-100
text-green-700
font-bold
flex
items-center
gap-2
">


<TrendingUp size={18}/>

{totalRevenue}%


</div>


</div>









{/* CHART */}



<div className="
h-[320px]
"
>


<ResponsiveContainer
width="100%"
height="100%"
>


<PieChart>


<Pie

data={customers}

dataKey="customers"

nameKey="name"

innerRadius={75}

outerRadius={120}

paddingAngle={6}

>


{

customers.map(
(item,index)=>(


<Cell

key={item.name}

fill={
COLORS[
index % COLORS.length
]
}


/>


)

)

}


</Pie>



<Tooltip/>


<Legend/>


</PieChart>


</ResponsiveContainer>


</div>









{/* CARDS */}



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
mt-6
">


{

customers.map(
(item,index)=>{


const Icon =
ICONS[
index % ICONS.length
];



return (

<motion.div

key={item.name}

whileHover={{
y:-5
}}

className="
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
"

>


<div className="
flex
items-center
gap-3
">


<div

className="
h-10
w-10
rounded-xl
flex
items-center
justify-center
text-white
"

style={{

background:
COLORS[
index % COLORS.length
]

}}

>


<Icon size={20}/>


</div>




<div>


<p className="
text-xs
text-slate-500
">

{item.name}

</p>


<p className="
font-black
dark:text-white
">

{
item.customers.toLocaleString(
"en-IN"
)
}

</p>


</div>


</div>





<p className="
mt-3
text-sm
text-green-600
font-semibold
">

{item.revenue}% revenue contribution

</p>



</motion.div>


)

}

)

}



</div>







</motion.section>

);

}