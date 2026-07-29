import {
AlertTriangle
}
from "lucide-react";


import {
aiAlerts
}
from "./realtimeMockData";



const AIAlertCenter=()=>{


return (

<section className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
p-6
shadow-xl
border
border-slate-200
dark:border-slate-800
">


<div className="
flex
gap-3
items-center
mb-5
">

<AlertTriangle
className="text-orange-500"
/>


<h2 className="
text-xl
font-bold
dark:text-white
">

AI Alert Center

</h2>

</div>



<div className="
space-y-4
">

{
aiAlerts.map(
(alert)=>(

<div

key={alert.title}

className="
rounded-2xl
p-4
bg-slate-100
dark:bg-slate-800
"

>

<h3 className="
font-bold
dark:text-white
">

{alert.title}

</h3>


<p className="
text-sm
text-slate-500
">

{alert.message}

</p>


</div>

)

)

}


</div>


</section>


);


};


export default AIAlertCenter;