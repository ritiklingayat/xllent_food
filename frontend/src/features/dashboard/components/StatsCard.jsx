import React from "react";



export default function StatsCard({

title,

value,

icon

}){


return (

<div className="
bg-white
rounded-3xl
p-6
shadow-sm
hover:shadow-xl
transition
">


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-slate-500
font-medium
">

{title}

</p>



<h2 className="
text-4xl
font-black
mt-3
text-slate-800
">

{value}

</h2>



</div>




<div className="
bg-orange-100
text-orange-600
w-14
h-14
rounded-2xl
flex
items-center
justify-center
text-2xl
">

{icon}

</div>




</div>


</div>

);


}