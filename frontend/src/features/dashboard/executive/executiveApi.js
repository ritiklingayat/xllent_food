import apiClient from "@/api/apiClient";


// =======================================
// MOCK MODE
// Change to false when backend ready
// =======================================

const USE_MOCK = true;




const MOCK_EXECUTIVE_DATA = {


kpis:[

{
title:"Revenue",
value:"₹48.6L",
growth:"+18.5%"
},

{
title:"Orders",
value:"12,458",
growth:"+12.2%"
},

{
title:"Customers",
value:"8,942",
growth:"+8.4%"
},

{
title:"Profit Margin",
value:"32.8%",
growth:"+4.6%"
}

],




revenueChart:[

{
month:"Jan",
revenue:18,
target:20
},

{
month:"Feb",
revenue:25,
target:24
},

{
month:"Mar",
revenue:30,
target:28
},

{
month:"Apr",
revenue:38,
target:35
}

],



salesFunnel:[

{
stage:"Visitors",
value:12000
},

{
stage:"Leads",
value:6500
},

{
stage:"Orders",
value:4200
},

{
stage:"Customers",
value:2800
}

],



customers:[

{
name:"Retail",
value:45
},

{
name:"Wholesale",
value:30
},

{
name:"Online",
value:25
}

],



regions:[

{
name:"Maharashtra",
sales:85
},

{
name:"Gujarat",
sales:70
},

{
name:"Delhi",
sales:60
}

],




aiInsights:[

"Revenue increased by 18% this month",

"Inventory health is stable",

"Customer retention improved"

]


};







export const getExecutiveDashboard = async()=>{


if(USE_MOCK){


return {


data:MOCK_EXECUTIVE_DATA


};


}





try{


const response =
await apiClient.get(
"/executive/dashboard"
);


return response.data;


}
catch(error){


console.error(
"Executive Dashboard API Error:",
error
);


throw error;


}



};