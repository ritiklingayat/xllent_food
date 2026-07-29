import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}
from "recharts";


const data=[

{
month:"Jan",
sales:120000
},

{
month:"Feb",
sales:180000
},

{
month:"Mar",
sales:250000
}

];


export default function RevenueChart(){


return (

<div
className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"
>


<h3
className="
font-black
text-xl
mb-6
"
>

Revenue Growth

</h3>


<ResponsiveContainer
width="100%"
height={300}
>

<LineChart
data={data}
>

<XAxis dataKey="month"/>

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

)

}