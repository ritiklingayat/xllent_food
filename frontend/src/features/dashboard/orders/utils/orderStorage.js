const ORDER_KEY="xllent_orders";


export const getOrders=()=>{


return (

JSON.parse(

localStorage.getItem(ORDER_KEY)

)

||[]

);


};



export const saveOrders=(orders)=>{


localStorage.setItem(

ORDER_KEY,

JSON.stringify(orders)

);


window.dispatchEvent(

new Event(
"ordersUpdated"
)

);


};