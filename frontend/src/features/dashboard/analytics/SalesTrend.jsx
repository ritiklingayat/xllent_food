import React from "react";


export default function SalesTrend({

data=[]

}){


return (

<div
className="
rounded-3xl
bg-white
border
border-slate-200
shadow-sm
p-6
"
>


<div
className="
flex
items-center
justify-between
mb-5
"
>

<h3
className="
text-lg
font-bold
text-slate-800
"
>

Sales Trend

</h3>


<span
className="
text-sm
text-slate-400
"
>

Monthly

</span>


</div>



<div
className="
h-64
flex
items-center
justify-center
text-slate-400
"
>

No sales data available

</div>


</div>

);


}