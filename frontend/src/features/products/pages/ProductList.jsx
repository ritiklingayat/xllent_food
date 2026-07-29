import {
useEffect,
useState
} from "react";

import ProductTable from "../components/ProductTable";

import {productService}
from "../services/productService";

import {useNavigate}
from "react-router-dom";



export default function ProductList(){


const [products,setProducts]=useState([]);

const navigate=useNavigate();



useEffect(()=>{

loadProducts();

},[]);



async function loadProducts(){

const data=
await productService.fetchProducts();

setProducts(data);

}



async function deleteProduct(id){

await productService.deleteProduct(id);

loadProducts();

}



return (

<div>


<div className="
flex justify-between mb-6
">


<h1 className="
text-2xl font-bold
">

Products

</h1>



<button

onClick={()=>
navigate("/admin/products/create")
}

className="
bg-blue-600
text-white
px-4 py-2 rounded
"

>

Add Product

</button>


</div>



<ProductTable

products={products}

onEdit={
id=>navigate(
`/admin/products/${id}/edit`
)
}

onDelete={deleteProduct}

/>



</div>

)

}