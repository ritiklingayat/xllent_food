import {
motion
}
from "framer-motion";



const WidgetWrapper = ({
children,
title,
icon:Icon
})=>{


return (

<motion.section


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


transition={{
duration:.3
}}



className="

rounded-3xl

border

border-white/20


bg-white/70


dark:bg-slate-900/70


backdrop-blur-xl


shadow-xl


p-6

"

>



<div

className="

flex

items-center

gap-3

mb-5

"

>


{
Icon &&

<Icon

size={22}

className="text-blue-600"

/>

}


<h2

className="

font-bold

text-lg

dark:text-white

"

>

{title}

</h2>


</div>




{children}


</motion.section>


);


};


export default WidgetWrapper;