import ProductForm from "../components/ProductForm";

import {
productService
} from "../services/productService";

import {
useNavigate
} from "react-router-dom";


export default function CreateProduct(){


const navigate=useNavigate();



async function submit(data){

await productService.createProduct(data);

navigate("/admin/products");

}



return (

<ProductForm
onSubmit={submit}
/>

)

}