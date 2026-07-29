import {
createSlice
}
from "@reduxjs/toolkit";


import {
aiMockData
}
from "./data/aiMockData";





const initialState={


loading:false,


insights:
aiMockData


};







const aiSlice=createSlice({


name:"ai",


initialState,



reducers:{



refreshAI:(state)=>{


state.insights =
aiMockData;


}




}



});





export const {

refreshAI

}
=
aiSlice.actions;



export default aiSlice.reducer;