export default function Modal({
open,
title,
children,
close
}){


if(!open)
return null;


return (

<div

className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"

>


<div

className="
bg-white
rounded-2xl
w-[500px]
p-6
shadow-xl
"

>


<div className="
flex
justify-between
mb-5
">


<h2 className="text-xl font-bold">

{title}

</h2>


<button
onClick={close}
>

✕

</button>


</div>



{children}



</div>


</div>


)

}