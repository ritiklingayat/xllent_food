import {
addNotification
}
from "@/features/dashboard/notifications/notificationSlice";



export const startMockRealtime=(store)=>{


setInterval(()=>{


store.dispatch(

addNotification({

type:"NEW_ORDER",

title:"New Demo Order",

message:
"Distributor placed new order",

priority:"HIGH"


})

);


},10000);


};