import {
ShoppingCart
}
from "lucide-react";


import {
liveOrders
}
from "./realtimeMockData";


const LiveOrderStream=()=>{


return (

<section className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
border-slate-200
dark:border-slate-800
p-6
shadow-xl
">


<div className="
flex
gap-3
items-center
mb-5
">

<ShoppingCart
className="text-blue-600"
/>

<h2 className="
text-xl
font-bold
dark:text-white
">

Live Orders

</h2>

</div>



<div className="
space-y-4
">

{
liveOrders.map(order=>(

<div

key={order.id}

className="
p-4
rounded-2xl
bg-slate-100
dark:bg-slate-800
"

>


<div className="
flex
justify-between
">

<b className="dark:text-white">
{order.id}
</b>

<span className="
text-green-500
text-sm
">

{order.status}

</span>

</div>


<p className="
text-sm
text-slate-500
">

{order.customer}

</p>


<p className="
font-semibold
dark:text-white
">

{order.amount}

</p>


</div>


))

}

</div>


</section>


);


};


export default LiveOrderStream;