/*
|--------------------------------------------------------------------------
| Dashboard Widget Permission Engine
|--------------------------------------------------------------------------
| Roles:
| SUPER_ADMIN
| ADMIN
| SUPERSTOCKIEST
| DISTRIBUTOR
| ASM
| SO
|--------------------------------------------------------------------------
*/


export const widgetPermissions = {


    SUPER_ADMIN:[

        "revenue",

        "salesTrend",

        "orderStatus",

        "topProducts",

        "recentOrders",

        "lowStock",

        "inventory",

        "activity"

    ],



    ADMIN:[


        "revenue",

        "salesTrend",

        "orderStatus",

        "topProducts",

        "recentOrders",

        "inventory"


    ],




    SUPERSTOCKIEST:[


        "inventory",

        "lowStock",

        "recentOrders"


    ],





    DISTRIBUTOR:[


        "salesTrend",

        "orderStatus",

        "recentOrders"


    ],





    ASM:[


        "salesTrend",

        "topProducts",

        "recentOrders"


    ],






    SO:[


        "salesTrend",

        "recentOrders"


    ]

};







/*
|--------------------------------------------------------------------------
| Check Widget Permission
|--------------------------------------------------------------------------
|
| Usage:
|
| canAccessWidget(
|    "SUPER_ADMIN",
|    "revenue"
| )
|
|--------------------------------------------------------------------------
*/


export const canAccessWidget = (

    role,

    widgetId

)=>{


    const allowedWidgets =

        widgetPermissions[role]
        ||
        widgetPermissions.SUPER_ADMIN;



    return allowedWidgets.includes(
        widgetId
    );


};







/*
|--------------------------------------------------------------------------
| Get Allowed Widgets For Role
|--------------------------------------------------------------------------
*/


export const getWidgetsForRole = (

    role

)=>{


    return (

        widgetPermissions[role]

        ||

        widgetPermissions.SUPER_ADMIN

    );


};
