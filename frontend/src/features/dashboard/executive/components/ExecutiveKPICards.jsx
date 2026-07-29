import { motion } from "framer-motion";

import {
  IndianRupee,
  ShoppingCart,
  Users,
  TrendingUp,
  PackageCheck,
  Wallet,
} from "lucide-react";


const KPI_DATA = [

{
title:"Total Revenue",
value:"₹48.6 L",
growth:"+18.5%",
description:"vs last month",
icon:IndianRupee
},


{
title:"Total Orders",
value:"12,458",
growth:"+12.2%",
description:"monthly orders",
icon:ShoppingCart
},


{
title:"Active Customers",
value:"8,942",
growth:"+8.4%",
description:"registered buyers",
icon:Users
},


{
title:"Profit Margin",
value:"32.8%",
growth:"+4.6%",
description:"this quarter",
icon:TrendingUp
},


{
title:"Inventory Health",
value:"94%",
growth:"Excellent",
description:"stock availability",
icon:PackageCheck
},


{
title:"Cash Flow",
value:"₹18.4 L",
growth:"+15%",
description:"positive movement",
icon:Wallet
}

];





export default function ExecutiveKPICards(){

return (

<div

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"

>


{

KPI_DATA.map((item,index)=>{


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
y:-5
}}


className="
relative
overflow-hidden
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
border-slate-200
dark:border-slate-800
backdrop-blur-xl
shadow-xl
p-6
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
text-slate-500
"

>

{item.title}

</p>


<h2

className="
text-3xl
font-black
mt-2
dark:text-white
"

>

{item.value}

</h2>


</div>




<div

className="
h-14
w-14
rounded-2xl
bg-gradient-to-br
from-blue-600
to-indigo-600
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
mt-5
flex
justify-between
items-center
"

>


<span

className="
text-green-600
font-bold
flex
items-center
gap-2
"

>


<TrendingUp size={16}/>

{item.growth}


</span>



<span

className="
text-xs
text-slate-500
"

>

{item.description}

</span>



</div>




<div

className="
mt-5
h-1.5
rounded-full
bg-slate-200
overflow-hidden
"

>


<div

className="
h-full
w-[85%]
bg-gradient-to-r
from-blue-600
to-purple-600
"

/>


</div>




</motion.div>


)


})


}


</div>


)

}