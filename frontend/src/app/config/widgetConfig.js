import ROLES from "@/app/constants/roles";

import {PERMISSIONS}

from "@/app/constants/permissions";

const widgetConfig=[

{

id:"sales",

component:"SalesWidget",

permission:PERMISSIONS.DASHBOARD_VIEW,

roles:Object.values(ROLES)

},

{

id:"inventory",

component:"InventoryWidget",

permission:PERMISSIONS.INVENTORY_VIEW,

roles:[

ROLES.SUPER_ADMIN,

ROLES.ADMIN,

ROLES.SUPER_STOCKIEST

]

},

{

id:"attendance",

component:"AttendanceWidget",

permission:PERMISSIONS.ATTENDANCE_VIEW,

roles:[

ROLES.SO,

ROLES.ASM

]

}

];

export default widgetConfig;