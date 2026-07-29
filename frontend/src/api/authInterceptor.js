import apiClient
from "./apiClient";


import {
getAuthUser
}
from "@/features/auth/utils/authStorage";



apiClient.interceptors.request.use(

(config)=>{


const user =
getAuthUser();



if(user?.token){


config.headers.Authorization =
`Bearer ${user.token}`;


}


return config;


},


(error)=>
Promise.reject(error)

);





apiClient.interceptors.response.use(

(response)=>response,


(error)=>{


if(error.response?.status===401){


console.warn(
"Session expired"
);


}


return Promise.reject(error);


}

);