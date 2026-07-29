import {
  useState
} from "react";


import {
  Outlet
} from "react-router-dom";


import {
  motion,
  AnimatePresence
} from "framer-motion";


import {
  Menu,
  X
} from "lucide-react";



import Sidebar from "@/layouts/components/Sidebar";


import Header
from "@/components/common/Header";


import useAuth
from "@/auth/useAuth";






export default function DashboardLayout(){



const {

loading

}=useAuth();




const [

mobileSidebar,

setMobileSidebar

] = useState(false);







if(loading){


return (

<div

className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-slate-900
via-slate-800
to-slate-950
"

>


<div

className="
h-12
w-12
rounded-full
border-4
border-orange-200
border-t-orange-500
animate-spin
"

/>


</div>


);


}









return (


<div

className="
min-h-screen
bg-gradient-to-br
from-[#FFF8F3]
via-[#FFFDF9]
to-[#F3F4F6]
flex
overflow-hidden
text-slate-800
"

>








{/* ==================================================
 MOBILE OVERLAY
================================================== */}



<AnimatePresence>


{

mobileSidebar &&


<motion.div


initial={{
opacity:0
}}


animate={{
opacity:1
}}


exit={{
opacity:0
}}


onClick={()=>setMobileSidebar(false)}


className="
fixed
inset-0
bg-slate-900/60
backdrop-blur-sm
z-40
lg:hidden
"

/>


}


</AnimatePresence>









{/* ==================================================
 SIDEBAR
================================================== */}



<div


className={`

fixed

lg:static

inset-y-0

left-0

z-50


transform

transition-transform

duration-300


${

mobileSidebar

?

"translate-x-0"

:

"-translate-x-full lg:translate-x-0"

}


`}


>


<Sidebar

closeMobile={()=>setMobileSidebar(false)}

/>



</div>













{/* ==================================================
 MAIN AREA
================================================== */}



<div

className="
flex-1
flex
flex-col
min-w-0
"

>










{/* HEADER */}


<header

className="
sticky
top-0
z-30
"

>


<div

className="
flex
items-center
gap-4
px-4
lg:px-8
py-4

bg-white/95
shadow-md
border-b
border-orange-100
backdrop-blur-xl

"

>






<button


onClick={()=>setMobileSidebar(true)}


className="
lg:hidden
h-11
w-11
rounded-xl
bg-white
bg-orange-500
text-white
shadow-lg
hover:bg-orange-600
transition-all
"


>



<Menu size={22}/>


</button>







<Header/>






</div>



</header>









{/* ==================================================
 PAGE CONTENT
================================================== */}



<main


className="
flex-1
overflow-y-auto
px-6
py-6
lg:px-10
lg:py-8
"

>



<motion.div


initial={{

opacity:0,

y:15

}}



animate={{

opacity:1,

y:0

}}



transition={{
duration:0.45,
ease:"easeOut"
}}



>



<Outlet/>


</motion.div>



</main>









</div>









</div>


);


}