const actions=[

"Add Product",

"Create Order",

"Add Customer",

"Generate Report"

];


export default function QuickActions(){


return (

<div
className="
bg-white
rounded-3xl
border
p-6
"
>


<h3
className="
font-black
text-xl
mb-5
"
>

Quick Actions

</h3>


<div
className="
grid
grid-cols-2
gap-4
"
>


{
actions.map(action=>(

<button

key={action}

className="
rounded-2xl
bg-orange-50
hover:bg-orange-500
hover:text-white
p-4
font-bold
transition
"

>

{action}

</button>

))
}


</div>


</div>

)

}