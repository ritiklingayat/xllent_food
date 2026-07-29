import React, {
useState,
useEffect
} from "react";



const PRODUCT_KEY="xllent_products";




export default function StockUpdateModal({

product,

open,

onClose,

onUpdated

}){



const [type,setType]=useState("add");


const [cartons,setCartons]=useState("");

const [reason,setReason]=useState("");





useEffect(()=>{


if(product){


setCartons("");

setReason("");

setType("add");


}



},[product]);








if(!open || !product)

return null;









const updateStock=()=>{



const quantity = Number(cartons);



if(!quantity || quantity<=0){


alert(
"Enter valid cartons quantity"
);


return;


}







const products =

JSON.parse(

localStorage.getItem(PRODUCT_KEY)

)

||[];






const updatedProducts =


products.map(item=>{


if(

String(item.id)

!==

String(product.id)

)

return item;






let currentStock =

Number(item.stock || 0);





let newStock;





if(type==="add"){


newStock =

currentStock + quantity;


}

else{


newStock =

currentStock - quantity;


if(newStock < 0)

newStock=0;


}






return {


...item,


stock:newStock,



stockHistory:[


...(item.stockHistory || []),



{


type,


quantity,


reason,


date:

new Date()

.toISOString()


}


]



};


});






localStorage.setItem(

PRODUCT_KEY,

JSON.stringify(updatedProducts)

);






window.dispatchEvent(

new Event(
"productsUpdated"
)

);






if(onUpdated)

onUpdated();





alert(
"Stock Updated Successfully"
);




onClose();




};











return (


<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-3xl
p-8
w-full
max-w-md
shadow-xl
">





<h2 className="
text-2xl
font-black
mb-2
">

Update Stock

</h2>




<p className="
text-slate-500
mb-6
">

{product.productName}

</p>









<div className="
space-y-4
">







<select

value={type}

onChange={e=>setType(e.target.value)}

className="
w-full
border
rounded-xl
p-3
"

>


<option value="add">

Add Stock

</option>


<option value="remove">

Remove Stock

</option>


</select>








<div>

<label className="
text-sm
font-semibold
">

Cartons Quantity

</label>


<input


type="number"


value={cartons}


onChange={e=>setCartons(e.target.value)}


placeholder="Enter cartons"


className="
w-full
border
rounded-xl
p-3
mt-1
"


/>


</div>








<div className="
bg-slate-100
rounded-xl
p-4
text-sm
">


<p>

Current Stock:

<strong>

{" "}

{product.stock || 0}

Cartons

</strong>

</p>



<p>

After Update:


<strong>

{" "}

{

type==="add"

?

Number(product.stock || 0)

+

Number(cartons || 0)


:

Math.max(

0,

Number(product.stock || 0)

-

Number(cartons || 0)

)


}

Cartons

</strong>


</p>



</div>








<textarea


value={reason}


onChange={e=>setReason(e.target.value)}


placeholder="Reason (Purchase, Damage, Return etc.)"


className="
w-full
border
rounded-xl
p-3
"


/>








</div>









<div className="
flex
justify-end
gap-3
mt-8
">



<button

onClick={onClose}

className="
px-5
py-3
border
rounded-xl
"

>

Cancel

</button>






<button

onClick={updateStock}

className="
bg-orange-500
text-white
px-6
py-3
rounded-xl
font-bold
"

>

Update Stock

</button>



</div>





</div>


</div>


);


}