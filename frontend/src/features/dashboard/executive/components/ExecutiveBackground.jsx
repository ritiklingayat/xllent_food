import { motion } from "framer-motion";


export default function ExecutiveBackground(){


return (

<>


<motion.div

animate={{
x:[0,80,0],
y:[0,50,0]
}}

transition={{
duration:18,
repeat:Infinity,
ease:"linear"
}}


className="

fixed

top-20

left-20

h-72

w-72

rounded-full

bg-blue-500/20

blur-3xl

pointer-events-none

"

/>




<motion.div

animate={{
x:[0,-100,0],
y:[0,80,0]
}}

transition={{
duration:22,
repeat:Infinity,
ease:"linear"
}}


className="

fixed

bottom-20

right-20

h-96

w-96

rounded-full

bg-purple-500/20

blur-3xl

pointer-events-none

"

/>





<motion.div

animate={{
opacity:[0.2,0.5,0.2]
}}

transition={{
duration:8,
repeat:Infinity
}}


className="

fixed

inset-0

bg-gradient-to-br

from-blue-500/5

via-transparent

to-purple-500/10

pointer-events-none

"

/>



</>

)

}