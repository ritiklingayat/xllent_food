const analyticsService={



getAnalytics:async(period)=>{


return {


revenue:{


today:45000,


month:1250000,


growth:18


},



sales:{


daily:[

{
date:"Mon",
value:12000
},

{
date:"Tue",
value:18000
},

{
date:"Wed",
value:22000
}


]

},





customers:{


total:2450,


new:125,


repeat:680


},





products:{


top:[

{
name:"Premium Rice",
sales:450
},

{
name:"Wheat Flour",
sales:320
}

]


},





inventory:{


totalStock:5400,


lowStock:42,


outOfStock:8


},





orders:{


total:2450,


pending:120,


completed:2200,


cancelled:130


},






profit:{


gross:320000,


net:185000,


margin:22


}




};



}



};



export default analyticsService;