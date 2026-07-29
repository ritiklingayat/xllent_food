import React, {
useEffect,
useState
} from "react";


import StatsCard from "./components/StatsCard";

import SalesChart from "./components/SalesChart";

import ProductAnalytics from "./components/ProductAnalytics";

import RecentProducts from "./components/RecentProducts";

import LowStockAlert from "./components/LowStockAlert";

import QuickActions from "./components/QuickActions";



const PRODUCT_KEY="xllent_products";

const CATEGORY_KEY="xllent_categories";




export default function Dashboard(){


const [products,setProducts]=useState([]);

const [categories,setCategories]=useState([]);





const loadData=()=>{


setProducts(

JSON.parse(

localStorage.getItem(PRODUCT_KEY)

)

||[]

);



setCategories(

JSON.parse(

localStorage.getItem(CATEGORY_KEY)

)

||[]

);



};





useEffect(()=>{


loadData();



window.addEventListener(
"productsUpdated",
loadData
);



window.addEventListener(
"categoriesUpdated",
loadData
);



return()=>{


window.removeEventListener(
"productsUpdated",
loadData
);


window.removeEventListener(
"categoriesUpdated",
loadData
);


};


},[]);





const activeProducts=

products.filter(

p=>p.status==="Active"

).length;





const totalStock=

products.reduce(

(sum,p)=>

sum+

Number(p.stock||0),

0

);






return (


<div className="
space-y-8
">





{/* HERO */}


<div className="
bg-gradient-to-r
from-orange-500
to-orange-400
rounded-3xl
p-8
text-white
shadow-xl
">


<h1 className="
text-4xl
font-black
">

Welcome Admin 👋

</h1>


<p className="
mt-2
text-orange-50
">

Manage your complete food distribution system

</p>


</div>







{/* KPI */}


<div className="
grid
sm:grid-cols-2
xl:grid-cols-5
gap-6
">


<StatsCard

title="Products"

value={products.length}

icon="📦"

/>



<StatsCard

title="Active"

value={activeProducts}

icon="✅"

/>




<StatsCard

title="Categories"

value={categories.length}

icon="🗂️"

/>




<StatsCard

title="Stock Cartons"

value={totalStock}

icon="🚚"

/>




<StatsCard

title="Low Stock"

value={
products.filter(
p=>Number(p.stock)<10
).length
}

icon="⚠️"

/>



</div>








{/* CHART */}


<SalesChart />









<div className="
grid
xl:grid-cols-2
gap-6
">


<ProductAnalytics

products={products}

/>



<LowStockAlert

products={products}

/>


</div>








<RecentProducts

products={products}

/>






<QuickActions />






</div>


);


}