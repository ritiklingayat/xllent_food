import {
  createSlice
} from "@reduxjs/toolkit";


import {
  defaultWidgets
} from "../config/widgetConfig";


import {
  getDashboardLayout,
  saveDashboardLayout
} from "./layoutStorage";





/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/


const cloneWidgets = (data) => {
  return structuredClone
    ? structuredClone(data)
    : JSON.parse(JSON.stringify(data));
};





/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/


const savedLayout = getDashboardLayout();



const initialState = {

  widgets:
    savedLayout?.widgets
      ? savedLayout.widgets
      : cloneWidgets(defaultWidgets),


  drawerOpen:false,


  customizationMode:false

};







/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/


const dashboardLayoutSlice = createSlice({

  name:"dashboardLayout",


  initialState,


  reducers:{



    /*
    |--------------------------------------------------------------------------
    | Drawer
    |--------------------------------------------------------------------------
    */


    toggleDrawer:(state)=>{

      state.drawerOpen =
        !state.drawerOpen;

    },





    /*
    |--------------------------------------------------------------------------
    | Enable / Disable Widget
    |--------------------------------------------------------------------------
    */


    toggleWidget:(state,action)=>{


      const widget =
        state.widgets.find(
          item =>
            item.id === action.payload
        );



      if(widget){

        widget.enabled =
          !widget.enabled;

      }


    },







    /*
    |--------------------------------------------------------------------------
    | Reorder Widgets
    |--------------------------------------------------------------------------
    */


    reorderWidgets:(state,action)=>{


      state.widgets =
        cloneWidgets(
          action.payload
        );


    },







    /*
    |--------------------------------------------------------------------------
    | Role Based Widgets
    |--------------------------------------------------------------------------
    */


    setWidgetsByRole:(state,action)=>{


      const allowedWidgets =
        action.payload;



      state.widgets =
        state.widgets.map(widget=>({

          ...widget,


          enabled:
            allowedWidgets.includes(
              widget.id
            )

        }));


    },








    /*
    |--------------------------------------------------------------------------
    | Customization Mode
    |--------------------------------------------------------------------------
    */


    enableCustomization:(state)=>{

      state.customizationMode=true;

    },




    disableCustomization:(state)=>{

      state.customizationMode=false;

    },








    /*
    |--------------------------------------------------------------------------
    | Reset
    |--------------------------------------------------------------------------
    */


    resetLayout:(state)=>{


      state.widgets =
        cloneWidgets(
          defaultWidgets
        );


      state.customizationMode=false;


    }



  }

});










/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/


export const {

  toggleDrawer,

  toggleWidget,

  reorderWidgets,

  setWidgetsByRole,

  enableCustomization,

  disableCustomization,

  resetLayout


} =
dashboardLayoutSlice.actions;








/*
|--------------------------------------------------------------------------
| Middleware Listener
|--------------------------------------------------------------------------
*/


export const saveDashboardLayoutMiddleware =
store => next => action => {


  const result =
    next(action);



  const watchedActions = [

    "dashboardLayout/toggleWidget",

    "dashboardLayout/reorderWidgets",

    "dashboardLayout/resetLayout",

    "dashboardLayout/setWidgetsByRole"

  ];



  if(
    watchedActions.includes(
      action.type
    )
  ){


    const state =
      store.getState()
        .dashboardLayout;



    saveDashboardLayout({

      widgets:
        cloneWidgets(
          state.widgets
        )

    });


  }



  return result;


};







export default dashboardLayoutSlice.reducer;