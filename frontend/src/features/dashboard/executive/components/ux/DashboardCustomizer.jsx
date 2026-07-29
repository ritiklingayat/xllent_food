import {
useState
}
from "react";


import {
Settings
}
from "lucide-react";



const widgets=[

"Revenue",
"AI Summary",
"Sales Funnel",
"Customers",
"Products",
"Cash Flow"

];



const DashboardCustomizer=()=>{


const [
open,
setOpen
]=useState(false);



const [
enabled,
setEnabled
]=useState(
widgets
);



const toggle=(item)=>{


setEnabled(

prev=>

prev.includes(item)

?

prev.filter(
x=>x!==item
)

:

[
...prev,
item
]

);


};



return (

<div

className="relative"

>


<button

onClick={()=>setOpen(!open)}

className="

p-3

rounded-xl

bg-slate-100

dark:bg-slate-800

"

>

<Settings/>

</button>



{
open &&


<div

className="

absolute

right-0

mt-3

w-64

rounded-2xl

bg-white

dark:bg-slate-900

shadow-xl

p-4

z-50

"

>


<h3

className="font-bold mb-3"

>

Customize Dashboard

</h3>



{

widgets.map(
item=>(


<label

key={item}

className="

flex

gap-3

py-2

"

>


<input

type="checkbox"

checked={
enabled.includes(item)
}

onChange={()=>
toggle(item)
}


/>


{item}


</label>


)

)

}



</div>


}


</div>


);


};



export default DashboardCustomizer;