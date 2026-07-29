import {motion} from "framer-motion";

import {
TrendingUp
}
from "lucide-react";


const LiveRevenueTicker=()=>{


return (

<motion.div

animate={{
scale:[1,1.02,1]
}}

transition={{
repeat:Infinity,
duration:3
}}

className="
rounded-3xl
p-6
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
shadow-xl
"

>


<div className="
flex
justify-between
items-center
">


<div>

<p className="opacity-80">
Live Revenue
</p>


<h1 className="
text-4xl
font-black
">

₹12,45,000

</h1>


</div>


<div className="
p-4
rounded-2xl
bg-white/20
">

<TrendingUp size={32}/>

</div>


</div>


<div className="
mt-4
text-sm
">

+ ₹18,500 generated in last 5 minutes

</div>


</motion.div>

);


};


export default LiveRevenueTicker;