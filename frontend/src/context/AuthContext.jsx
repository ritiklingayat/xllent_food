import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import authService from "@/services/authService";


/**
 * Auth Context
 */
export const AuthContext =
  createContext(null);



/**
 * Auth Provider
 */
export const AuthProvider = ({
  children,
}) => {


  const [user, setUser] =
    useState(null);


  const [loading, setLoading] =
    useState(true);



  /**
   * Restore session
   * after browser refresh
   */
  useEffect(() => {

    const session =
      authService.restoreSession();


    if(session){

      setUser(
        session.user
      );

    }


    setLoading(false);


  }, []);





  /**
   * Login
   */
  const login = async (
    credentials
  ) => {


    const response =
      await authService.login(
        credentials
      );


    setUser(
      response.user
    );


    return response;

  };





  /**
   * Logout
   */
  const logout = async () => {


    await authService.logout();


    setUser(null);

  };





  /**
   * Check Auth
   */
  const isAuthenticated =
    Boolean(user);




  const value = {


    user,


    loading,


    login,


    logout,


    isAuthenticated,


  };



  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );

};


export default AuthContext;