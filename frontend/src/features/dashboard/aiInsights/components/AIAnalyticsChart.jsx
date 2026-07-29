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
sales:450000
},


{
month:"Feb",
sales:620000
},


{
month:"Mar",
sales:850000
},


{
month:"Apr",
sales:920000
}



];







export default function AIAnalyticsChart(){



return (

<div

className="
bg-white
rounded-3xl
border
p-6
"

>


<h2

className="
font-black
text-xl
mb-5
"

>

AI Sales Prediction


</h2>





<ResponsiveContainer

width="100%"

height={300}

>


<LineChart

data={data}

>


<XAxis

dataKey="month"

/>


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