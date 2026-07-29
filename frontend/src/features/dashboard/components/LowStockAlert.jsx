import React from "react";


export default function LowStockAlert({

products=[]

}){


const low=

products.filter(

p=>Number(p.stock)<10

);



return (

<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<h2 className="
text-xl
font-bold
mb-5
">

Low Stock Alert

</h2>




{

low.length===0

?

<p className="
text-green-600
font-bold
">

All products stock is healthy ✅

</p>


:


low.map(product=>(


<div

key={product.id}

className="
flex
justify-between
border-b
py-3
">


<span>

{product.productName}

</span>


<span className="
text-red-600
font-bold
">

{product.stock}

Cartons

</span>


</div>


))


}



</div>


);


}