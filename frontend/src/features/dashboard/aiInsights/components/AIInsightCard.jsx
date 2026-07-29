import {
Sparkles
}
from "lucide-react";



export default function AIInsightCard({

title,

value,

description,

confidence

}){


return (


<div

className="
bg-white
rounded-3xl
border
border-slate-200
p-6
shadow-sm
hover:shadow-xl
transition
"

>


<div

className="
flex
justify-between
items-start
"

>


<div>


<div

className="
flex
items-center
gap-2
text-orange-500
font-bold
"

>


<Sparkles size={18}/>

AI Insight


</div>



<h3

className="
text-lg
font-black
text-slate-800
mt-3
"

>

{title}

</h3>


</div>





<div

className="
bg-orange-100
text-orange-600
px-3
py-1
rounded-full
text-xs
font-bold
"

>

{confidence}%


</div>


</div>






<h2

className="
text-3xl
font-black
mt-5
text-slate-900
"

>

{value}


</h2>



<p

className="
text-sm
text-slate-500
mt-3
"

>

{description}

</p>



</div>


);


}