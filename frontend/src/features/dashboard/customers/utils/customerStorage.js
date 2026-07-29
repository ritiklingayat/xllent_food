const CUSTOMER_KEY="xllent_customers";



export const getCustomers=()=>{


return (

JSON.parse(

localStorage.getItem(CUSTOMER_KEY)

)

||[]

);


};





export const saveCustomers=(customers)=>{


localStorage.setItem(

CUSTOMER_KEY,

JSON.stringify(customers)

);


window.dispatchEvent(

new Event(
"customersUpdated"
)

);


};