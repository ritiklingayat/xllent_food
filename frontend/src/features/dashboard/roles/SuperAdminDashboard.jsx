import {
  ShieldCheck,
  Users,
  Package,
  Warehouse,
  ShoppingCart,
  IndianRupee,
  UserPlus,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";


import RoleDashboardLayout
from "./components/RoleDashboardLayout";





const stats = [

{
title:"Total Revenue",
value:"₹42.5 L",
icon:IndianRupee,
gradient:"from-green-500 to-emerald-600"
},


{
title:"Total Orders",
value:"12,540",
icon:ShoppingCart,
gradient:"from-blue-600 to-indigo-600"
},


{
title:"Total Users",
value:"428",
icon:Users,
gradient:"from-purple-600 to-pink-600"
},


{
title:"Total Stock",
value:"84,500",
icon:Warehouse,
gradient:"from-orange-500 to-red-600"
}

];









const quickActions = [

{
title:"Create Admin",
description:"Add new admin user",
icon:UserPlus
},


{
title:"Manage Products",
description:"Update products and pricing",
icon:Package
},


{
title:"View Reports",
description:"Revenue and analytics",
icon:BarChart3
}


];









const activities = [

{
title:"New distributor created - Aurangabad",
time:"10 minutes ago"
},


{
title:"Order #XL10245 approved",
time:"25 minutes ago"
},


{
title:"Inventory updated",
time:"1 hour ago"
},


{
title:"New product added",
time:"2 hours ago"
}

];









export default function SuperAdminDashboard(){


return (


<RoleDashboardLayout


role="Super Admin"


description="
Complete Xllent Foods DMS control center
"



stats={stats}



quickActions={quickActions}



activities={activities}



>


{/* MAIN SUPER ADMIN MODULES */}



<div

className="

grid

grid-cols-1

xl:grid-cols-3

gap-6

mt-8

"

>





{/* Revenue Analytics */}


<div


className="

xl:col-span-2

rounded-3xl

bg-white/80

dark:bg-slate-900/80

backdrop-blur-xl

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

from-green-500

to-emerald-600

flex

items-center

justify-center

text-white

"

>

<BarChart3/>

</div>



<div>

<h2

className="

text-xl

font-bold

dark:text-white

"

>

Revenue Analytics

</h2>


<p

className="

text-sm

text-slate-500

"

>

Company wide performance

</p>


</div>


</div>





<div

className="

h-48

flex

items-center

justify-center

rounded-2xl

bg-slate-100

dark:bg-slate-800

text-slate-500

"

>

Revenue Chart Component Ready

</div>



</div>









{/* System Health */}



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

from-blue-600

to-indigo-600

flex

items-center

justify-center

text-white

"

>


<ShieldCheck/>

</div>



<div>


<h2

className="

font-bold

text-xl

dark:text-white

"

>

System Health

</h2>



<p

className="

text-sm

text-slate-500

"

>

Platform status

</p>



</div>


</div>





<div

className="

space-y-4

"

>


<HealthItem

title="Database"

value="Healthy"

/>



<HealthItem

title="API Services"

value="Running"

/>



<HealthItem

title="Notifications"

value="Active"

/>


</div>


</div>







</div>









{/* MANAGEMENT GRID */}



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

icon={<Users/>}

title="User Hierarchy"

text="
Admins, Stockists, Distributors
"

/>



<ModuleCard

icon={<Package/>}

title="Products"

text="
Categories, Pricing, Catalogue
"

/>



<ModuleCard

icon={<Warehouse/>}

title="Inventory"

text="
Global stock monitoring
"

/>



<ModuleCard

icon={<FileText/>}

title="Audit Logs"

text="
System activities
"

/>



</div>







</RoleDashboardLayout>


);


}









function ModuleCard({

icon,

title,

text

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

{text}

</p>



</div>


);


}









function HealthItem({

title,

value

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


<span

className="

text-sm

dark:text-white

"

>

{title}

</span>


<span

className="

text-green-600

font-semibold

"

>

{value}

</span>


</div>


);


}