const dashboardMockData={


stats:{


revenue:2450000,

orders:8540,

products:1240,

customers:560


},



salesTrend:[


{
month:"Jan",
sales:450000
},


{
month:"Feb",
sales:520000
},


{
month:"Mar",
sales:610000
},


{
month:"Apr",
sales:730000
},


{
month:"May",
sales:820000
}


],




orderStatus:[


{
name:"Completed",
value:6200
},


{
name:"Pending",
value:1400
},


{
name:"Cancelled",
value:940
}


],





topProducts:[


{
name:"Premium Rice",
sales:1200
},


{
name:"Organic Wheat",
sales:980
},


{
name:"Cooking Oil",
sales:760
},


{
name:"Spices Combo",
sales:620
}


],




recentOrders:[


{
id:"ORD-1001",
customer:"Raj Traders",
amount:45000,
status:"Completed"
},


{
id:"ORD-1002",
customer:"Shree Stores",
amount:32000,
status:"Pending"
},


{
id:"ORD-1003",
customer:"Sai Mart",
amount:56000,
status:"Completed"
}


],




lowStock:[


{
product:"Premium Rice",
stock:5
},


{
product:"Oil Pack 5L",
stock:8
}


]


};


export default dashboardMockData;