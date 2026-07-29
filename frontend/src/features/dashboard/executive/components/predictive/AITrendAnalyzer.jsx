import {
BrainCircuit,
TrendingUp,
TrendingDown
}
from "lucide-react";



const AITrendAnalyzer=()=>{


const trends=[

{
text:"Weekend sales increasing",
type:"up"
},

{
text:"Inventory cost optimization required",
type:"down"
},

{
text:"Customer retention improving",
type:"up"
}

];


return (

<div

className="
rounded-3xl
bg-gradient-to-br
from-indigo-600
to-purple-700
text-white
shadow-xl
p-6
"

>


<h2 className="
text-xl
font-bold
flex
items-center
gap-2
mb-5
">

<BrainCircuit/>

AI Trend Analyzer


</h2>



<div className="
space-y-3
">


{

trends.map((trend,index)=>(


<div

key={index}

className="
flex
items-center
gap-3
rounded-xl
bg-white/10
p-3
"

>


{

trend.type==="up"

?

<TrendingUp/>

:

<TrendingDown/>

}


<span>

{trend.text}

</span>


</div>


))


}


</div>



</div>

);


};



export default AITrendAnalyzer;