import {
  motion
} from "framer-motion";


import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Activity,
  CreditCard,
} from "lucide-react";



const DEFAULT_DATA = {

  cashInflow: 4250000,

  expenses: 1920000,

  netCash: 2330000,

  healthScore: 92,

  healthStatus: "Stable Growth",


  monthly: [

    {
      month:"Jan",
      income:18,
      expense:9
    },

    {
      month:"Feb",
      income:22,
      expense:11
    },

    {
      month:"Mar",
      income:26,
      expense:13
    },

    {
      month:"Apr",
      income:30,
      expense:15
    },

    {
      month:"May",
      income:35,
      expense:17
    },

    {
      month:"Jun",
      income:42,
      expense:19
    }

  ]

};





const formatCurrency = (value)=>{


const amount =
Number(value) || 0;



if(amount >= 10000000){

return (
`₹${(amount / 10000000).toFixed(1)}Cr`
);

}



return (
`₹${(amount / 100000).toFixed(1)}L`
);


};








export default function CashFlowWidget({
  data
}){


const cashFlow = {

...DEFAULT_DATA,

...(data || {}),

monthly:
data?.monthly || DEFAULT_DATA.monthly

};





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
border-slate-200
dark:border-slate-800
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
"
>


<div>


<h2
className="
text-xl
font-black
text-slate-900
dark:text-white
"
>

Cash Flow Analytics

</h2>


<p
className="
text-sm
text-slate-500
"
>

Financial performance overview

</p>


</div>





<div
className="
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
"
>


<Wallet size={24}/>


</div>


</div>










{/* KPI CARDS */}


<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-4
"
>


<MetricCard

title="Cash Inflow"

value={cashFlow.cashInflow}

Icon={ArrowUpRight}

style="green"

/>



<MetricCard

title="Expenses"

value={cashFlow.expenses}

Icon={ArrowDownRight}

style="red"

/>



<MetricCard

title="Net Cash"

value={cashFlow.netCash}

Icon={PiggyBank}

style="blue"

/>


</div>









{/* MONTHLY GRAPH */}



<div
className="
mt-8
rounded-3xl
bg-slate-100
dark:bg-slate-800
p-6
"
>


<div
className="
flex
items-end
justify-between
h-44
gap-3
"
>


{

cashFlow.monthly.map(
(item,index)=>(


<div
key={index}
className="
flex
flex-col
items-center
flex-1
gap-2
"
>


<div
className="
flex
items-end
gap-2
h-32
"
>


<motion.div

initial={{
height:0
}}

animate={{
height:`${item.income * 3}px`
}}

transition={{
duration:.7,
delay:index*.1
}}


className="
w-3
rounded-full
bg-green-500
"

/>





<motion.div

initial={{
height:0
}}

animate={{
height:`${item.expense * 3}px`
}}

transition={{
duration:.7,
delay:index*.1
}}


className="
w-3
rounded-full
bg-red-500
"

/>



</div>




<span
className="
text-xs
text-slate-500
"
>

{item.month}

</span>


</div>


)

)

}


</div>





<div
className="
flex
justify-center
gap-6
mt-5
text-xs
"
>


<Legend
color="bg-green-500"
text="Income"
/>


<Legend
color="bg-red-500"
text="Expense"
/>



</div>



</div>









{/* HEALTH */}


<div

className="
mt-6
rounded-3xl
bg-gradient-to-r
from-green-600
to-emerald-600
p-6
text-white
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


<div
className="
flex
items-center
gap-2
text-sm
"
>


<Activity size={18}/>

Financial Health Score


</div>





<h3
className="
text-4xl
font-black
mt-2
"
>


{
Number(
cashFlow.healthScore
)
}


<span>
/100
</span>


</h3>



</div>







<div
className="
text-right
"
>


<CreditCard size={36}/>


<p
className="
text-sm
mt-2
"
>

{
String(
cashFlow.healthStatus
)
}

</p>


</div>



</div>







<div

className="
mt-5
h-3
bg-white/20
rounded-full
overflow-hidden
"

>


<motion.div

initial={{
width:0
}}

animate={{
width:`${cashFlow.healthScore}%`
}}

transition={{
duration:1
}}

className="
h-full
bg-white
rounded-full
"

/>



</div>



</div>







</motion.section>


);


}









function MetricCard({

title,

value,

Icon,

style

}){


const styles = {


green:
"bg-green-50 text-green-600 dark:bg-green-900/20",


red:
"bg-red-50 text-red-600 dark:bg-red-900/20",


blue:
"bg-blue-50 text-blue-600 dark:bg-blue-900/20"


};





return (

<div

className={`
rounded-2xl
p-5
${styles[style]}
`}

>


<div
className="
flex
items-center
gap-3
"
>


<Icon size={22}/>


<div>


<p
className="
text-xs
opacity-70
"
>

{title}

</p>



<h3
className="
text-xl
font-black
dark:text-white
"
>

{formatCurrency(value)}

</h3>



</div>



</div>


</div>


);

}









function Legend({

color,

text

}){


return (

<div
className="
flex
items-center
gap-2
"
>


<span
className={`
h-3
w-3
rounded-full
${color}
`}
/>


{text}


</div>

);


}