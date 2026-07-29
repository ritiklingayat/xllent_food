import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import toast from "react-hot-toast";

import { loginUser } from "@/services/authService";
import useAuth from "@/auth/useAuth";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      toast.error(
        "Email and password are required."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      if (!response?.token) {
        throw new Error(
          "Token is missing from login response."
        );
      }

      if (!response?.role) {
        throw new Error(
          "User role is missing from login response."
        );
      }

      const user = {
        id: response.userId,
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        name: `${
          response.firstName || ""
        } ${
          response.lastName || ""
        }`.trim(),
        email: response.email || email,
        role: response.role,
        permissions: response.permissions || [],
      };

      const result = await login({
        token: response.token,
        user,
      });

      if (!result.success) {
        throw new Error(
          result.message || "Login failed."
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      const responseData =
        error.response?.data;

      let message =
        "Invalid email or password.";

      if (
        typeof responseData === "string"
      ) {
        message = responseData;
      } else if (
        responseData?.message
      ) {
        message = responseData.message;
      } else if (
        responseData?.error
      ) {
        message = responseData.error;
      } else if (
        error.message
      ) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-950
        via-blue-900
        to-indigo-950
        px-5
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          shadow-2xl
          p-8
        "
      >
        <div
          className="
            text-center
            mb-8
          "
        >
          <div
            className="
              mx-auto
              h-16
              w-16
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              flex
              items-center
              justify-center
              text-white
              shadow-xl
            "
          >
            <LogIn size={30} />
          </div>

          <h1
            className="
              text-3xl
              font-black
              text-white
              mt-5
            "
          >
            Xllent Foods
          </h1>

          <p
            className="
              text-blue-200
              mt-2
            "
          >
            Distribution Management System
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="
                text-sm
                text-white/80
              "
            >
              Email
            </label>

            <div
              className="
                relative
                mt-2
              "
            >
              <Mail
                className="
                  absolute
                  left-4
                  top-3.5
                  text-slate-400
                "
                size={20}
              />

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  placeholder:text-slate-400
                  pl-12
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="
                text-sm
                text-white/80
              "
            >
              Password
            </label>

            <div
              className="
                relative
                mt-2
              "
            >
              <Lock
                className="
                  absolute
                  left-4
                  top-3.5
                  text-slate-400
                "
                size={20}
              />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  placeholder:text-slate-400
                  pl-12
                  pr-12
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-400
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previousValue) =>
                      !previousValue
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="
                  absolute
                  right-4
                  top-3.5
                  text-slate-300
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              py-3
              font-bold
              text-white
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              shadow-xl
              hover:scale-[1.02]
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:scale-100
            "
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>
        </form>

        <p
          className="
            mt-6
            text-center
            text-sm
            text-blue-100
          "
        >
          Use your registered email and password.
        </p>
      </motion.div>
    </div>
  );
}