import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";


import analyticsService
from "./analyticsService";





export const fetchAnalytics =
createAsyncThunk(

"analytics/fetch",

async(period)=>{


const response =
await analyticsService.getAnalytics(period);


return response;


}

);






const initialState={


period:"30D",


revenue:{},


sales:{},


customers:{},


products:{},


inventory:{},


orders:{},


profit:{},



loading:false,


error:null


};








const analyticsSlice =
createSlice({

name:"analytics",


initialState,




reducers:{



setAnalyticsPeriod:(state,action)=>{


state.period =
action.payload;


}



},






extraReducers:(builder)=>{


builder



.addCase(
fetchAnalytics.pending,

(state)=>{


state.loading=true;


}

)





.addCase(
fetchAnalytics.fulfilled,

(state,action)=>{


state.loading=false;



Object.assign(

state,

action.payload

);



}

)





.addCase(
fetchAnalytics.rejected,

(state,action)=>{


state.loading=false;


state.error =
action.error.message;


}

);



}



});







export const {
setAnalyticsPeriod

}
=
analyticsSlice.actions;



export default analyticsSlice.reducer;