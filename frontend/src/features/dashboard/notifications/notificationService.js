import {
initialNotifications
}
from "./notificationData";



const STORAGE_KEY =
"xllent_notifications";




export const getNotifications=()=>{


const data =
localStorage.getItem(
STORAGE_KEY
);


return data

?

JSON.parse(data)

:

initialNotifications;


};





export const saveNotifications=(data)=>{


localStorage.setItem(

STORAGE_KEY,

JSON.stringify(data)

);


};





export const createNotification=(payload)=>{


return {


id:Date.now(),


read:false,


time:"Just now",


...payload


};


};