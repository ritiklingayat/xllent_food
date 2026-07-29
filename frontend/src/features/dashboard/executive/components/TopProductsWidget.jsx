import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";


import {
  motion
} from "framer-motion";


import {
  TrendingUp
} from "lucide-react";




const productData = [

{
name:"Chicken",
sales:420
},

{
name:"Frozen Foods",
sales:360
},

{
name:"Snacks",
sales:280
},

{
name:"Ready Meals",
sales:220
},

{
name:"Beverages",
sales:180
}

];





export default function TopProductsWidget(){


return (

<motion.section


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:0.5
}}


className="
rounded-3xl
border
border-white/20
bg-white/70
dark:bg-slate-900/70
backdrop-blur-xl
shadow-xl
p-6
"


>


<div
className="
flex
items-center
gap-3
mb-6
"
>


<div
className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-blue-600
to-indigo-600
flex
items-center
justify-center
text-white
"
>

<TrendingUp size={22}/>


</div>



<div>

<h2
className="
text-xl
font-bold
dark:text-white
"
>

Top Performing Products

</h2>


<p
className="
text-sm
text-slate-500
"
>

Sales performance analytics

</p>


</div>


</div>





<div
className="
h-[320px]
"
>


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={productData}

>


<XAxis

dataKey="name"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="sales"

fill="#2563eb"

radius={[
10,
10,
0,
0
]}

/>


</BarChart>


</ResponsiveContainer>


</div>





</motion.section>

);


}