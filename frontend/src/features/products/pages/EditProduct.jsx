import {
useEffect,
useState
} from "react";

import ProductForm from "../components/ProductForm";

import {
productService
} from "../services/productService";

import {
useParams,
useNavigate
} from "react-router-dom";



export default function EditProduct(){


const {id}=useParams();

const navigate=useNavigate();

const [product,setProduct]=useState(null);



useEffect(()=>{

load();

},[]);



async function load(){

const data=
await productService.fetchProduct(id);

setProduct(data);

}



async function submit(data){

await productService.updateProduct(
id,
data
);


navigate("/admin/products");

}



if(!product)
return <p>Loading...</p>



return (

<ProductForm

initialData={product}

onSubmit={submit}

/>

)

}