import {
Zap
}
from "lucide-react";


const CommandPanel=()=>{


return (

<section className="
rounded-3xl
bg-gradient-to-br
from-indigo-600
to-purple-600
text-white
p-6
shadow-xl
">


<div className="
flex
items-center
gap-3
">

<Zap/>


<h2 className="
text-xl
font-bold
">

CEO Command Center

</h2>


</div>



<div className="
mt-6
space-y-3
">


<button className="
w-full
rounded-xl
bg-white/20
p-3
">

Generate AI Report

</button>



<button className="
w-full
rounded-xl
bg-white/20
p-3
">

Optimize Inventory

</button>



<button className="
w-full
rounded-xl
bg-white/20
p-3
">

Analyze Sales

</button>


</div>


</section>


);


};


export default CommandPanel;