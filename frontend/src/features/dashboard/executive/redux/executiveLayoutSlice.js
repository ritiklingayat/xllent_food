import {
createSlice
}
from "@reduxjs/toolkit";


const savedLayout =
JSON.parse(
localStorage.getItem(
"executive-dashboard-layout"
)
);



const initialState={

widgets:

savedLayout || [

{
id:"revenue",
visible:true
},

{
id:"ai",
visible:true
},

{
id:"funnel",
visible:true
},

{
id:"regional",
visible:true
},

{
id:"customers",
visible:true
},

{
id:"products",
visible:true
},

{
id:"cashflow",
visible:true
},

{
id:"profit",
visible:true
},

{
id:"activity",
visible:true
}

]

};



const slice=createSlice({

name:"executiveLayout",

initialState,


reducers:{


updateLayout(
state,
action
){

state.widgets =
action.payload;


localStorage.setItem(

"executive-dashboard-layout",

JSON.stringify(
action.payload
)

);

},



toggleWidget(
state,
action
){

const widget =
state.widgets.find(
x=>x.id===action.payload
);


if(widget)
widget.visible =
!widget.visible;


localStorage.setItem(

"executive-dashboard-layout",

JSON.stringify(
state.widgets
)

);


}


}


});


export const {
updateLayout,
toggleWidget

}=slice.actions;



export default slice.reducer;