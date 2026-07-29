const products=[

{
name:"Premium Rice",
sales:540
},

{
name:"Wheat Flour",
sales:420
},

{
name:"Cooking Oil",
sales:320
}

];


export default function TopProducts(){


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

Top Products

</h3>


{
products.map(product=>(

<div
key={product.name}
className="
flex
justify-between
py-3
border-b
"
>

<span>
{product.name}
</span>


<strong>
{product.sales}
</strong>


</div>

))
}


</div>

)

}