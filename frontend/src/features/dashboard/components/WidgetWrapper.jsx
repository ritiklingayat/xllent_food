import {
motion
}
from "framer-motion";


export default function WidgetWrapper({
children,
title
}){


return (

<motion.div

layout

initial={{
opacity:0,
scale:.95
}}

animate={{
opacity:1,
scale:1
}}

className="
rounded-3xl
bg-white
border
border-slate-200
shadow-lg
p-5
"

>


<h3
className="
font-bold
text-slate-800
mb-4
"
>

{title}

</h3>


{children}


</motion.div>

)


}