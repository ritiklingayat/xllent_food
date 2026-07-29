import {
getStorage,
setStorage,
removeStorage
}
from "@/utils/storage";



const AUTH_KEY="auth";



export const authService={



login(user){


const authData={

user,

token:"demo-token",

role:"SUPER_ADMIN"

};


setStorage(
AUTH_KEY,
authData
);


return authData;


},





logout(){


removeStorage(
AUTH_KEY
);


},





getCurrentUser(){


return getStorage(
AUTH_KEY
);


},





isAuthenticated(){


return Boolean(
getStorage(AUTH_KEY)
);


}



};