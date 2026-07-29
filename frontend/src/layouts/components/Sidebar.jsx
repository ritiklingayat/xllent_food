import React, {useState} from "react";
import {
 LayoutDashboard,
 Package,
 Layers,
 ShoppingCart,
 Users,
 BarChart3,
 Settings,
 ChevronLeft
} from "lucide-react";

import {NavLink} from "react-router-dom";


const menu=[
{
name:"Dashboard",
path:"/dashboard",
icon:<LayoutDashboard size={20}/>
},
{
name:"Products",
path:"/dashboard/products",
icon:<Package size={20}/>
},
{
name:"Categories",
path:"/dashboard/categories",
icon:<Layers size={20}/>
},
{
name:"Orders",
path:"/dashboard/orders",
icon:<ShoppingCart size={20}/>
},
{
name:"Customers",
path:"/dashboard/customers",
icon:<Users size={20}/>
},
{
name:"Analytics",
path:"/dashboard/analytics",
icon:<BarChart3 size={20}/>
},
{
name:"Settings",
path:"/dashboard/settings",
icon:<Settings size={20}/>
}
];


export default function Sidebar(){

const [collapsed,setCollapsed]=useState(false);


return (

<aside
className={`
h-screen bg-slate-900 text-white 
transition-all duration-300
${collapsed?"w-20":"w-64"}
`}
>


<div className="flex items-center justify-between p-5">


<h1 className={collapsed?"hidden":"text-xl font-bold"}>
Xllent Foods
</h1>


<button
onClick={()=>setCollapsed(!collapsed)}
>
<ChevronLeft
className={
collapsed?"rotate-180":""
}
/>
</button>

</div>


<nav className="px-3 space-y-2">


{
menu.map(item=>(

<NavLink
key={item.path}
to={item.path}
className={({isActive})=>
`
flex items-center gap-3 px-4 py-3 rounded-xl
transition

${isActive
?
"bg-orange-500 text-white"
:
"hover:bg-slate-800"
}
`
}
>


{item.icon}


<span className={collapsed?"hidden":""}>
{item.name}
</span>


</NavLink>


))
}


</nav>


</aside>


)

}