import {
useState
}
from "react";


import {
getProducts,
addProduct,
removeProduct
}
from "../services/productStorage";


import ProductTable
from "../components/ProductTable";



export default function Products(){


const [products,setProducts]=useState(
getProducts()
);



const create=()=>{


addProduct({

name:"Groundnut Oil",

price:150,

stock:100

});


setProducts(
getProducts()
);


};



return (

<div>


<div className="
flex justify-between mb-5
">


<h1 className="text-3xl font-bold">

Products

</h1>



<button
onClick={create}

className="
bg-green-600
text-white
px-4 py-2 rounded
">

Add Product

</button>


</div>


<ProductTable

products={products}

deleteProduct={(id)=>{

removeProduct(id);

setProducts(
getProducts()
)

}}

/>


</div>

)

}