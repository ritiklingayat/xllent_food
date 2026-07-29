import {
  motion
} from "framer-motion";


import {
  ShieldCheck,
  Users,
  Package,
  ShoppingCart,
  Warehouse,
  Bell,
  TrendingUp,
  ArrowRight
} from "lucide-react";





const defaultStats = [

{
title:"Orders",
value:"1,245",
icon:ShoppingCart,
gradient:"from-blue-600 to-indigo-600"
},


{
title:"Inventory",
value:"8,540",
icon:Warehouse,
gradient:"from-green-500 to-emerald-600"
},


{
title:"Products",
value:"324",
icon:Package,
gradient:"from-purple-600 to-pink-600"
},


{
title:"Users",
value:"86",
icon:Users,
gradient:"from-orange-500 to-red-600"
}

];








export default function RoleDashboardLayout({

role="Dashboard",

description="Business management portal",

stats=defaultStats,

quickActions=[],

activities=[],

children

}){


return (


<div


className="
min-h-screen

bg-gradient-to-br

from-slate-50

via-blue-50

to-purple-50


dark:from-slate-950

dark:via-slate-900

dark:to-indigo-950


p-4

md:p-6

space-y-8

"

>



{/* HEADER */}


<motion.div


initial={{
opacity:0,
y:-20
}}


animate={{
opacity:1,
y:0
}}


className="

rounded-3xl

bg-white/70

dark:bg-slate-900/70

backdrop-blur-xl

border

border-white/30

dark:border-slate-800

shadow-xl

p-6

flex

flex-col

md:flex-row

justify-between

gap-5

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

h-16

w-16

rounded-3xl

bg-gradient-to-br

from-blue-600

to-indigo-600

flex

items-center

justify-center

text-white

shadow-xl

"


>


<ShieldCheck size={32}/>


</div>





<div>


<h1

className="

text-3xl

font-black

text-slate-900

dark:text-white

"

>

{role}

</h1>



<p

className="

text-sm

text-slate-500

dark:text-slate-400

mt-1

"

>

{description}

</p>



</div>


</div>







<div

className="

flex

items-center

gap-3

px-5

py-3

rounded-2xl

bg-blue-50

dark:bg-blue-900/30

text-blue-600

font-semibold

"

>


<Bell size={18}/>

Notifications


</div>



</motion.div>









{/* KPI CARDS */}



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

stats.map((item,index)=>{


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



whileHover={{

y:-6

}}



className="

relative

overflow-hidden

rounded-3xl

bg-white/80

dark:bg-slate-900/80

backdrop-blur-xl

border

border-white/30

dark:border-slate-800

shadow-xl

p-6

"


>



<div


className={`

h-12

w-12

rounded-2xl

bg-gradient-to-br

${item.gradient}

flex

items-center

justify-center

text-white

shadow-lg

mb-5

`}

>


<Icon size={24}/>


</div>





<p

className="

text-sm

text-slate-500

dark:text-slate-400

"

>

{item.title}

</p>



<h2

className="

text-3xl

font-black

text-slate-900

dark:text-white

mt-1

"

>

{item.value}

</h2>






<div

className="

absolute

right-0

top-0

h-32

w-32

rounded-full

bg-blue-500/10

blur-3xl

"

/>



</motion.div>



)


})

}



</div>









{/* QUICK ACTIONS */}



{

quickActions.length > 0 &&


<div>


<h2

className="

text-xl

font-bold

dark:text-white

mb-4

"

>

Quick Actions

</h2>



<div

className="

grid

grid-cols-1

md:grid-cols-3

gap-5

"

>


{

quickActions.map((item,index)=>(


<motion.button


key={index}


whileHover={{
scale:1.03
}}



className="

rounded-3xl

p-5

text-left

bg-white/80

dark:bg-slate-900/80

border

border-white/30

shadow-xl

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


<h3

className="
font-bold
dark:text-white
"

>

{item.title}

</h3>


<p

className="
text-sm
text-slate-500
mt-1
"

>

{item.description}

</p>


</div>




<ArrowRight

size={20}

/>


</div>


</motion.button>


))

}


</div>


</div>


}









{/* CUSTOM CONTENT */}



{

children

}









{/* ACTIVITY */}



{

activities.length > 0 &&


<div>


<h2

className="
text-xl
font-bold
dark:text-white
mb-4
"

>

Recent Activity

</h2>




<div

className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

border

border-white/30

shadow-xl

p-6

space-y-4

"

>


{

activities.map((item,index)=>(


<div


key={index}


className="

flex

items-center

justify-between

border-b

last:border-none

pb-3

"


>


<div>

<p

className="
font-semibold
dark:text-white
"

>

{item.title}

</p>


<p

className="
text-sm
text-slate-500
"

>

{item.time}

</p>


</div>




<TrendingUp

size={18}

className="
text-green-500
"

/>


</div>


))


}



</div>


</div>


}




</div>


);


}