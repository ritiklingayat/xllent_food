import { motion } from "framer-motion";


export default function GlassCard({

children,

className=""

}){


return (

<motion.div

whileHover={{
y:-5
}}

transition={{
duration:0.25
}}

className={`
rounded-3xl
bg-white/80
backdrop-blur-xl
border
border-slate-200
shadow-sm
hover:shadow-2xl
transition-all
${className}
`}

>

{children}

</motion.div>

)

}