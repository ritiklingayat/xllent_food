import {X} from "lucide-react";


export default function Drawer({
open,
onClose,
title,
children
}){


if(!open)
return null;


return (

<div
className="
fixed inset-0
bg-black/40
z-50
flex justify-end
"
>


<div
className="
w-full
md:w-[450px]
bg-white
h-full
shadow-2xl
p-6
animate-slide
"
>


<div
className="
flex justify-between
items-center
mb-6
"
>


<h2
className="
text-2xl font-bold
"
>

{title}

</h2>


<button
onClick={onClose}
>

<X/>

</button>


</div>


{children}


</div>


</div>


)

}