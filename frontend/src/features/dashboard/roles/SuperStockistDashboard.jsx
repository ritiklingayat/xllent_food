import {
  Warehouse,
  ShoppingCart,
  Truck,
  Users,
  Package,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
} from "lucide-react";


import RoleDashboardLayout
from "./components/RoleDashboardLayout";






const stats = [

{
title:"Available Stock",
value:"42,850",
icon:Warehouse,
gradient:"from-green-500 to-emerald-600"
},


{
title:"Incoming Orders",
value:"128",
icon:ShoppingCart,
gradient:"from-blue-600 to-indigo-600"
},


{
title:"Distributors",
value:"56",
icon:Users,
gradient:"from-purple-600 to-pink-600"
},


{
title:"Low Stock Items",
value:"14",
icon:AlertTriangle,
gradient:"from-orange-500 to-red-600"
}

];








const quickActions = [

{
title:"Place Order To Admin",
description:"Request stock replenishment"
},


{
title:"Manage Inventory",
description:"Update stock availability"
},


{
title:"Dispatch Products",
description:"Send stock to distributors"
}

];








const activities = [

{
title:"Stock received from Admin warehouse",
time:"15 minutes ago"
},


{
title:"Order dispatched to Aurangabad Distributor",
time:"45 minutes ago"
},


{
title:"Low stock alert: Chocolate Premium",
time:"1 hour ago"
},


{
title:"New distributor order received",
time:"3 hours ago"
}

];










export default function SuperStockistDashboard(){



return (


<RoleDashboardLayout


role="Super Stockist Dashboard"


description="
Inventory and distributor management portal
"



stats={stats}



quickActions={quickActions}



activities={activities}



>









{/* STOCK OVERVIEW */}



<div


className="

grid

grid-cols-1

xl:grid-cols-3

gap-6

mt-8

"

>






<div

className="

xl:col-span-2

rounded-3xl

bg-white/80

dark:bg-slate-900/80

border

border-white/30

shadow-xl

p-6

"

>


<div

className="

flex

items-center

gap-4

mb-6

"

>


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


<Warehouse size={25}/>


</div>




<div>


<h2

className="

text-xl

font-bold

dark:text-white

"

>

Inventory Flow

</h2>


<p

className="

text-sm

text-slate-500

"

>

Stock movement tracking

</p>



</div>


</div>







<div

className="

grid

grid-cols-1

md:grid-cols-3

gap-4

"

>


<StockBox

title="Incoming"

value="12,500"

icon={<ArrowDownToLine/>}

/>


<StockBox

title="Outgoing"

value="8,420"

icon={<ArrowUpFromLine/>}

/>


<StockBox

title="Reserved"

value="3,200"

icon={<ClipboardList/>}

/>



</div>




</div>









{/* Distributor Summary */}



<div

className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

border

border-white/30

shadow-xl

p-6

"

>



<h2

className="

text-xl

font-bold

dark:text-white

mb-5

"

>

Distributor Network

</h2>




<div

className="

space-y-4

"

>


<NetworkItem

name="Aurangabad Zone"

count="18 Distributors"

/>


<NetworkItem

name="Pune Zone"

count="22 Distributors"

/>


<NetworkItem

name="Nashik Zone"

count="16 Distributors"

/>



</div>



</div>






</div>









{/* MANAGEMENT MODULES */}



<div

className="

grid

grid-cols-1

md:grid-cols-2

xl:grid-cols-4

gap-6

mt-8

"

>



<ModuleCard

icon={<Package/>}

title="Products"

description="View assigned catalogue"

/>



<ModuleCard

icon={<Truck/>}

title="Dispatch"

description="Distributor deliveries"

/>



<ModuleCard

icon={<ShoppingCart/>}

title="Orders"

description="Incoming and outgoing orders"

/>



<ModuleCard

icon={<Warehouse/>}

title="Inventory"

description="Stock management"

/>



</div>








</RoleDashboardLayout>


);


}









function StockBox({

title,

value,

icon

}){


return (

<div

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

items-center

gap-3

mb-3

dark:text-white

"

>

{icon}

<span>

{title}

</span>

</div>



<h3

className="

text-3xl

font-black

dark:text-white

"

>

{value}

</h3>



</div>

);


}









function NetworkItem({

name,

count

}){


return (

<div

className="

flex

justify-between

items-center

rounded-xl

bg-slate-100

dark:bg-slate-800

px-4

py-3

"

>


<p

className="

font-semibold

dark:text-white

"

>

{name}

</p>



<span

className="

text-sm

text-blue-600

font-semibold

"

>

{count}

</span>



</div>

);


}









function ModuleCard({

icon,

title,

description

}){


return (

<div

className="

rounded-3xl

bg-white/80

dark:bg-slate-900/80

border

border-white/30

shadow-xl

p-5

"

>


<div

className="

h-12

w-12

rounded-2xl

bg-gradient-to-br

from-blue-600

to-indigo-600

flex

items-center

justify-center

text-white

mb-4

"

>

{icon}

</div>



<h3

className="

font-bold

dark:text-white

"

>

{title}

</h3>



<p

className="

text-sm

text-slate-500

mt-1

"

>

{description}

</p>


</div>

);


}