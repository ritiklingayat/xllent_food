import React, {
useState
} from "react";


import StockUpdateModal from "./StockUpdateModal";


import {
calculateInventory
} from "./utils/inventoryUtils";





export default function InventoryTable({

products=[]

}){



const [selectedProduct,setSelectedProduct]=useState(null);







return (

<div className="
space-y-6
">







{/* DESKTOP TABLE */}


<div className="
hidden
md:block
bg-white
rounded-3xl
shadow-sm
overflow-hidden
">



<table className="
w-full
">



<thead className="
bg-slate-100
">


<tr>



<th className="
p-4
text-left
">

Product

</th>




<th className="
p-4
text-left
">

Category

</th>




<th className="
p-4
text-left
">

Cartons

</th>





<th className="
p-4
text-left
">

Packets

</th>





<th className="
p-4
text-left
">

Pieces

</th>





<th className="
p-4
text-left
">

Pricing

</th>





<th className="
p-4
text-left
">

Status

</th>





<th className="
p-4
text-left
">

Action

</th>



</tr>



</thead>









<tbody>


{


products.length===0

?

(

<tr>

<td

colSpan="8"

className="
text-center
p-10
text-slate-500
"

>

No Inventory Found

</td>


</tr>

)


:

products.map(product=>{



const stock =

calculateInventory(product);





const lowStock =

Number(product.stock || 0)

<

10;






return (


<tr

key={product.id}

className="
border-t
hover:bg-slate-50
transition
"

>







{/* PRODUCT */}


<td className="
p-4
">


<div className="
flex
items-center
gap-3
">



{

product.image

?

<img

src={product.image}

alt={product.productName}

className="
w-14
h-14
rounded-xl
object-cover
"

/>


:

<div className="
w-14
h-14
rounded-xl
bg-slate-200
flex
items-center
justify-center
">

📦

</div>

}




<div>


<p className="
font-bold
">

{product.productName}

</p>



<p className="
text-xs
text-slate-500
">

MRP ₹{product.mrp || 0}

</p>



</div>



</div>


</td>









{/* CATEGORY */}


<td className="
p-4
">


<span className="
bg-orange-100
text-orange-700
px-3
py-1
rounded-full
text-sm
font-semibold
">


{

product.categoryName || "N/A"

}



</span>


</td>









{/* CARTONS */}


<td className="
p-4
font-bold
">

{stock.cartons}

</td>







{/* PACKETS */}


<td className="
p-4
">

{stock.packets}

</td>







{/* PIECES */}


<td className="
p-4
">

{stock.pieces}

</td>









{/* PRICING */}


<td className="
p-4
text-sm
">


<p>

Shop:

<strong>

₹{product.shopPrice || 0}

</strong>

</p>



<p>

Distributor:

<strong>

₹{product.distributorPrice || 0}

</strong>

</p>



<p>

Super:

<strong>

₹{product.superStockistPrice || 0}

</strong>

</p>



</td>









{/* STATUS */}


<td className="
p-4
">


{

lowStock

?


<span className="
bg-red-100
text-red-700
px-3
py-1
rounded-full
font-bold
text-sm
">

Low Stock

</span>


:


<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
font-bold
text-sm
">

Available

</span>


}



</td>









{/* ACTION */}


<td className="
p-4
">


<button


onClick={

()=>setSelectedProduct(product)

}


className="
bg-orange-500
text-white
px-4
py-2
rounded-xl
font-bold
hover:bg-orange-600
"

>

Update Stock

</button>



</td>








</tr>



);



})


}



</tbody>




</table>



</div>









{/* MOBILE VIEW */}


<div className="
md:hidden
space-y-4
">


{


products.map(product=>{


const stock=

calculateInventory(product);



return (


<div

key={product.id}

className="
bg-white
rounded-3xl
p-5
shadow-sm
"

>




<div className="
flex
gap-4
items-center
">



{

product.image

?

<img

src={product.image}

className="
w-16
h-16
rounded-xl
object-cover
"

/>


:

<div className="
w-16
h-16
rounded-xl
bg-slate-200
flex
items-center
justify-center
">

📦

</div>


}





<div>


<h3 className="
font-bold
">

{product.productName}

</h3>



<p className="
text-sm
text-slate-500
">

{product.categoryName}

</p>


</div>



</div>








<div className="
grid
grid-cols-3
gap-3
mt-5
text-center
">


<div className="
bg-slate-100
rounded-xl
p-3
">


<p className="
text-xs
">

Cartons

</p>


<strong>

{stock.cartons}

</strong>


</div>





<div className="
bg-slate-100
rounded-xl
p-3
">


<p className="
text-xs
">

Packets

</p>


<strong>

{stock.packets}

</strong>


</div>






<div className="
bg-slate-100
rounded-xl
p-3
">


<p className="
text-xs
">

Pieces

</p>


<strong>

{stock.pieces}

</strong>


</div>



</div>









<button

onClick={()=>setSelectedProduct(product)}

className="
mt-5
w-full
bg-orange-500
text-white
py-3
rounded-xl
font-bold
"

>

Update Stock

</button>







</div>



);


})


}



</div>









{/* MODAL */}



<StockUpdateModal


product={selectedProduct}


open={Boolean(selectedProduct)}


onClose={()=>setSelectedProduct(null)}


/>








</div>


);


}