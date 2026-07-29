import {
  motion
} from "framer-motion";


import {
  TrendingUp,
  CalendarDays,
  Sparkles
} from "lucide-react";



const FORECAST_DATA=[

{
month:"Aug",
value:"₹15.2L"
},

{
month:"Sep",
value:"₹17.8L"
},

{
month:"Oct",
value:"₹21.4L"
},

{
month:"Nov",
value:"₹24.6L"
}

];



const RevenueForecast=()=>{


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
border
border-white/20
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
shadow-xl
p-6
"


>


<div className="
flex
justify-between
items-center
mb-6
">


<div>

<h2 className="
text-xl
font-bold
dark:text-white
flex
items-center
gap-2
">

<TrendingUp
className="text-green-500"
/>

Revenue Forecast


</h2>


<p className="
text-sm
text-slate-500
">

AI predicted next quarter growth

</p>


</div>



<Sparkles
className="text-purple-500"
/>


</div>






<div className="
grid
grid-cols-2
gap-4
">


{

FORECAST_DATA.map(item=>(


<div

key={item.month}

className="
rounded-2xl
p-4
bg-slate-100
dark:bg-slate-800
"


>


<div className="
flex
items-center
gap-2
text-xs
text-slate-500
">


<CalendarDays size={14}/>

{item.month}


</div>


<p className="
mt-2
text-2xl
font-black
dark:text-white
">

{item.value}

</p>



<span className="
text-xs
text-green-500
font-semibold
">

+18% Growth


</span>



</div>


))


}


</div>



</motion.section>

);


};



export default RevenueForecast;