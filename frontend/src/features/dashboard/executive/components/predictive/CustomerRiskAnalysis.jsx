import {
AlertTriangle,
Users
}
from "lucide-react";



const RISK_DATA=[

{
title:"Low Risk",
count:8200,
color:"text-green-500"
},

{
title:"Medium Risk",
count:420,
color:"text-yellow-500"
},

{
title:"High Risk",
count:120,
color:"text-red-500"
}

];



const CustomerRiskAnalysis=()=>{


return (

<section

className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
border-white/20
shadow-xl
p-6
"

>


<h2

className="
text-xl
font-bold
dark:text-white
flex
gap-2
items-center
mb-6
"

>

<Users
className="text-purple-500"
/>

Customer Risk Intelligence


</h2>



<div className="
space-y-4
">


{

RISK_DATA.map(item=>(


<div

key={item.title}

className="
flex
justify-between
p-4
rounded-2xl
bg-slate-100
dark:bg-slate-800
"

>


<div className="
flex
items-center
gap-3
">


<AlertTriangle
size={18}
className={item.color}
/>


<span className="
dark:text-white
font-medium
">

{item.title}

</span>


</div>



<strong className="
dark:text-white
">

{item.count}

</strong>


</div>


))


}


</div>


</section>

);


};


export default CustomerRiskAnalysis;