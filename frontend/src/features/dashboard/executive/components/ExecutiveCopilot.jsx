import {
  useState
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";


import {
  Sparkles,
  X,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Send,
  Bot,
  Minimize2
} from "lucide-react";




const AI_RESPONSES = [

{
icon:TrendingUp,
title:"Revenue Opportunity",
text:
"Premium categories are growing 18%. Consider increasing inventory allocation for high-performing products."
},


{
icon:AlertTriangle,
title:"Inventory Warning",
text:
"Chicken and frozen products may require replenishment within 7 days."
},


{
icon:Lightbulb,
title:"Growth Recommendation",
text:
"Customer retention campaigns can improve repeat purchases by targeting premium buyers."
}

];






export default function ExecutiveCopilot(){

const [open,setOpen]=useState(false);

const [minimize,setMinimize]=useState(false);



return (

<>


{/* Floating AI Button */}


<motion.button


initial={{
scale:0
}}


animate={{
scale:1
}}


whileHover={{
scale:1.08
}}


onClick={()=>setOpen(true)}


className="
fixed
bottom-8
right-8
z-50
h-16
w-16
rounded-full
bg-gradient-to-br
from-indigo-600
via-purple-600
to-pink-600
text-white
shadow-2xl
flex
items-center
justify-center
"

>


<Sparkles size={28}/>


</motion.button>







<AnimatePresence>


{

open &&


<motion.div


initial={{
opacity:0,
y:40
}}


animate={{
opacity:1,
y:0
}}


exit={{
opacity:0,
y:40
}}


className="

fixed

bottom-28

right-8

z-50

w-[380px]

max-w-[90vw]

rounded-3xl

overflow-hidden

border

border-white/20

bg-white/90

dark:bg-slate-950/90

backdrop-blur-xl

shadow-2xl

"


>


{/* Header */}


<div

className="

flex

items-center

justify-between

px-6

py-5

bg-gradient-to-r

from-indigo-600

to-purple-600

text-white

"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
h-10
w-10
rounded-xl
bg-white/20
flex
items-center
justify-center
"

>

<BrainCircuit size={22}/>

</div>


<div>

<h3 className="font-bold">

Executive AI Copilot

</h3>


<p className="text-xs opacity-80">

Business Intelligence Assistant

</p>


</div>


</div>






<div className="flex gap-2">


<button

onClick={()=>setMinimize(!minimize)}

className="
p-2
rounded-lg
hover:bg-white/20
"

>


<Minimize2 size={17}/>


</button>



<button

onClick={()=>setOpen(false)}

className="
p-2
rounded-lg
hover:bg-white/20
"

>

<X size={18}/>

</button>


</div>



</div>







{

!minimize &&


<div className="p-5">


<div

className="

flex

items-center

gap-3

mb-5

rounded-2xl

bg-indigo-50

dark:bg-indigo-900/30

p-4

"

>


<Bot

className="text-indigo-600"

size={25}

/>


<p

className="
text-sm
text-slate-700
dark:text-slate-300
"

>

Hello Admin 👋
I analysed your business data. Here are today's insights.

</p>


</div>







<div className="space-y-4">


{

AI_RESPONSES.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div


key={index}


initial={{
opacity:0,
x:20
}}


animate={{
opacity:1,
x:0
}}


transition={{
delay:index*0.1
}}



className="

rounded-2xl

bg-slate-100

dark:bg-slate-800

p-4

"

>


<div

className="
flex
gap-3
"

>


<div

className="
h-9
w-9
rounded-xl
bg-gradient-to-br
from-indigo-500
to-purple-600
text-white
flex
items-center
justify-center
"

>


<Icon size={18}/>


</div>





<div>

<h4

className="
font-semibold
dark:text-white
"

>

{item.title}

</h4>


<p

className="
text-sm
text-slate-500
dark:text-slate-400
mt-1
"

>

{item.text}

</p>


</div>


</div>


</motion.div>


)


})

}


</div>







<div

className="
mt-5
flex
items-center
gap-3
rounded-2xl
border
border-slate-200
dark:border-slate-700
px-4
py-3
"

>


<input

placeholder="
Ask AI about sales, revenue...
"

className="
flex-1
bg-transparent
outline-none
text-sm
dark:text-white
"

/>


<button

className="
h-9
w-9
rounded-xl
bg-indigo-600
text-white
flex
items-center
justify-center
"

>


<Send size={16}/>


</button>


</div>




</div>


}


</motion.div>


}


</AnimatePresence>


</>

)

}