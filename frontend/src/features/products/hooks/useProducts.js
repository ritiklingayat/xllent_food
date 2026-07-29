import {
getProducts,
addProduct,
updateProduct,
deleteProduct
}
from "../services/productStorage";


import {useState} from "react";


export default function useProducts(){

const [products,setProducts]=useState(
getProducts()
);



const create=(data)=>{

addProduct(data);

setProducts(getProducts());

};



const edit=(id,data)=>{

updateProduct(id,data);

setProducts(getProducts());

};



const remove=(id)=>{

deleteProduct(id);

setProducts(getProducts());

};



return {
products,
create,
edit,
remove
};

}