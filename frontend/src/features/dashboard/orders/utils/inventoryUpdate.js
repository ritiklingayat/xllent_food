const PRODUCT_KEY="xllent_products";



export const reduceStock=(items)=>{


const products=

JSON.parse(

localStorage.getItem(PRODUCT_KEY)

)

||[];





const updated=

products.map(product=>{


const orderItem=

items.find(

item=>

item.productId===product.id

);




if(!orderItem)

return product;






return {


...product,


stock:

Number(product.stock)

-

Number(orderItem.quantity)



};



});






localStorage.setItem(

PRODUCT_KEY,

JSON.stringify(updated)

);





window.dispatchEvent(

new Event(
"productsUpdated"
)

);


};