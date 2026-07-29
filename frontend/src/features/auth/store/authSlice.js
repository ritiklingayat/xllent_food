import {
  createSlice
} from "@reduxjs/toolkit";





const initialState = {


  /**
   * Authentication
   */

  isAuthenticated:false,

  isInitialized:false,

  isLoading:false,




  /**
   * User
   */

  user:null,


  role:null,


  permissions:[],




  /**
   * Session
   */

  accessToken:null,

  refreshToken:null,




  /**
   * Error
   */

  error:null


};









const authSlice = createSlice({

  name:"auth",


  initialState,



  reducers:{



    /**
     * Initialize auth session
     */


    initialize(
      state,
      action
    ){


      const {

        user=null,

        role=null,

        permissions=[],

        accessToken=null,

        refreshToken=null


      }
      =
      action.payload || {};



      state.user=user;

      state.role=role;

      state.permissions=permissions;


      state.accessToken=accessToken;

      state.refreshToken=refreshToken;



      state.isAuthenticated =
        Boolean(user);


      state.isInitialized=true;


      state.error=null;


    },








    /**
     * Login start
     */


    loginStart(state){


      state.isLoading=true;

      state.error=null;


    },









    /**
     * Login success
     */


    loginSuccess(
      state,
      action
    ){


      const {

        user,

        role,

        permissions=[],

        accessToken,

        refreshToken


      }
      =
      action.payload;



      state.user=user;

      state.role=role;

      state.permissions=permissions;


      state.accessToken=accessToken;

      state.refreshToken=refreshToken;



      state.isAuthenticated=true;

      state.isLoading=false;

      state.error=null;



    },









    /**
     * Login failure
     */


    loginFailure(
      state,
      action
    ){


      state.isLoading=false;

      state.isAuthenticated=false;


      state.error =
        action.payload ||
        "Authentication failed.";



    },









    /**
     * Update user
     */


    updateUser(
      state,
      action
    ){


      state.user={

        ...state.user,

        ...action.payload

      };


    },









    /**
     * Permissions
     */


    setPermissions(
      state,
      action
    ){


      state.permissions =
        action.payload || [];


    },









    /**
     * Token updates
     */


    updateAccessToken(
      state,
      action
    ){


      state.accessToken =
        action.payload;


    },




    updateRefreshToken(
      state,
      action
    ){


      state.refreshToken =
        action.payload;


    },









    /**
     * Logout
     */


    logout(
      state
    ){


      state.user=null;

      state.role=null;

      state.permissions=[];


      state.accessToken=null;

      state.refreshToken=null;



      state.isAuthenticated=false;

      state.isLoading=false;


      state.error=null;



    },









    clearError(
      state
    ){


      state.error=null;


    }



  }


});









/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/


export const {


  initialize,


  loginStart,


  loginSuccess,


  loginFailure,


  logout,


  updateUser,


  updateAccessToken,


  updateRefreshToken,


  setPermissions,


  clearError


}
=
authSlice.actions;







/*
|--------------------------------------------------------------------------
| Compatibility Alias
|--------------------------------------------------------------------------
|
| ExecutiveHeader and UI components use logoutUser.
| Keep both names available.
|
*/


export const logoutUser = logout;









/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/


export const selectAuth =
(state)=>
state.auth;



export const selectUser =
(state)=>
state.auth.user;



export const selectRole =
(state)=>
state.auth.role;



export const selectPermissions =
(state)=>
state.auth.permissions;



export const selectIsAuthenticated =
(state)=>
state.auth.isAuthenticated;



export const selectIsLoading =
(state)=>
state.auth.isLoading;



export const selectAuthError =
(state)=>
state.auth.error;









/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/


export default authSlice.reducer;