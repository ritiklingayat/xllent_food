import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { logout as logoutService } from "../services/authService";
import { logout as logoutAction } from "../store/authSlice";

/**
 * =============================================================================
 * useLogout
 * =============================================================================
 *
 * Enterprise Logout Hook
 *
 * Responsibilities
 * -----------------------------------------------------------------------------
 * • Call logout API
 * • Clear authentication state
 * • Clear React Query cache
 * • Redirect to login page
 * • Display notification
 *
 * =============================================================================
 */

export const useLogout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logoutService,

    onSuccess: async () => {
      /**
       * Clear Redux Authentication State
       */
      dispatch(logoutAction());

      /**
       * Remove all cached queries
       */
      await queryClient.clear();

      /**
       * Redirect to Login
       */
      navigate("/login", {
        replace: true
      });

      /**
       * Success Notification
       */
      toast.success("Logged out successfully.");
    },

    onError: (error) => {
      /**
       * Even if API logout fails,
       * clear local authentication state.
       */
      dispatch(logoutAction());

      queryClient.clear();

      navigate("/login", {
        replace: true
      });

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Session expired. Please login again."
      );
    }
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,

    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,

    error: mutation.error,

    reset: mutation.reset
  };
};

export default useLogout;