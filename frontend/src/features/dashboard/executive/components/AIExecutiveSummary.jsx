import { motion } from "framer-motion";

import {
  Sparkles,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  ArrowUpRight,
  Target,
  CheckCircle,
} from "lucide-react";



const DEFAULT_INSIGHTS = [

{
id:1,

title:"Revenue Growth Opportunity",

description:
"Premium product categories are showing strong demand. Increasing inventory allocation can improve monthly revenue.",

priority:"high",

icon:TrendingUp,

gradient:
"from-green-500 to-emerald-600",

},


{
id:2,

title:"Inventory Risk Detected",

description:
"Fast-moving products may require replenishment within the next 7 days to avoid sales loss.",

priority:"medium",

icon:AlertTriangle,

gradient:
"from-orange-500 to-red-500",

},


{
id:3,

title:"Customer Retention Strategy",

description:
"Premium customers contribute significant revenue. Loyalty campaigns can improve repeat purchases.",

priority:"low",

icon:Lightbulb,

gradient:
"from-purple-600 to-pink-500",

},

];







const PRIORITY_STYLE = {


high:
"text-green-600 bg-green-100 dark:bg-green-900/30",


medium:
"text-orange-600 bg-orange-100 dark:bg-orange-900/30",


low:
"text-purple-600 bg-purple-100 dark:bg-purple-900/30",


};









export default function AIExecutiveSummary({

insights,

healthScore=94,

accuracy=94,

}){



const safeInsights =

Array.isArray(insights)

&&

insights.length

?

insights

:

DEFAULT_INSIGHTS;





const safeHealth =

Number(healthScore) || 0;



const safeAccuracy =

Number(accuracy) || 0;






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



<div

className="
flex
justify-between
items-center
mb-6
gap-4
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
from-indigo-600
to-purple-600
flex
items-center
justify-center
text-white
shadow-lg
"

>


<BrainCircuit size={25}/>


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

AI Executive Summary

</h2>



<p

className="
text-sm
text-slate-500
dark:text-slate-400
"

>

AI powered business intelligence

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
rounded-full
bg-green-100
dark:bg-green-900/30
text-green-600
font-semibold
"

>


<Sparkles size={16}/>


{safeAccuracy}% Accuracy


</div>



</div>









{/* HEALTH SCORE */}



<div

className="
rounded-3xl
bg-gradient-to-r
from-indigo-600
to-purple-600
p-6
text-white
mb-6
"

>


<div

className="
flex
justify-between
items-center
"

>


<div>


<p

className="
text-sm
opacity-80
"

>

Overall Business Health

</p>



<h3

className="
text-4xl
font-black
mt-2
"

>

{safeHealth}

/100


</h3>



</div>






<Target size={45}/>


</div>








<div

className="
mt-5
h-3
rounded-full
bg-white/20
overflow-hidden
"

>


<motion.div

initial={{
width:0
}}

animate={{

width:`${safeHealth}%`

}}

transition={{
duration:1
}}

className="
h-full
rounded-full
bg-white
"

/>


</div>


</div>









{/* INSIGHTS */}



<div

className="
space-y-4
"

>


{


safeInsights.map(

(item,index)=>{


const Icon =

item.icon || Lightbulb;



return (


<motion.div


key={
item.id || index
}


initial={{
opacity:0,
x:20
}}


animate={{
opacity:1,
x:0
}}


transition={{
delay:index*.1
}}


className="
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-5
"

>



<div

className="
flex
gap-4
"

>



<div

className={`

h-12

w-12

rounded-xl

bg-gradient-to-br

${item.gradient || "from-blue-500 to-indigo-600"}

flex

items-center

justify-center

text-white

shadow-md

`}

>


<Icon size={22}/>


</div>








<div className="flex-1">



<div

className="
flex
justify-between
items-start
"

>


<h3

className="
font-semibold
dark:text-white
"

>


{
item.title ||
"AI Insight"
}


</h3>



<ArrowUpRight size={18}/>



</div>







<p

className="
text-sm
text-slate-500
dark:text-slate-400
mt-2
"

>


{
item.description ||
"No description available."
}


</p>








<span

className={`

inline-flex

mt-3

px-3

py-1

rounded-full

text-xs

font-semibold

${

PRIORITY_STYLE[
item.priority
]
||

PRIORITY_STYLE.low

}

`}

>


{
(
item.priority ||
"low"
)
.toUpperCase()

}



</span>



</div>




</div>




</motion.div>


);


}


)


}



</div>









{/* AI RECOMMENDATION */}



<div

className="
mt-6
rounded-2xl
border
border-indigo-200
dark:border-indigo-800
bg-indigo-50
dark:bg-indigo-900/20
p-5
flex
gap-4
"

>



<ShieldCheck

size={30}

className="
text-indigo-600
"

/>





<div>


<h3

className="
font-bold
dark:text-white
"

>

AI Recommendation

</h3>




<p

className="
text-sm
text-slate-600
dark:text-slate-300
mt-1
"

>

Optimize inventory forecasting, focus on premium customers, and expand high-performing regions for maximum growth.

</p>





<div

className="
flex
items-center
gap-2
mt-3
text-green-600
font-semibold
text-sm
"

>


<CheckCircle size={16}/>


AI Strategy Ready


</div>



</div>




</div>






</motion.section>


);


}