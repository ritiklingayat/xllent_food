import {
createSlice,
createAsyncThunk,
}
from "@reduxjs/toolkit";


import {
getExecutiveDashboard,
}
from "./executiveApi";







export const fetchExecutiveDashboard =
createAsyncThunk(

"executive/fetchDashboard",



async(_, {rejectWithValue})=>{


try{


const response =
await getExecutiveDashboard();


return response;


}

catch(error){


return rejectWithValue(

error?.response?.data?.message ||

error?.message ||

"Failed to fetch executive dashboard"

);


}



}


);








const initialState = {


dashboard:null,


loading:false,


error:null,


lastUpdated:null,


};








const executiveSlice =
createSlice({

name:"executive",


initialState,



reducers:{



clearExecutiveError:(state)=>{

state.error=null;

},




resetExecutiveDashboard:(state)=>{

state.dashboard=null;

state.loading=false;

state.error=null;

state.lastUpdated=null;

},



},








extraReducers:(builder)=>{


builder



.addCase(

fetchExecutiveDashboard.pending,


(state)=>{


state.loading=true;

state.error=null;


}


)





.addCase(

fetchExecutiveDashboard.fulfilled,


(state,action)=>{


state.loading=false;



state.dashboard =

action.payload?.data

??

action.payload;



state.lastUpdated =
Date.now();



}


)







.addCase(

fetchExecutiveDashboard.rejected,


(state,action)=>{


state.loading=false;


state.error =

action.payload ||

"Unable to load executive dashboard";


}


);




}



});








export const {


clearExecutiveError,

resetExecutiveDashboard,


}

=
executiveSlice.actions;






export default executiveSlice.reducer;