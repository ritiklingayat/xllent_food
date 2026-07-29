import {
createSlice,
createAsyncThunk
}
from "@reduxjs/toolkit";


import dashboardService
from "./dashboardService";




export const fetchDashboard =
createAsyncThunk(

"dashboard/load",

async(range)=>{


const data =
await dashboardService.getDashboard(range);


return data;


}

);





const initialState={


stats:{


revenue:0,

orders:0,

products:0,

customers:0

},



salesTrend:[],


orderStatus:[],


topProducts:[],


recentOrders:[],


lowStock:[],



dateRange:{


type:"30D",

start:null,

end:null


},



loading:false,


error:null


};






const dashboardSlice=createSlice({


name:"dashboard",


initialState,



reducers:{



setDateRange:(state,action)=>{


state.dateRange =
action.payload;


},



resetDashboard:(state)=>{


Object.assign(
state,
initialState
);


}


},



extraReducers:(builder)=>{


builder



.addCase(
fetchDashboard.pending,

(state)=>{


state.loading=true;

state.error=null;


}

)




.addCase(
fetchDashboard.fulfilled,

(state,action)=>{


state.loading=false;


Object.assign(
state,
action.payload
);


}

)




.addCase(
fetchDashboard.rejected,

(state,action)=>{


state.loading=false;

state.error =
action.error.message;


}

);



}



});





export const {


setDateRange,

resetDashboard


}
=
dashboardSlice.actions;



export default dashboardSlice.reducer;