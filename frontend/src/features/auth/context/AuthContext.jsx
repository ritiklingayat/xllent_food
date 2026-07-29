import {
authService
}
from "../api/authService";


export const AuthContext =
React.createContext();



export function AuthProvider({
children
}){


const user =
authService.getCurrentUser();



return (

<AuthContext.Provider

value={{

user,

authenticated:
Boolean(user)

}}

>


{children}


</AuthContext.Provider>


)

}