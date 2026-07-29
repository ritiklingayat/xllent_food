import React from "react";



export default function ProductAnalytics({

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

Product Analytics

</h2>




<div className="
space-y-4
">


<p>

Total Products:

<strong>

{" "}

{products.length}

</strong>

</p>



<p>

Active Products:

<strong>

{" "}

{

products.filter(

p=>p.status==="Active"

).length

}

</strong>

</p>




<p>

Average Stock:

<strong>

{" "}

{

Math.round(

products.reduce(

(a,b)=>

a+Number(b.stock||0),

0

)/

(products.length||1)

)

}

</strong>

</p>




</div>



</div>


);


}