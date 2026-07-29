import {

Package,
ShoppingCart,
Wallet,
Users

}

from "lucide-react";


import GlassCard
from "./GlassCard";


import AnimatedCounter
from "./AnimatedCounter";


const icons={

products:Package,

orders:ShoppingCart,

revenue:Wallet,

customers:Users

};


export default function AnalyticsCard({

title,

value,

type,

growth

}){


const Icon =
icons[type];



return (

<GlassCard>


<div
className="
p-6
relative
overflow-hidden
"
>


<div
className="
absolute
right-0
top-0
w-32
h-32
bg-orange-200/30
rounded-full
blur-3xl
"
/>



<div
className="
flex
justify-between
items-start
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
text-4xl
font-black
mt-3
text-slate-900
"
>

<AnimatedCounter

value={value}

/>

</h2>



<div
className="
mt-3
inline-flex
items-center
rounded-full
bg-green-100
text-green-700
px-3
py-1
text-xs
font-bold
"
>

↑ {growth}% Growth

</div>


</div>



<div
className="
w-16
h-16
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

<Icon
size={30}
/>


</div>


</div>


</div>


</GlassCard>

)

}