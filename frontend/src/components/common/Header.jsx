import {
  Bell,
  Search,
  UserCircle,
  ChevronDown,
  LogOut
} from "lucide-react";


import {
  useState
} from "react";


import useAuth
from "@/auth/useAuth";



export default function Header(){


const {
 user,
 logout
} = useAuth();



const [open,setOpen] =
useState(false);



return (


<header

className="
sticky
top-0
z-40

h-20

flex
items-center
justify-between

px-6

bg-white/80
dark:bg-slate-900/80

backdrop-blur-xl

border-b
border-slate-200
dark:border-slate-800

"

>


{/* Search */}


<div

className="
hidden
md:flex
items-center
gap-3

w-96

px-4
py-2

rounded-2xl

bg-slate-100
dark:bg-slate-800

"

>


<Search

size={18}

className="
text-slate-500
"

/>


<input

type="text"

placeholder="Search..."

className="
bg-transparent
outline-none
w-full
text-sm

text-slate-700
dark:text-white

"

/>


</div>






{/* Right Section */}


<div

className="
flex
items-center
gap-5

"

>


{/* Notification */}


<button


className="
relative

h-11
w-11

rounded-2xl

bg-slate-100

dark:bg-slate-800

flex
items-center
justify-center

"

>


<Bell size={20}/>


<span

className="
absolute
top-2
right-2

h-2
w-2

rounded-full

bg-red-500

"

/>


</button>








{/* User */}


<div

className="
relative

"

>


<button


onClick={()=>setOpen(!open)}


className="
flex
items-center
gap-3

px-3
py-2

rounded-2xl

hover:bg-slate-100

dark:hover:bg-slate-800

"

>


<UserCircle

size={34}

/>



<div

className="
hidden
md:block
text-left

"

>


<p

className="
text-sm
font-bold

dark:text-white

"

>

{
user?.name || 
"Administrator"
}

</p>



<p

className="
text-xs
text-slate-500

"

>

{
user?.role ||
"SUPER ADMIN"
}

</p>


</div>




<ChevronDown

size={16}

/>


</button>








{
open &&

<div

className="
absolute
right-0
mt-3

w-48

rounded-2xl

bg-white

dark:bg-slate-900

shadow-xl

border

border-slate-200

dark:border-slate-700

p-3

"

>


<button

className="
w-full
text-left

px-3
py-2

rounded-xl

hover:bg-slate-100

dark:hover:bg-slate-800

text-sm

"

>

Profile

</button>



<button

className="
w-full
text-left

px-3
py-2

rounded-xl

hover:bg-slate-100

dark:hover:bg-slate-800

text-sm

"

>

Settings

</button>



<button

onClick={()=>{

setOpen(false);

logout();

}}

className="
w-full
text-left

px-3
py-2

rounded-xl

hover:bg-red-50

dark:hover:bg-red-950/30

text-sm
text-red-600

"

>

<span className="flex items-center gap-2">

<LogOut size={16}/>

Logout

</span>

</button>


</div>


}



</div>




</div>





</header>


);


}
