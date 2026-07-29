import {
createSlice
}
from "@reduxjs/toolkit";



import {
loadConversation
}
from "../aiMemory";





const initialState={


messages:
loadConversation(),



typing:false,


open:false



};






const aiChatSlice=createSlice({


name:"aiChat",


initialState,



reducers:{



openAI:(state)=>{


state.open=true;


},





closeAI:(state)=>{


state.open=false;


},






addMessage:(state,action)=>{


state.messages.push(
action.payload
);


},





setTyping:(state,action)=>{


state.typing=
action.payload;


},






clearChat:(state)=>{


state.messages=[];


}



}



});







export const {


openAI,

closeAI,

addMessage,

setTyping,

clearChat


}
=
aiChatSlice.actions;



export default aiChatSlice.reducer;