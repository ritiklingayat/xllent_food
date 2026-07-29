import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login } from "../services/authService";

import {
  loginStart,
  loginSuccess,
  loginFailure
} from "../store/authSlice";

import { ROLE_HOME } from "../constants/roles";

/**
 * ============================================================================
 * useLogin
 * ============================================================================
 * Handles the complete login flow.
 * ============================================================================
 */

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,

    onMutate: () => {
      dispatch(loginStart());
    },

    onSuccess: (user) => {
      dispatch(
        loginSuccess({
          user,
          role: user.role,
          permissions: user.permissions ?? [],
          accessToken: null,
          refreshToken: null
        })
      );

      toast.success("Login successful");

      navigate(
        ROLE_HOME[user.role] ?? "/dashboard",
        {
          replace: true
        }
      );
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      dispatch(loginFailure(message));

      toast.error(message);
    }
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,

    isPending: mutation.isPending,

    isSuccess: mutation.isSuccess,

    isError: mutation.isError,

    error: mutation.error,

    reset: mutation.reset
  };
};