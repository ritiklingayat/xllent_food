/*
|--------------------------------------------------------------------------
| AI ERP Intelligence Mock Data
|--------------------------------------------------------------------------
| Temporary business intelligence data
| Replace with API / MongoDB data later
|--------------------------------------------------------------------------
*/


export const aiMockData = {


  company: {

    name: "Xllent Foods",

    industry: "Food Distribution",

    currency: "INR"

  },





  sales: {


    today: 245000,


    monthly: 7250000,


    growth: 18.5,


    target: 9000000


  },







  orders: {


    totalToday: 184,


    pending: 32,


    completed: 142,


    cancelled: 10


  },







  inventory: {


    totalProducts: 560,


    lowStockItems: 24,


    outOfStockItems: 6,


    warehouseValue: 18500000


  },







  customers:{


    total:4500,


    active:3200,


    newThisMonth:180


  },







  topProducts:[


    {


      name:"Premium Wheat Flour",


      sales:850000,


      units:4200


    },


    {


      name:"Organic Rice",


      sales:620000,


      units:3100


    },


    {


      name:"Sunflower Oil",


      sales:540000,


      units:2600


    }


  ],







  alerts:[


    {


      type:"LOW_STOCK",


      message:"24 products require restocking"


    },


    {


      type:"SALES",


      message:"Sales increased 18.5% this month"


    },


    {


      type:"ORDER",


      message:"32 orders waiting for dispatch"


    }


  ]



};