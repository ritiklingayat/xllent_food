import React from "react";


import {
Brain
}
from "lucide-react";


import {
useSelector
}
from "react-redux";




export default function AIInsightsCard(){


const insights =
useSelector(
state=>state.ai?.insights
);



if(!insights)
return null;




return (

<div

className="
bg-gradient-to-br
from-indigo-600
to-purple-700
rounded-3xl
p-6
text-white
shadow-xl
"


>


<div

className="
flex
items-center
gap-3
mb-5
"

>


<Brain size={30}/>


<h2

className="
text-xl
font-black
"

>

AI ERP Intelligence

</h2>


</div>




<p

className="
text-sm
opacity-80
"

>

AI powered business prediction engine

</p>




<div

className="
grid
grid-cols-2
gap-4
mt-6
"

>


<div

className="
bg-white/20
rounded-2xl
p-4
"

>

<p className="text-xs">

7 Days Forecast

</p>


<h3

className="
text-2xl
font-black
"

>

₹
{
insights.salesForecast.next7Days
}

</h3>


</div>





<div

className="
bg-white/20
rounded-2xl
p-4
"

>

<p className="text-xs">

Growth

</p>


<h3

className="
text-2xl
font-black
"

>

+
{
insights.salesForecast.growth
}%

</h3>


</div>



</div>


</div>


);

}