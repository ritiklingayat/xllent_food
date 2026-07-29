import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { ROLES } from "@/config/roles";

// ======================================================
// AUTH CONTEXT
// ======================================================

export const AuthContext = createContext(null);

// ======================================================
// STORAGE KEYS
// ======================================================

const STORAGE_KEYS = {
  TOKEN: "xllent_token",
  USER: "xllent_user",
};

// ======================================================
// DEFAULT USER
// ======================================================

const DEFAULT_USER = {
  id: null,
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  role: null,
  permissions: [],
};

// ======================================================
// AUTH PROVIDER
// ======================================================

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(DEFAULT_USER);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================================================
  // LOAD SAVED SESSION
  // ======================================================

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(
        STORAGE_KEYS.TOKEN
      );

      const savedUser = localStorage.getItem(
        STORAGE_KEYS.USER
      );

      if (savedToken && savedUser) {
        const parsedUser = JSON.parse(savedUser);

        setToken(savedToken);
        setUser({
          ...DEFAULT_USER,
          ...parsedUser,
          permissions: parsedUser.permissions || [],
        });
      } else {
        setToken(null);
        setUser(DEFAULT_USER);
      }
    } catch (error) {
      console.error("Auth restore error:", error);

      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      setToken(null);
      setUser(DEFAULT_USER);
    } finally {
      setLoading(false);
    }
  }, []);

  // ======================================================
  // REDIRECT USER BASED ON ROLE
  // ======================================================

  const redirectByRole = useCallback(
    (role) => {
      switch (role) {
        case ROLES.SUPER_ADMIN:
        case ROLES.ADMIN:
          navigate("/dashboard", {
            replace: true,
          });
          break;

        case ROLES.SUPER_STOCKIST:
          navigate("/dashboard/super-stockist", {
            replace: true,
          });
          break;

        case ROLES.DISTRIBUTOR:
          navigate("/dashboard/distributor", {
            replace: true,
          });
          break;

        case ROLES.WHOLESALER:
          navigate("/dashboard/wholesaler", {
            replace: true,
          });
          break;

        case ROLES.ASM:
          navigate("/dashboard/asm", {
            replace: true,
          });
          break;

        case ROLES.SO:
          navigate("/dashboard/sales", {
            replace: true,
          });
          break;

        default:
          navigate("/dashboard", {
            replace: true,
          });
      }
    },
    [navigate]
  );

  // ======================================================
  // LOGIN
  // ======================================================

  const login = useCallback(
    async ({ token: newToken, user: newUser }) => {
      try {
        if (!newToken) {
          throw new Error(
            "Token is missing from login response."
          );
        }

        if (!newUser) {
          throw new Error(
            "User information is missing from login response."
          );
        }

        if (!newUser.role) {
          throw new Error(
            "User role is missing from login response."
          );
        }

        const normalizedUser = {
          ...DEFAULT_USER,
          ...newUser,
          permissions: newUser.permissions || [],
        };

        localStorage.setItem(
          STORAGE_KEYS.TOKEN,
          newToken
        );

        localStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(normalizedUser)
        );

        setToken(newToken);
        setUser(normalizedUser);

        toast.success("Login successful");

        redirectByRole(normalizedUser.role);

        return {
          success: true,
          user: normalizedUser,
        };
      } catch (error) {
        console.error("Login error:", error);

        toast.error(
          error.message || "Login failed."
        );

        return {
          success: false,
          message:
            error.message || "Login failed.",
        };
      }
    },
    [redirectByRole]
  );

  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    setToken(null);
    setUser(DEFAULT_USER);

    toast.success("Logged out successfully");

    navigate("/login", {
      replace: true,
    });
  }, [navigate]);

  // ======================================================
  // ROLE CHECK
  // ======================================================

  const hasRole = useCallback(
    (...roles) => {
      if (!user?.role) {
        return false;
      }

      return roles.includes(user.role);
    },
    [user?.role]
  );

  // ======================================================
  // PERMISSION CHECK
  // ======================================================

  const hasPermission = useCallback(
    (permission) => {
      if (!permission) {
        return true;
      }

      if (!Array.isArray(user?.permissions)) {
        return false;
      }

      return user.permissions.includes(permission);
    },
    [user?.permissions]
  );

  // ======================================================
  // AUTH CHECK
  // ======================================================

  const isAuthenticated = Boolean(
    token && user?.role
  );

  // ======================================================
  // CONTEXT VALUE
  // ======================================================

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      hasRole,
      hasPermission,
      isAuthenticated,
    }),
    [
      user,
      token,
      loading,
      login,
      logout,
      hasRole,
      hasPermission,
      isAuthenticated,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}