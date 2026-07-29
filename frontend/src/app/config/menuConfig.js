/* ==========================================================
   Xllent Foods ERP
   Dynamic Sidebar Configuration
========================================================== */

import {
  LayoutDashboard,
  Package2,
  Boxes,
  Tags,
  Warehouse,
  ShoppingCart,
  ClipboardList,
  Users,
  UserCog,
  Building2,
  Truck,
  MapPinned,
  Receipt,
  BarChart3,
  Wallet,
  Bell,
  ShieldCheck,
  Settings,
  ChevronRight,
} from "lucide-react";

import ROLES from "@/app/constants/roles";

import { PERMISSIONS } from "@/app/constants/permissions";

/* ==========================================================
   Menu Configuration

   Properties

   id
   title
   icon
   path
   permission
   roles
   badge
   collapsible
   divider
   children

========================================================== */

const menuConfig = [

/* ==========================================================
   Dashboard
========================================================== */

{
id:"dashboard",

title:"Dashboard",

icon:LayoutDashboard,

path:"/dashboard",

permission:PERMISSIONS.DASHBOARD_VIEW,

roles:Object.values(ROLES),

collapsible:false
},

/* ==========================================================
   Catalog
========================================================== */

{

id:"catalog",

title:"Catalog",

icon:Package2,

divider:true,

collapsible:true,

roles:[
ROLES.SUPER_ADMIN,
ROLES.ADMIN
],

children:[

{

id:"products",

title:"Products",

icon:Package2,

path:"/dashboard/products",

permission:PERMISSIONS.PRODUCTS_VIEW,

roles:[
ROLES.SUPER_ADMIN,
ROLES.ADMIN
]

},

{

id:"categories",

title:"Categories",

icon:Boxes,

path:"/dashboard/categories",

permission:PERMISSIONS.CATEGORIES_VIEW,

roles:[
ROLES.SUPER_ADMIN,
ROLES.ADMIN
]

},

{

id:"brands",

title:"Brands",

icon:Tags,

path:"/dashboard/brands",

permission:PERMISSIONS.BRANDS_VIEW,

roles:[
ROLES.SUPER_ADMIN,
ROLES.ADMIN
]

}

]

},

/* ==========================================================
   Inventory
========================================================== */

{

id:"inventory",

title:"Inventory",

icon:Warehouse,

divider:true,

collapsible:true,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST,

ROLES.DISTRIBUTOR

],

children:[

{

id:"stock",

title:"Stock",

icon:Warehouse,

path:"/dashboard/inventory",

permission:PERMISSIONS.INVENTORY_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST,

ROLES.DISTRIBUTOR

]

},

{

id:"purchase",

title:"Purchase",

icon:ClipboardList,

path:"/dashboard/purchase",

permission:PERMISSIONS.INVENTORY_PURCHASE,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST

]

},

{

id:"stockin",

title:"Stock In",

icon:ChevronRight,

path:"/dashboard/stock-in",

permission:PERMISSIONS.INVENTORY_STOCK_IN,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST

]

},

{

id:"stockout",

title:"Stock Out",

icon:ChevronRight,

path:"/dashboard/stock-out",

permission:PERMISSIONS.INVENTORY_STOCK_OUT,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST

]

}

]

},

/* ==========================================================
   Orders
========================================================== */

{

id:"orders",

title:"Orders",

icon:ShoppingCart,

collapsible:true,

divider:true,

roles:Object.values(ROLES),

children:[

{

id:"all-orders",

title:"Orders",

icon:ShoppingCart,

path:"/dashboard/orders",

permission:PERMISSIONS.ORDERS_VIEW,

roles:Object.values(ROLES),

badge:{

type:"warning",

value:"12"

}

},

{

id:"new-order",

title:"Create Order",

icon:Receipt,

path:"/dashboard/orders/create",

permission:PERMISSIONS.ORDERS_CREATE,

roles:Object.values(ROLES)

}

]

},

/* ==========================================================
   Customers
========================================================== */

{

id:"customers",

title:"Customers",

icon:Users,

path:"/dashboard/customers",

permission:PERMISSIONS.CUSTOMERS_VIEW,

roles:Object.values(ROLES),

badge:{

type:"success",

value:"NEW"

}

},

/* ==========================================================
   Sales Team
========================================================== */

{

id:"sales",

title:"Sales Team",

icon:Building2,

divider:true,

collapsible:true,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.ASM

],

children:[

{

id:"asm",

title:"Area Sales Managers",

icon:MapPinned,

path:"/dashboard/asm",

permission:PERMISSIONS.SALES_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN

]

},

{

id:"so",

title:"Sales Officers",

icon:Truck,

path:"/dashboard/sales",

permission:PERMISSIONS.SALES_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.ASM

]

}

]

},

/* ==========================================================
   Users
========================================================== */

{

id:"users",

title:"Users",

icon:UserCog,

path:"/dashboard/users",

permission:PERMISSIONS.USERS_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN

]

},

/* ==========================================================
   Reports
========================================================== */

{

id:"reports",

title:"Reports",

icon:BarChart3,

path:"/dashboard/reports",

permission:PERMISSIONS.REPORTS_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST,

ROLES.DISTRIBUTOR,

ROLES.ASM

]

},

/* ==========================================================
   Finance
========================================================== */

{

id:"finance",

title:"Finance",

icon:Wallet,

path:"/dashboard/finance",

permission:PERMISSIONS.FINANCE_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN

]

},

/* ==========================================================
   Notifications
========================================================== */

{

id:"notifications",

title:"Notifications",

icon:Bell,

path:"/dashboard/notifications",

permission:PERMISSIONS.NOTIFICATIONS_VIEW,

roles:Object.values(ROLES),

badge:{

type:"danger",

value:"9"

}

},

/* ==========================================================
   Security
========================================================== */

{

id:"security",

title:"Security",

icon:ShieldCheck,

path:"/dashboard/security",

permission:PERMISSIONS.SETTINGS_VIEW,

roles:[

ROLES.SUPER_ADMIN

]

},

/* ==========================================================
   Settings
========================================================== */

{

id:"settings",

title:"Settings",

icon:Settings,

path:"/dashboard/settings",

permission:PERMISSIONS.SETTINGS_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN

]

}

];

/* ==========================================================
   Export
========================================================== */

export default menuConfig;