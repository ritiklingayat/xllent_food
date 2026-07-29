import React from "react";

import {
  Navigate,
  Outlet,
} from "react-router-dom";


import useAuth from "@/hooks/useAuth";


import {
  hasAnyRole,
} from "@/services/authService";



const RoleRoute = ({
  roles = [],
}) => {


  const {
    user,
    loading,
  } = useAuth();




  if(loading){

    return (
      <div>
        Loading...
      </div>
    );

  }




  if(!user){

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }





  const allowed =
    hasAnyRole(
      roles
    );




  if(!allowed){

    return (

      <Navigate
        to="/403"
        replace
      />

    );

  }




  return <Outlet />;


};


export default RoleRoute;