import React from "react";


import {

LineChart,

Line,

XAxis,

YAxis,

Tooltip,

ResponsiveContainer

}

from "recharts";




export default function SalesChart(){



const data=[

{
name:"Jan",
sales:4000
},

{
name:"Feb",
sales:6000
},

{
name:"Mar",
sales:8000
},

{
name:"Apr",
sales:12000
},

{
name:"May",
sales:15000
}

];





return (

<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<h2 className="
text-xl
font-bold
mb-6
">

Sales Overview

</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<LineChart data={data}>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="sales"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>



</div>


);


}