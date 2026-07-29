import {motion} from "framer-motion";

import {
ResponsiveContainer,
AreaChart,
Area,
XAxis,
YAxis,
Tooltip
}
from "recharts";


import {
BrainCircuit
}
from "lucide-react";


import {
aiRevenuePrediction
}
from "../../data/aiMockData";



const AIRevenuePrediction=()=>{


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

className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
border-slate-200
dark:border-slate-800
shadow-xl
p-6
"


>


<div className="
flex
gap-3
items-center
mb-5
">


<div className="
p-3
rounded-2xl
bg-indigo-600
text-white
">

<BrainCircuit/>

</div>


<div>

<h2 className="
text-xl
font-bold
text-slate-900
dark:text-white
">

AI Revenue Prediction

</h2>


<p className="
text-sm
text-slate-500
">

Next quarter forecast

</p>

</div>


</div>




<div className="
h-[300px]
">


<ResponsiveContainer
width="100%"
height="100%"
>


<AreaChart
data={aiRevenuePrediction}
>


<XAxis
dataKey="month"
/>


<YAxis/>


<Tooltip/>


<Area

dataKey="prediction"

stroke="#6366f1"

fill="#6366f1"

fillOpacity={0.25}

/>



</AreaChart>


</ResponsiveContainer>


</div>


</motion.section>

);

};


export default AIRevenuePrediction;