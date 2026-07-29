import {
motion
}
from "framer-motion";


import AnimatedCounter
from "./AnimatedCounter";



export default function PremiumStatCard({

title,

value,

icon:Icon,

trend,

trendType="success",

prefix="₹",

description

}){


return (

<motion.div


whileHover={{
y:-6
}}


transition={{
duration:.25
}}


className="
relative
overflow-hidden
rounded-3xl
bg-white
border
border-slate-200
p-6
shadow-sm
hover:shadow-xl
"


>


{/* Glow */}

<div
className="
absolute
right-0
top-0
h-32
w-32
rounded-full
bg-orange-100
blur-3xl
"
/>



<div
className="
relative
flex
items-start
justify-between
"
>


<div>


<p
className="
text-sm
font-semibold
text-slate-500
"
>

{title}

</p>


<h2
className="
mt-3
text-3xl
font-black
text-slate-900
"
>


<AnimatedCounter

value={value}

prefix={prefix}

/>


</h2>


<p
className="
mt-2
text-xs
text-slate-400
"
>

{description}

</p>


</div>





<div
className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-orange-500
to-red-500
flex
items-center
justify-center
text-white
shadow-lg
"
>

<Icon size={26}/>


</div>


</div>





<div
className="
mt-6
flex
items-center
justify-between
"
>


<span

className={`

text-xs

font-bold

px-3

py-1

rounded-full


${
trendType==="success"

?

"bg-green-100 text-green-700"

:

"bg-blue-100 text-blue-700"

}

`}

>

{trend}

</span>



<span
className="
text-xs
text-slate-400
"
>

vs last month

</span>


</div>



</motion.div>

);


}