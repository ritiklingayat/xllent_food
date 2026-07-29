export const API_ENDPOINTS = {


AUTH:{


LOGIN:"/auth/login",


FORGOT_PASSWORD:"/auth/forgot-password",


RESET_PASSWORD:"/auth/reset-password"


},



PRODUCTS:{


LIST:"/products",


CREATE:"/products",


UPDATE:(id)=>`/products/${id}`,


DELETE:(id)=>`/products/${id}`


}


};