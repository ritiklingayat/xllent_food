import {

PieChart,
Pie,
Cell

}
from "recharts";


const data=[

{
name:"Delivered",
value:400
},

{
name:"Pending",
value:120
},

{
name:"Cancelled",
value:30
}

];


export default function OrderStatusDonut(){


return (

<div
className="
bg-white
rounded-3xl
border
p-6
"
>


<h3
className="
font-black
text-xl
mb-4
"
>

Order Status

</h3>


<PieChart width={300} height={300}>


<Pie

data={data}

innerRadius={70}

outerRadius={100}

dataKey="value"

>


{
data.map(
(item,index)=>(

<Cell
key={index}
/>

))
}


</Pie>


</PieChart>


</div>

)

}