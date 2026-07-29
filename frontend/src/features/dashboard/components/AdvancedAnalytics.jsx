import React from "react";


import useAnalytics
from "../analytics/hooks/useAnalytics";


import RevenueAnalytics
from "../analytics/components/RevenueAnalytics";


import ProfitAnalytics
from "../analytics/components/ProfitAnalytics";


import SalesAnalytics
from "../analytics/components/SalesAnalytics";



export default function AdvancedAnalytics(){


const {


revenue,

orders,

salesTrend,

topProducts


}
=
useAnalytics();





return (


<div

className="
space-y-6
"

>


<div

className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
"

>


<RevenueAnalytics

revenue={revenue}

/>



<ProfitAnalytics

orders={orders}

/>



<SalesAnalytics

data={salesTrend}

/>



</div>





<div

className="
bg-white
rounded-3xl
border
p-6
shadow-sm
"

>


<h2

className="
font-black
text-xl
mb-5
"

>

Top Products Analytics

</h2>



{

topProducts?.length ?


topProducts.map(
(product)=>(
<div

key={product.id || product.name}

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


<span className="font-bold">

{product.sales}

</span>


</div>
)

)


:

<p>

No product analytics available

</p>


}



</div>



</div>


);


}