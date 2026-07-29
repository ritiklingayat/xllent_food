import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";


import {
  motion
} from "framer-motion";


import {
  Trophy,
  TrendingUp,
  Package
} from "lucide-react";







const DEFAULT_PRODUCTS = [


{
rank:1,
name:"Premium Chicken Pack",
sales:1250000,
units:2450,
growth:"+24%",
category:"Frozen Foods"
},


{
rank:2,
name:"Spicy Chicken Wings",
sales:980000,
units:1850,
growth:"+18%",
category:"Ready To Cook"
},


{
rank:3,
name:"Chicken Nuggets",
sales:740000,
units:1420,
growth:"+15%",
category:"Snacks"
},


{
rank:4,
name:"Frozen Burger",
sales:520000,
units:980,
growth:"+11%",
category:"Fast Food"
},


{
rank:5,
name:"Chicken Sausages",
sales:420000,
units:760,
growth:"+8%",
category:"Processed"
}



];









const formatCurrency=(value)=>{


if(value>=10000000)

return `₹${(value/10000000).toFixed(1)}Cr`;


return `₹${(value/100000).toFixed(1)}L`;

};









export default function TopProductsWidget({

data

}){


const products =
data || DEFAULT_PRODUCTS;






return (



<motion.section


initial={{
opacity:0,
y:25
}}


animate={{
opacity:1,
y:0
}}



transition={{
duration:.5
}}



className="
rounded-3xl
border
border-slate-200
dark:border-slate-800
bg-white/80
dark:bg-slate-900/80
backdrop-blur-xl
shadow-xl
p-6
"

>








{/* Header */}


<div

className="
flex
justify-between
items-center
mb-6
"

>


<div>


<h2

className="
text-xl
font-bold
dark:text-white
"

>

Top Performing Products

</h2>


<p

className="
text-sm
text-slate-500
dark:text-slate-400
"

>

Best revenue generating products

</p>


</div>





<div

className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-yellow-400
to-orange-500
flex
items-center
justify-center
text-white
shadow-lg
"

>


<Trophy size={24}/>


</div>


</div>









{/* Product Ranking */}



<div

className="
space-y-3
mb-8
"

>


{


products.map((product,index)=>(


<motion.div


key={product.name}


initial={{
opacity:0,
x:-20
}}


animate={{
opacity:1,
x:0
}}


transition={{
delay:index*.1
}}



className="
flex
items-center
justify-between
rounded-2xl
bg-slate-100
dark:bg-slate-800
p-4
"

>


<div

className="
flex
items-center
gap-4
"

>


<div

className={`
h-10
w-10
rounded-xl
flex
items-center
justify-center
font-bold
text-white
${
index===0
?
"bg-gradient-to-br from-yellow-400 to-orange-500"
:
"bg-blue-600"
}
`

}

>


{

index===0

?

<Trophy size={18}/>

:

product.rank

}


</div>





<div>


<h3

className="
font-semibold
dark:text-white
"

>

{product.name}

</h3>



<p

className="
text-xs
text-slate-500
"

>

{product.category}

</p>


</div>


</div>







<div

className="
text-right
"

>


<p

className="
font-bold
dark:text-white
"

>

{formatCurrency(product.sales)}

</p>


<div

className="
flex
items-center
gap-1
text-green-600
text-xs
font-semibold
"

>


<TrendingUp size={14}/>


{product.growth}


</div>


</div>






</motion.div>


))


}



</div>









{/* Chart */}



<div

className="
h-[300px]
"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={products}

>


<CartesianGrid

strokeDasharray="4 4"

opacity={0.2}

/>




<XAxis

dataKey="name"

tick={{fontSize:12}}

hide

/>



<YAxis

tickFormatter={formatCurrency}

/>






<Tooltip

formatter={(value)=>formatCurrency(value)}

/>




<Bar


dataKey="sales"


fill="#2563eb"


radius={[10,10,0,0]}


animationDuration={1200}


/>



</BarChart>



</ResponsiveContainer>



</div>









{/* Summary */}



<div

className="
grid
grid-cols-2
gap-4
mt-6
"

>


<div

className="
rounded-2xl
bg-blue-50
dark:bg-blue-900/20
p-4
flex
items-center
gap-3
"

>


<Package

className="
text-blue-600
"

/>


<div>


<p

className="
text-xs
text-slate-500
"

>

Products

</p>


<h3

className="
font-bold
dark:text-white
"

>

{products.length}

</h3>


</div>


</div>






<div

className="
rounded-2xl
bg-green-50
dark:bg-green-900/20
p-4
"

>


<p

className="
text-xs
text-slate-500
"

>

Total Revenue

</p>


<h3

className="
font-bold
dark:text-white
"

>

{

formatCurrency(

products.reduce(

(sum,item)=>sum+item.sales,

0

)

)

}

</h3>


</div>



</div>








</motion.section>


);


}