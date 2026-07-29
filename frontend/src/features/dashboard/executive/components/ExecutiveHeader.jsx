import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";


import {
  ChevronDown,
  ChevronRight,
  Clock3,
  LogOut,
  Menu,
  Moon,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCircle,
  X,
  Zap,
} from "lucide-react";


import {
  logoutUser,
} from "@/features/auth/store/authSlice";




export default function ExecutiveHeader(){


const dispatch = useDispatch();

const navigate = useNavigate();

const location = useLocation();



const auth =
useSelector(
(state)=>state.auth || {}
);


const user =
auth?.user || {};




const [time,setTime] =
useState(
new Date()
);



const [search,setSearch] =
useState("");

const [mobile,setMobile] =
useState(false);

const [profile,setProfile] =
useState(false);

const [refresh,setRefresh] =
useState(false);


const [dark,setDark] =
useState(()=>{


return (
localStorage.getItem("theme")==="dark"
||
document.documentElement.classList.contains("dark")
);


});





/*
 Clock updater
*/

useEffect(()=>{


const timer =
setInterval(()=>{

setTime(
new Date()
);

},1000);



return ()=>clearInterval(timer);



},[]);





/*
 User
*/


const userName =
user?.name
||
"Super Admin";


const role =
user?.role
||
"SUPER ADMIN";



const initial =
String(userName)
.charAt(0)
.toUpperCase();





/*
 Safe Date Formatting
*/


const clock =
time instanceof Date
?
time.toLocaleTimeString(
"en-IN",
{
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
}
)
:
"";



const date =
time instanceof Date
?
time.toLocaleDateString(
"en-IN",
{
weekday:"short",
day:"numeric",
month:"short",
year:"numeric"
}
)
:
"";







/*
 Breadcrumb
*/


const breadcrumbs =
useMemo(()=>{


return location.pathname
.split("/")
.filter(Boolean)
.map(
(item,index)=>({


label:
item
.replaceAll("-"," ")
.replace(
(/\b\w/g),
char=>char.toUpperCase()
),


path:
"/"+
location.pathname
.split("/")
.filter(Boolean)
.slice(
0,
index+1
)
.join("/")


})

);


},[
location.pathname
]);






/*
 Theme
*/


const toggleTheme=()=>{


const next =
!dark;


setDark(next);



if(next){


document.documentElement.classList.add(
"dark"
);


localStorage.setItem(
"theme",
"dark"
);


}
else{


document.documentElement.classList.remove(
"dark"
);


localStorage.setItem(
"theme",
"light"
);


}



};








/*
 Logout
*/


const logout=()=>{


dispatch(
logoutUser()
);


localStorage.clear();


navigate(
"/login",
{
replace:true
}
);


};






return (


<motion.header


initial={{
opacity:0,
y:-20
}}


animate={{
opacity:1,
y:0
}}


className="
sticky
top-0
z-50
px-4
lg:px-8
pt-4
"


>


<div

className="
rounded-3xl
border
border-slate-200
dark:border-slate-800
bg-white/80
dark:bg-slate-950/80
backdrop-blur-xl
shadow-xl
"


>


<div

className="
flex
items-center
gap-4
p-5
"

>



<button

onClick={()=>setMobile(!mobile)}

className="
lg:hidden
p-3
rounded-2xl
bg-slate-100
dark:bg-slate-800
"

>

{
mobile
?
<X size={20}/>
:
<Menu size={20}/>
}


</button>







<div className="flex-1">


<div

className="
hidden
md:flex
items-center
gap-2
text-xs
text-slate-500
"

>


{
breadcrumbs.map(
(item,index)=>(

<div
key={item.path}
className="
flex
items-center
gap-2
"
>


<span>
{item.label}
</span>


{
index !== breadcrumbs.length-1
&&
<ChevronRight size={14}/>
}


</div>


)
)
}


</div>






<div

className="
flex
items-center
gap-3
mt-2
"

>


<div

className="
h-11
w-11
rounded-2xl
bg-gradient-to-br
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
shadow-lg
"

>

<Sparkles size={22}/>

</div>




<div>


<h1

className="
text-xl
lg:text-2xl
font-black
text-slate-900
dark:text-white
"

>

Executive Dashboard

</h1>



<p

className="
text-xs
text-slate-500
dark:text-slate-400
"

>

AI Powered Business Intelligence

</p>



</div>


</div>


</div>







<form

onSubmit={(e)=>{

e.preventDefault();

if(search.trim()){

navigate(
`/dashboard/search?q=${search}`
);

}

}}

className="
hidden
lg:block
relative
w-72
"


>


<Search

size={18}

className="
absolute
left-3
top-3
text-slate-400
"

/>



<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="
Search dashboard...
"


className="
w-full
rounded-2xl
bg-slate-100
dark:bg-slate-800
py-2.5
pl-10
pr-4
outline-none
dark:text-white
focus:ring-2
focus:ring-blue-500
"

/>


</form>









<div

className="
hidden
xl:flex
items-center
gap-3
px-4
py-2
rounded-2xl
bg-slate-100
dark:bg-slate-800
"

>


<Clock3 size={20}/>


<div>

<p className="text-sm font-bold">

{clock}

</p>


<p className="text-xs text-slate-500">

{date}

</p>


</div>


</div>








<div

className="
hidden
lg:flex
items-center
gap-3
"

>





<button

onClick={()=>{

setRefresh(true);

setTimeout(
()=>setRefresh(false),
1000
);

}}

className="
p-3
rounded-2xl
bg-slate-100
dark:bg-slate-800
"

>

<RefreshCcw

size={18}

className={
refresh
?
"animate-spin"
:
""
}

/>


</button>






<button

className="
p-3
rounded-2xl
bg-gradient-to-br
from-blue-600
to-purple-600
text-white
"

>

<Zap size={20}/>

</button>







<button

onClick={toggleTheme}

className="
p-3
rounded-2xl
bg-slate-100
dark:bg-slate-800
"

>

{

dark
?
<Sun size={20}/>
:
<Moon size={20}/>

}


</button>








<div className="relative">


<button

onClick={()=>setProfile(!profile)}

className="
flex
items-center
gap-3
p-2
rounded-2xl
bg-slate-100
dark:bg-slate-800
"


>


<div

className="
h-10
w-10
rounded-full
bg-gradient-to-br
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
font-bold
"

>

{initial}

</div>


<ChevronDown size={18}/>


</button>







{

profile &&

<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

className="
absolute
right-0
mt-3
w-72
rounded-3xl
bg-white
dark:bg-slate-900
shadow-2xl
border
border-slate-200
dark:border-slate-700
p-5
"

>



<div

className="
flex
items-center
gap-3
border-b
pb-4
"

>


<div

className="
h-14
w-14
rounded-full
bg-gradient-to-br
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
text-xl
font-bold
"

>

{initial}

</div>


<div>

<h3 className="
font-bold
dark:text-white
">

{userName}

</h3>


<p className="text-xs text-slate-500">

{role}

</p>


</div>


</div>






<button className="
flex
gap-3
items-center
w-full
p-3
mt-3
rounded-xl
hover:bg-slate-100
dark:hover:bg-slate-800
">

<UserCircle size={18}/>

Profile

</button>





<button className="
flex
gap-3
items-center
w-full
p-3
rounded-xl
hover:bg-slate-100
dark:hover:bg-slate-800
">

<ShieldCheck size={18}/>

Security

</button>






<button

onClick={logout}

className="
flex
gap-3
items-center
w-full
p-3
rounded-xl
text-red-500
hover:bg-red-50
"

>


<LogOut size={18}/>

Logout


</button>



</motion.div>


}



</div>


</div>


</div>






{
mobile &&

<div

className="
lg:hidden
border-t
p-5
"

>


<button

onClick={logout}

className="
flex
gap-3
text-red-500
"

>

<LogOut size={18}/>

Logout


</button>


</div>


}



</div>


</motion.header>


);


}