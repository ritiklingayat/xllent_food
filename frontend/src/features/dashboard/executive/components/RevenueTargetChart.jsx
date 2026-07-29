import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  TrendingUp,
  Target,
  AlertCircle,
} from "lucide-react";



const defaultData = [
  {
    month: "Jan",
    revenue: 450000,
    target: 500000,
  },
  {
    month: "Feb",
    revenue: 620000,
    target: 600000,
  },
  {
    month: "Mar",
    revenue: 780000,
    target: 750000,
  },
  {
    month: "Apr",
    revenue: 920000,
    target: 900000,
  },
  {
    month: "May",
    revenue: 1080000,
    target: 1000000,
  },
  {
    month: "Jun",
    revenue: 1245000,
    target: 1200000,
  },
];



const formatCurrency = (value = 0) => {

  if(value >= 10000000)
  {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }


  return `₹${(value / 100000).toFixed(1)}L`;

};




function CustomTooltip({
  active,
  payload,
})
{

  if(
    !active ||
    !payload ||
    payload.length === 0
  )
  {
    return null;
  }



  const data = payload[0].payload;



  return (

    <div
      className="
      rounded-2xl
      border
      border-slate-200
      dark:border-slate-700
      bg-white
      dark:bg-slate-900
      shadow-xl
      p-4
      min-w-[180px]
      "
    >


      <p
        className="
        font-bold
        text-slate-900
        dark:text-white
        mb-3
        "
      >
        {data.month}
      </p>


      <p
        className="
        text-blue-600
        font-medium
        "
      >
        Revenue:
        {" "}
        {formatCurrency(data.revenue)}
      </p>


      <p
        className="
        text-purple-600
        font-medium
        "
      >
        Target:
        {" "}
        {formatCurrency(data.target)}
      </p>


    </div>

  );

}




export default function RevenueTargetChart({
  data = defaultData,
  targetAchievement = "96%",
})
{


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
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
shadow-xl
p-6
"


>


{/* Header */}

<div
className="
flex
items-center
justify-between
mb-6
"
>


<div
className="
flex
items-center
gap-4
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
shadow-lg
"
>

<TrendingUp size={24}/>

</div>



<div>

<h2
className="
text-xl
font-bold
text-slate-900
dark:text-white
"
>

Revenue Growth

</h2>


<p
className="
text-sm
text-slate-500
dark:text-slate-400
"
>

Revenue vs business target

</p>


</div>


</div>




<div
className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-blue-50
dark:bg-blue-900/30
text-blue-600
font-semibold
"
>


<Target size={18}/>

{targetAchievement}


</div>


</div>






<div
className="
h-[350px]
"
>


<ResponsiveContainer
width="100%"
height="100%"
>


<AreaChart
data={data}
>


<CartesianGrid
strokeDasharray="5 5"
opacity={0.15}
/>



<XAxis
dataKey="month"
/>



<YAxis
tickFormatter={formatCurrency}
/>



<Tooltip
content={<CustomTooltip/>}
/>




<Area

type="monotone"

dataKey="target"

stroke="#9333ea"

fill="#9333ea"

fillOpacity={0.15}

/>



<Area

type="monotone"

dataKey="revenue"

stroke="#2563eb"

fill="#2563eb"

fillOpacity={0.25}

/>



</AreaChart>


</ResponsiveContainer>


</div>






{
data.length===0 &&

<div
className="
flex
items-center
gap-3
text-orange-500
"
>

<AlertCircle size={20}/>

No revenue data available

</div>

}



</motion.section>


);

}