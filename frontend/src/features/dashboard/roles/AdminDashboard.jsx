import {
  Package,
  Tags,
  Warehouse,
  ShoppingCart,
  Truck,
  Users,
  AlertTriangle,
  Bell,
  ClipboardCheck,
  IndianRupee,
} from "lucide-react";


import RoleDashboardLayout
from "./components/RoleDashboardLayout";







const stats = [

{
title:"Pending Orders",
value:"245",
icon:ShoppingCart,
gradient:"from-blue-600 to-indigo-600"
},


{
title:"Inventory Stock",
value:"64,850",
icon:Warehouse,
gradient:"from-green-500 to-emerald-600"
},


{
title:"Products",
value:"326",
icon:Package,
gradient:"from-purple-600 to-pink-600"
},


{
title:"Low Stock Items",
value:"18",
icon:AlertTriangle,
gradient:"from-orange-500 to-red-600"
}

];








const quickActions = [

{
title:"Approve Orders",
description:"Review pending purchase orders"
},


{
title:"Manage Products",
description:"Add or update products"
},


{
title:"Manage Pricing",
description:"Update role based pricing"
},


];








const activities = [

{
title:"Order #XL10256 waiting approval",
time:"5 minutes ago"
},


{
title:"New distributor registered",
time:"30 minutes ago"
},


{
title:"Stock updated for Chocolate category",
time:"1 hour ago"
},


{
title:"Price list modified",
time:"3 hours ago"
}

];









export default function AdminDashboard(){


return (


<RoleDashboardLayout


role="Admin Dashboard"


description="
Operations control center for Xllent Foods
"



stats={stats}



quickActions={quickActions}



activities={activities}



>






{/* OPERATION MODULES */}



<div

className="

grid

grid-cols-1

xl:grid-cols-3

gap-6

mt-8

"

>





{/* Order Management */}



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

from-blue-600

to-indigo-600

flex

items-center

justify-center

text-white

"

>

<ClipboardCheck size={24}/>

</div>




<div>


<h2

className="

text-xl

font-bold

dark:text-white

"

>

Order Approval Center

</h2>



<p

className="

text-sm

text-slate-500

"

>

Approve, reject and process orders

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


<ActionBox

title="Pending"

value="245"

/>


<ActionBox

title="Approved"

value="1,240"

/>


<ActionBox

title="Dispatch"

value="86"

/>



</div>




</div>









{/* Notifications */}



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



<div

className="

flex

items-center

gap-3

mb-5

"

>


<div

className="

h-12

w-12

rounded-2xl

bg-gradient-to-br

from-orange-500

to-red-600

flex

items-center

justify-center

text-white

"

>

<Bell/>

</div>



<h2

className="

text-xl

font-bold

dark:text-white

"

>

Alerts

</h2>


</div>






<div

className="

space-y-3

"

>


<AlertItem

text="18 products below stock level"

/>



<AlertItem

text="12 orders waiting approval"

/>



<AlertItem

text="5 delivery delays detected"

/>



</div>




</div>





</div>









{/* MANAGEMENT CARDS */}



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

description="Product catalogue management"

/>



<ModuleCard

icon={<Tags/>}

title="Pricing"

description="MRP and role based prices"

/>



<ModuleCard

icon={<Truck/>}

title="Dispatch"

description="Delivery processing"

/>



<ModuleCard

icon={<Users/>}

title="Users"

description="Manage hierarchy users"

/>



</div>









</RoleDashboardLayout>


);


}









function ActionBox({

title,

value

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


<p

className="

text-sm

text-slate-500

"

>

{title}

</p>


<h3

className="

text-3xl

font-black

dark:text-white

mt-1

"

>

{value}

</h3>


</div>


);


}









function AlertItem({

text

}){


return (

<div

className="

flex

items-center

gap-3

rounded-xl

bg-slate-100

dark:bg-slate-800

px-4

py-3

"

>


<AlertTriangle

size={18}

className="text-orange-500"

/>


<p

className="

text-sm

dark:text-white

"

>

{text}

</p>


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

text-white

flex

items-center

justify-center

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