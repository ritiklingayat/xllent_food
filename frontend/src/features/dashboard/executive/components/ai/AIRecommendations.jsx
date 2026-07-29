import {
Sparkles
}
from "lucide-react";


import {
aiRecommendations
}
from "../../data/aiMockData";


const AIRecommendations=()=>{


return (

<section className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
shadow-xl
p-6
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

<Sparkles
className="text-purple-500"
/>


<h2 className="
text-xl
font-bold
dark:text-white
">

AI Recommendations

</h2>

</div>



<div className="
space-y-4
">


{
aiRecommendations.map(
(item)=>(


<div
key={item.title}
className="
p-4
rounded-2xl
bg-slate-100
dark:bg-slate-800
"
>


<h3 className="
font-bold
dark:text-white
">

{item.title}

</h3>


<p className="
text-sm
text-slate-500
mt-1
">

{item.description}

</p>


</div>


)

)

}


</div>


</section>

);


};


export default AIRecommendations;