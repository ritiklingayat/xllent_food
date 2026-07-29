import {
createSlice
}
from "@reduxjs/toolkit";



const initialState={

activities:[]

};



const activitySlice=createSlice({

name:"activity",

initialState,


reducers:{


addActivity:(state,action)=>{


state.activities.unshift(
action.payload
);


}



}



});



export const {
addActivity
}
=
activitySlice.actions;


export default activitySlice.reducer;