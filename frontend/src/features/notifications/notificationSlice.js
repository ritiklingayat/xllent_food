import {
createSlice
}
from "@reduxjs/toolkit";




const initialState={


notifications:[],


unread:0


};





const notificationSlice=createSlice({


name:"notifications",


initialState,



reducers:{



addNotification:(state,action)=>{


state.notifications.unshift(

{


id:
Date.now(),


...action.payload


}

);



state.unread++;




},






markRead:(state)=>{


state.unread=0;


},






removeNotification:(state,action)=>{


state.notifications =
state.notifications.filter(

item=>

item.id!==action.payload

);



}



}


});





export const {


addNotification,

markRead,

removeNotification


}
=
notificationSlice.actions;



export default notificationSlice.reducer;