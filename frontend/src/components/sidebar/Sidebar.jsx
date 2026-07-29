import {
  NavLink
} from "react-router-dom";


import {
  motion
} from "framer-motion";


import {
  LogOut,
  ChevronRight,
  X
} from "lucide-react";



import useAuth
from "@/auth/useAuth";


import {
  sidebarConfig
} from "@/config/sidebarConfig";






export default function Sidebar({

closeMobile

}){


const {

user,

role,

logout

}=useAuth();







const menuItems =

sidebarConfig.filter(

(item)=>{


if(!item.roles)

return true;



return item.roles.includes(
role
);


}

);








return (



<aside


className="

h-screen

w-72

bg-white/80

dark:bg-slate-950/90

backdrop-blur-xl


border-r

border-slate-200

dark:border-slate-800


shadow-2xl

flex

flex-col

"

>









{/* ============================
 BRAND
============================ */}



<div


className="

h-20

px-6

flex

items-center

justify-between


border-b

border-slate-200

dark:border-slate-800

"


>



<div

className="flex items-center gap-3"

>


<div

className="

h-11

w-11

rounded-2xl

bg-gradient-to-br

from-blue-600

to-indigo-600

flex

items-center

justify-center

text-white

font-black

shadow-lg

"

>

XF

</div>





<div>

<h1

className="
font-black
text-lg
text-slate-900
dark:text-white
"

>

Xllent Foods

</h1>


<p

className="
text-xs
text-slate-500
"

>

DMS ERP

</p>


</div>


</div>









<button


onClick={closeMobile}


className="
lg:hidden
h-9
w-9
rounded-xl
bg-slate-100
dark:bg-slate-800
flex
items-center
justify-center
"

>


<X size={18}/>


</button>





</div>









{/* ============================
 USER CARD
============================ */}



<div

className="

p-5

"

>


<div

className="

rounded-3xl

p-4


bg-gradient-to-br

from-blue-600

to-indigo-700


text-white

shadow-xl

"


>


<div

className="flex items-center gap-3"

>


<div

className="

h-12

w-12

rounded-full

bg-white/20

flex

items-center

justify-center

font-bold

text-lg

"

>

{

user?.name

?

user.name.charAt(0)

:

"U"

}


</div>





<div>


<p

className="
font-bold
truncate
"

>

{

user?.name ||

"User"

}


</p>


<span

className="
text-xs
bg-white/20
px-2
py-1
rounded-full
"

>

{

role?.replaceAll(
"_",
" "
)

}


</span>


</div>


</div>


</div>


</div>









{/* ============================
 MENU
============================ */}



<nav


className="

flex-1

overflow-y-auto

px-4

space-y-2

"


>


{


menuItems.map(

(item)=>{


const Icon =
item.icon;



return (



<NavLink


key={item.id}


to={item.path}



onClick={closeMobile}




className={({isActive})=>

`

group

flex

items-center

justify-between

px-4

py-3

rounded-2xl

transition-all


${

isActive

?


"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"


:


"text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"

}


`

}



>


<div

className="flex items-center gap-3"

>


{

Icon &&


<Icon

size={20}

/>

}



<span

className="
font-semibold
text-sm
"

>

{item.label}

</span>


</div>






<ChevronRight

size={16}

className="opacity-50"

/>


</NavLink>


);


}


)


}



</nav>









{/* ============================
 LOGOUT
============================ */}



<div

className="p-5"

>


<button


onClick={logout}


className="

w-full

flex

items-center

justify-center

gap-3


rounded-2xl

py-3


bg-red-50

dark:bg-red-900/20


text-red-600


font-bold


hover:bg-red-100


transition

"


>


<LogOut size={18}/>


Logout


</button>


</div>








</aside>



);


}