import React,{
useEffect,
useState
} from "react";


import InventoryTable from "./InventoryTable";



const PRODUCT_KEY="xllent_products";



export default function Inventory(){


const [products,setProducts]=useState([]);




const load=()=>{


setProducts(

JSON.parse(

localStorage.getItem(PRODUCT_KEY)

)

||[]

);


};




useEffect(()=>{


load();


window.addEventListener(
"productsUpdated",
load
);


return()=>{


window.removeEventListener(
"productsUpdated",
load
);


};


},[]);






return (

<div className="
space-y-6
">


<h1 className="
text-3xl
font-black
">

Inventory Management

</h1>




<InventoryTable

products={products}

/>



</div>

);


}