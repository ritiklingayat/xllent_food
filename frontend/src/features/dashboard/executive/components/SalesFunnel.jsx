import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  Cell,
} from "recharts";

import {
  Filter,
  TrendingDown,
  Users,
  ShoppingCart,
  Target,
} from "lucide-react";



const defaultFunnelData = [

  {
    name:"Visitors",
    value:12000,
  },

  {
    name:"Product Views",
    value:8500,
  },

  {
    name:"Cart Added",
    value:5200,
  },

  {
    name:"Checkout",
    value:3200,
  },

  {
    name:"Orders",
    value:2100,
  },

];





const funnelColors = [

  "#2563eb",
  "#4f46e5",
  "#7c3aed",
  "#9333ea",
  "#10b981",

];






const formatNumber = (value)=>{

  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);

};






function CustomTooltip({
  active,
  payload
})
{

  if(
    !active ||
    !payload ||
    !payload.length
  )
  {
    return null;
  }



  const item = payload[0].payload;



  return (

    <div
      className="
      rounded-2xl
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-700
      shadow-xl
      p-4
      "
    >

      <p
        className="
        font-bold
        text-slate-900
        dark:text-white
        "
      >

        {item.name}

      </p>


      <p
        className="
        text-purple-600
        font-semibold
        mt-1
        "
      >

        {formatNumber(item.value)}

      </p>


    </div>

  );

}







export default function SalesFunnel({

  data = defaultFunnelData

})

{


const visitors =
data?.[0]?.value || 0;



const orders =
data?.[data.length-1]?.value || 0;




const conversion =
visitors
?
((orders / visitors)*100).toFixed(1)
:
0;





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
from-purple-600
to-indigo-600
text-white
flex
items-center
justify-center
shadow-lg
"
>

<Filter size={24}/>

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

Sales Funnel

</h2>


<p
className="
text-sm
text-slate-500
dark:text-slate-400
"
>

Customer journey conversion

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
bg-green-50
dark:bg-green-900/30
text-green-600
font-semibold
"
>

<Target size={18}/>

{conversion}%

</div>



</div>







{
data.length === 0 ?

(

<div
className="
h-[320px]
flex
flex-col
items-center
justify-center
text-slate-500
"
>

<Users size={40}/>

<p className="mt-3">

No funnel data available

</p>


</div>

)

:

(


<div
className="
h-[320px]
"
>


<ResponsiveContainer
width="100%"
height="100%"
>


<FunnelChart>


<Tooltip
content={<CustomTooltip/>}
/>


<Funnel

dataKey="value"

data={data}

isAnimationActive


>


<LabelList

position="right"

fill="currentColor"

dataKey="name"

/>


{

data.map(
(item,index)=>(

<Cell

key={item.name}

fill={
funnelColors[index % funnelColors.length]
}

/>

)

)

}



</Funnel>


</FunnelChart>


</ResponsiveContainer>


</div>

)

}








{/* Summary Metrics */}


<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-4
mt-6
"
>



<div
className="
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
flex
items-center
gap-3
"
>

<Users
className="text-blue-600"
/>


<div>

<p
className="
text-xs
text-slate-500
"
>

Visitors

</p>


<p
className="
font-bold
dark:text-white
"
>

{formatNumber(visitors)}

</p>


</div>


</div>





<div
className="
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
flex
items-center
gap-3
"
>


<ShoppingCart
className="text-purple-600"
/>


<div>

<p
className="
text-xs
text-slate-500
"
>

Orders

</p>


<p
className="
font-bold
dark:text-white
"
>

{formatNumber(orders)}

</p>


</div>


</div>





<div
className="
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
flex
items-center
gap-3
"
>


<TrendingDown
className="text-orange-500"
/>


<div>

<p
className="
text-xs
text-slate-500
"
>

Drop Off

</p>


<p
className="
font-bold
dark:text-white
"
>

{(100-conversion).toFixed(1)}%

</p>


</div>


</div>




</div>







</motion.section>


);

}