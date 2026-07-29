import React from "react";


export default function RecentProducts({

products=[]

}){


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

Recent Products

</h2>




{

products.slice(-5).reverse().map(product=>(


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



<span>

₹{product.shopPrice}

</span>


</div>


))


}



</div>


);


}