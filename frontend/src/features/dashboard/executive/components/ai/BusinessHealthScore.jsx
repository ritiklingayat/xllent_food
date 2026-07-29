import {
motion
}
from "framer-motion";


import {
Activity
}
from "lucide-react";


import {
businessHealth
}
from "../../data/aiMockData";



const BusinessHealthScore=()=>{


return (

<motion.section

className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
shadow-xl
p-6
border
border-slate-200
dark:border-slate-800
"

>


<div className="
flex
items-center
gap-3
">


<Activity
className="text-green-500"
/>


<h2 className="
text-xl
font-bold
dark:text-white
">

Business Health Score

</h2>


</div>



<div className="
mt-6
text-center
">


<h1 className="
text-6xl
font-black
text-green-500
">

{businessHealth.score}

</h1>


<p className="
text-slate-500
">

{businessHealth.status}

</p>


</div>



<div className="
mt-6
space-y-4
">

{
businessHealth.metrics.map(
(item)=>(


<div
key={item.name}
>


<div className="
flex
justify-between
text-sm
dark:text-white
">

<span>
{item.name}
</span>

<span>
{item.value}%
</span>


</div>


<div className="
h-2
bg-slate-200
dark:bg-slate-800
rounded-full
overflow-hidden
">


<div

className="
h-full
bg-green-500
"

style={{
width:`${item.value}%`
}}


/>


</div>


</div>


)
)

}


</div>


</motion.section>


);

};


export default BusinessHealthScore;