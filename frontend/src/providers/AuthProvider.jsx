import React,
{
createContext,
useEffect,
useState
}
from "react";


import {
getCurrentUser,
logoutService
}
from "@/features/auth/services/authService";



export const AuthContext=createContext();



const AuthProvider=({children})=>{


const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);




useEffect(()=>{


const storedUser=getCurrentUser();


if(storedUser){

    setUser(storedUser);

}


setLoading(false);



},[]);





const logout=()=>{


logoutService();

setUser(null);


};




const value={

user,

setUser,

logout,

loading

};



return (

<AuthContext.Provider value={value}>

{children}

</AuthContext.Provider>

);


};



export default AuthProvider;