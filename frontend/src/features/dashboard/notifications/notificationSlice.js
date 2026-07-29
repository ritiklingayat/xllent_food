import {
createSlice
}
from "@reduxjs/toolkit";



const initialState={


notifications:[],


unreadCount:0


};





const notificationSlice=createSlice({


name:"notifications",


initialState,



reducers:{



addNotification:(state,action)=>{


state.notifications.unshift({

id:
Date.now(),

read:false,

createdAt:
new Date().toISOString(),

...action.payload

});


state.unreadCount++;

},






markAllRead:(state)=>{


state.notifications =
state.notifications.map(
item=>({

...item,

read:true

})

);


state.unreadCount=0;


},





clearNotifications:(state)=>{


state.notifications=[];

state.unreadCount=0;


}



}



});





export const {

addNotification,

markAllRead,

clearNotifications


}
=
notificationSlice.actions;



export default notificationSlice.reducer;