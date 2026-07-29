import {
motion
}
from "framer-motion";


export default function DashboardWidgetCard({
title,
children,
icon:Icon
}){


return (

<motion.div


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


whileHover={{
y:-5
}}


className="
rounded-3xl
bg-white
border
border-slate-200
shadow-sm
hover:shadow-xl
transition
p-6
"

>


<div

className="
flex
items-center
justify-between
mb-5
"

>


<h3

className="
font-black
text-slate-800
text-lg
"

>

{title}

</h3>



{

Icon &&

<div

className="
bg-orange-100
text-orange-600
p-3
rounded-xl
"

>

<Icon size={20}/>

</div>


}



</div>



{children}


</motion.div>


)

}