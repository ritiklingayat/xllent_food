import {
Search,
Bell,
User
} from "lucide-react";


export default function Header(){


return (

<header
className="
h-20 bg-white shadow-sm
flex items-center justify-between
px-8
"
>


<div
className="
flex items-center gap-3
bg-gray-100 rounded-xl px-4 py-2
w-96
"
>

<Search size={18}/>

<input
placeholder="Search products..."
className="
bg-transparent outline-none w-full
"
/>


</div>



<div
className="
flex items-center gap-6
"
>


<Bell
className="cursor-pointer"
/>


<div
className="
flex items-center gap-2 cursor-pointer
"
>

<div
className="
h-10 w-10 rounded-full 
bg-orange-500 text-white
flex items-center justify-center
"
>
A
</div>


<span>
Admin
</span>


</div>


</div>


</header>

)

}