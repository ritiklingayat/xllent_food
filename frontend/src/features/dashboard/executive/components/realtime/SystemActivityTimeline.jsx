import {
Clock
}
from "lucide-react";


import {
activities
}
from "./realtimeMockData";


const SystemActivityTimeline=()=>{


return (

<div className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
p-6
shadow-xl
">


<div className="
flex
gap-3
mb-5
">

<Clock/>

<h2 className="
font-bold
text-xl
dark:text-white
">

Activity Timeline

</h2>


</div>



{
activities.map(
(item)=>(


<div
key={item.event}
className="
border-l-2
border-blue-500
pl-4
mb-5
"
>


<h3 className="
font-semibold
dark:text-white
">

{item.event}

</h3>


<p className="
text-sm
text-slate-500
">

{item.user} • {item.time}

</p>


</div>


)

)

}


</div>


);


};


export default SystemActivityTimeline;