import {
Package,
ArrowUpRight
}
from "lucide-react";


const PRODUCTS=[

{
name:"Premium Pizza",
demand:"High",
growth:"+35%"
},

{
name:"Frozen Snacks",
demand:"Medium",
growth:"+18%"
},

{
name:"Beverages",
demand:"Stable",
growth:"+5%"
}

];



const DemandPrediction=()=>{


return (

<div

className="
rounded-3xl
bg-white/80
dark:bg-slate-900/80
border
border-white/20
shadow-xl
p-6
"

>


<h2 className="
text-xl
font-bold
dark:text-white
flex
gap-2
items-center
mb-5
">

<Package
className="text-blue-500"
/>

Demand Prediction


</h2>



<div className="
space-y-4
">


{

PRODUCTS.map(product=>(


<div

key={product.name}

className="
flex
justify-between
items-center
rounded-2xl
p-4
bg-slate-100
dark:bg-slate-800
"

>


<div>

<p className="
font-semibold
dark:text-white
">

{product.name}

</p>


<p className="
text-xs
text-slate-500
">

Demand: {product.demand}

</p>


</div>



<div className="
flex
items-center
gap-1
text-green-500
font-bold
">

<ArrowUpRight size={16}/>

{product.growth}


</div>


</div>


))


}


</div>



</div>

);


};


export default DemandPrediction;