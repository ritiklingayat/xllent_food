import {
motion
}
from "framer-motion";



const CopilotMessage=({
message
})=>{


const isAI=
message.role==="ai";



return (

<motion.div


initial={{
opacity:0,
y:10
}}


animate={{
opacity:1,
y:0
}}



className={`
flex
${isAI?"justify-start":"justify-end"}
`}


>


<div

className={`
max-w-[85%]
px-4
py-3
rounded-2xl
text-sm
${
isAI
?
"bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
:
"bg-blue-600 text-white"
}
`}

>

{message.text}


</div>


</motion.div>


);


};



export default CopilotMessage;