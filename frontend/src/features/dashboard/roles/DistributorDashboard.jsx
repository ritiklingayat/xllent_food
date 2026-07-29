import {
  Package,
  ShoppingCart,
  Users,
  Warehouse,
  Truck,
  MapPin,
  AlertTriangle,
  ClipboardCheck,
  ArrowUpRight
} from "lucide-react";


import {
  motion
} from "framer-motion";


import RoleDashboardLayout
from "./components/RoleDashboardLayout";





const stats = [

{
label:"Current Inventory",
value:"18,640",
change:"+6% Stock",
icon:<Warehouse size={24}/>,
gradient:
"from-green-500 to-emerald-600"
},


{
label:"Wholesalers",
value:"126",
change:"Active",
icon:<Users size={24}/>,
gradient:
"from-blue-600 to-indigo-600"
},


{
label:"Pending Orders",
value:"74",
change:"Need Dispatch",
icon:<ShoppingCart size={24}/>,
gradient:
"from-purple-600 to-pink-600"
},


{
label:"Deliveries",
value:"32",
change:"Today",
icon:<Truck size={24}/>,
gradient:
"from-orange-500 to-red-600"
}

];









const modules = [

{
title:"Inventory",

description:
"Manage your assigned stock from Super Stockist.",

value:"18,640 Units",

icon:<Package size={26}/>,

gradient:
"from-green-500 to-emerald-600"

},


{
title:"Wholesalers",

description:
"Manage assigned wholesalers in your region.",

value:"126 Partners",

icon:<Users size={26}/>,

gradient:
"from-blue-600 to-indigo-600"

},


{
title:"Order Processing",

description:
"Accept, pack and dispatch wholesaler orders.",

value:"74 Orders",

icon:<ClipboardCheck size={26}/>,

gradient:
"from-purple-600 to-pink-600"

},


{
title:"Delivery Tracking",

description:
"Monitor shipment movement and status.",

value:"32 Active",

icon:<Truck size={26}/>,

gradient:
"from-orange-500 to-red-600"

}

];








const wholesalers = [

{
name:"CIDCO Wholesale Market",
orders:24,
location:"Aurangabad",
status:"Active"
},


{
name:"Central Bazaar",
orders:18,
location:"Pune",
status:"Active"
},


{
name:"Kothrud Wholesale",
orders:12,
location:"Pune",
status:"Pending"
}

];







const alerts=[

"Chocolate Combo Pack stock below reorder level",

"5 deliveries delayed today",

"New wholesaler order waiting approval"

];









export default function DistributorDashboard(){


return (

<RoleDashboardLayout


title="Distributor Dashboard"


subtitle="
Regional sales, inventory and delivery management
"


role="DISTRIBUTOR"


stats={stats}


>









{/* Hero */}



<motion.div


whileHover={{
scale:1.01
}}


className="

rounded-3xl

bg-gradient-to-r

from-blue-600

to-indigo-700

p-6

text-white

shadow-2xl

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
h-14

w-14

rounded-2xl

bg-white/20

flex

items-center

justify-center

"

>


<Truck size={30}/>


</div>





<div>


<h2

className="
text-2xl

font-black

"

>

Distribution Control Center

</h2>


<p

className="
text-white/80

"

>

Manage wholesalers, orders and regional deliveries.

</p>


</div>


</div>


</motion.div>









{/* Modules */}



<div

className="

grid

grid-cols-1

md:grid-cols-2

xl:grid-cols-4

gap-6

"

>


{

modules.map(

(item,index)=>(


<motion.div


key={index}


whileHover={{
y:-8
}}


className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

border

border-white/30

dark:border-slate-800

shadow-xl

backdrop-blur-xl

p-6

"

>


<div

className={`

h-14

w-14

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


{item.icon}


</div>




<h3

className="
text-lg

font-black

dark:text-white

"

>

{item.title}

</h3>





<p

className="
text-sm

text-slate-500

dark:text-slate-400

mt-2

"

>

{item.description}

</p>




<div

className="
mt-5

text-xl

font-black

dark:text-white

"

>

{item.value}

</div>



</motion.div>


)

)

}


</div>









{/* Wholesaler + Alerts */}



<div

className="

grid

grid-cols-1

xl:grid-cols-2

gap-6

"

>









{/* Wholesaler Management */}



<div

className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

shadow-xl

border

border-white/30

p-6

"

>


<div

className="
flex

items-center

gap-3

mb-5

"

>


<Users/>

<h3

className="
text-xl

font-black

dark:text-white

"

>

Wholesaler Network

</h3>


</div>






<div

className="
space-y-4

"

>


{

wholesalers.map(

(item,index)=>(


<div

key={index}

className="

rounded-2xl

bg-slate-100

dark:bg-slate-800

p-4

flex

justify-between

items-center

"

>


<div>


<p

className="
font-bold

dark:text-white

"

>

{item.name}

</p>



<div

className="
flex

items-center

gap-2

text-sm

text-slate-500

"

>


<MapPin size={14}/>

{item.location}


</div>


</div>




<div

className="
text-right

"

>

<p

className="
font-black

dark:text-white

"

>

{item.orders}

</p>


<span

className="
text-xs

text-green-600

font-bold

"

>

{item.status}

</span>


</div>


</div>


)

)

}


</div>


</div>









{/* Alerts */}



<div

className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

shadow-xl

border

border-white/30

p-6

"

>


<div

className="
flex

items-center

gap-3

mb-5

"

>


<AlertTriangle

className="
text-orange-500

"/>


<h3

className="
text-xl

font-black

dark:text-white

"

>

Alerts

</h3>


</div>






<div

className="
space-y-4

"

>


{

alerts.map(

(item,index)=>(


<div

key={index}

className="
rounded-2xl

bg-orange-50

dark:bg-orange-900/20

p-4

text-sm

dark:text-white

"

>

{item}

</div>


)

)

}


</div>


</div>








</div>









{/* Operations */}



<div

className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

shadow-xl

border

border-white/30

p-6

"

>


<h3

className="
text-xl

font-black

dark:text-white

mb-5

"

>

Quick Operations

</h3>





<div

className="
flex

flex-wrap

gap-4

"

>


<ActionButton text="Create Order"/>

<ActionButton text="Approve Wholesaler Order"/>

<ActionButton text="Dispatch Delivery"/>

<ActionButton text="Inventory"/>


</div>


</div>








</RoleDashboardLayout>

);


}









function ActionButton({

text

}){


return (

<button

className="

flex

items-center

gap-2

px-5

py-3

rounded-2xl

bg-gradient-to-r

from-blue-600

to-indigo-600

text-white

font-bold

shadow-lg

hover:scale-105

transition

"

>


{text}


<ArrowUpRight size={16}/>


</button>

);


}