import {
  motion
} from "framer-motion";


import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  PieChart,
  Target,
  Sparkles
} from "lucide-react";




// --------------------------------------------------
// Profit Data
// --------------------------------------------------

const profitData = [

  {
    month:"Jan",
    margin:24,
    profit:8.5
  },


  {
    month:"Feb",
    margin:27,
    profit:10.2
  },


  {
    month:"Mar",
    margin:29,
    profit:12.8
  },


  {
    month:"Apr",
    margin:31,
    profit:14.5
  },


  {
    month:"May",
    margin:34,
    profit:16.8
  },


  {
    month:"Jun",
    margin:36,
    profit:18.5
  }

];






const costData = [

  {
    name:"Raw Material",
    value:"42%",
    color:
      "from-red-500 to-orange-500"
  },


  {
    name:"Operations",
    value:"28%",
    color:
      "from-blue-600 to-cyan-500"
  },


  {
    name:"Marketing",
    value:"18%",
    color:
      "from-purple-600 to-pink-500"
  },


  {
    name:"Logistics",
    value:"12%",
    color:
      "from-green-500 to-emerald-500"
  }

];







// --------------------------------------------------
// Component
// --------------------------------------------------

const ProfitMarginAnalytics = () => {


return (


<motion.section


initial={{
opacity:0,
y:30
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







{/* Header */}


<div

className="

flex

items-center

justify-between

mb-6

"

>


<div>


<h2

className="

text-xl

font-bold

dark:text-white

"

>

Profit Margin Analytics

</h2>



<p

className="

text-sm

text-slate-500


dark:text-slate-400

"

>

Profitability and cost intelligence

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

"

>


<PieChart size={25}/>


</div>



</div>









{/* KPI Cards */}



<div

className="

grid

grid-cols-1

md:grid-cols-4

gap-4

mb-8

"

>


<div

className="

rounded-2xl

bg-green-50


dark:bg-green-900/20


p-4

"

>


<div

className="

flex

gap-3

items-center

"

>


<TrendingUp

className="text-green-500"

/>



<div>


<p className="text-xs text-slate-500">

Gross Margin

</p>


<h3 className="font-bold text-xl dark:text-white">

36%

</h3>


</div>


</div>


</div>







<div

className="

rounded-2xl

bg-blue-50


dark:bg-blue-900/20


p-4

"

>


<div

className="

flex

gap-3

items-center

"

>


<DollarSign

className="text-blue-500"

/>



<div>


<p className="text-xs text-slate-500">

Net Profit

</p>


<h3 className="font-bold text-xl dark:text-white">

₹18.5L

</h3>


</div>


</div>


</div>







<div

className="

rounded-2xl

bg-purple-50


dark:bg-purple-900/20


p-4

"

>


<div

className="

flex

gap-3

items-center

"

>


<Percent

className="text-purple-500"

/>



<div>


<p className="text-xs text-slate-500">

Margin Growth

</p>


<h3 className="font-bold text-xl dark:text-white">

+12%

</h3>


</div>


</div>


</div>







<div

className="

rounded-2xl

bg-orange-50


dark:bg-orange-900/20


p-4

"

>


<div

className="

flex

gap-3

items-center

"

>


<Target

className="text-orange-500"

/>



<div>


<p className="text-xs text-slate-500">

Target

</p>


<h3 className="font-bold text-xl dark:text-white">

40%

</h3>


</div>


</div>


</div>



</div>









{/* Margin Trend */}



<div

className="

rounded-3xl


bg-slate-100


dark:bg-slate-800


p-5

"

>


<h3

className="

font-bold

dark:text-white

mb-5

"

>

6 Month Profit Margin Trend

</h3>





<div

className="

flex

items-end

justify-between


h-48

"

>


{
profitData.map(

(item,index)=>(


<div

key={
item.month
}

className="

flex

flex-col

items-center

gap-2

"

>


<motion.div


initial={{

height:0

}}


animate={{

height:`${item.margin * 4}px`

}}


transition={{

duration:1,

delay:index*0.1

}}



className="

w-8


rounded-t-xl


bg-gradient-to-t


from-green-600


to-emerald-400

"


/>



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



</div>









{/* Cost Analysis */}



<div

className="

mt-6


grid

grid-cols-1


lg:grid-cols-2


gap-6

"

>





<div

className="

rounded-3xl


bg-slate-100


dark:bg-slate-800


p-5

"

>


<h3

className="

font-bold

dark:text-white

mb-5

"

>

Cost Distribution

</h3>




<div

className="

space-y-4

"

>


{
costData.map(

(item,index)=>(


<div

key={
item.name
}

>


<div

className="

flex

justify-between

text-sm

mb-2

"

>


<span className="dark:text-white">

{item.name}

</span>


<span className="text-slate-500">

{item.value}

</span>


</div>





<div

className="

h-2

rounded-full


bg-slate-300


dark:bg-slate-700


overflow-hidden

"

>


<motion.div


initial={{

width:0

}}


animate={{

width:item.value

}}


transition={{

duration:1,

delay:index*0.1

}}



className={`

h-full


rounded-full


bg-gradient-to-r


${item.color}

`}


/>


</div>



</div>


)

)

}



</div>



</div>









{/* AI Profit Insight */}



<div

className="

rounded-3xl


bg-gradient-to-br


from-green-600


to-emerald-600


p-6


text-white

"

>


<div

className="

flex

gap-3

items-center

mb-3

"

>


<Sparkles size={22}/>


<h3

className="

font-bold

"

>

AI Profit Recommendation

</h3>


</div>




<p

className="

text-sm

opacity-90

"

>

Optimizing raw material costs by 8%
could increase net profit by approximately ₹3.2L monthly.

</p>





</div>







</div>






</motion.section>


);


};



export default ProfitMarginAnalytics;