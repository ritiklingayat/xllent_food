const KEY="products";


export const getProducts=()=>{

return JSON.parse(
localStorage.getItem(KEY)
)||[];

};



export const saveProducts=(data)=>{

localStorage.setItem(
KEY,
JSON.stringify(data)
)

};



export const addProduct=(product)=>{


saveProducts([

...getProducts(),

{
...product,
id:Date.now()
}

])


};



export const removeProduct=(id)=>{


saveProducts(

getProducts()
.filter(
p=>p.id!==id
)

)

};