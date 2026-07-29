import { forwardRef, useId, useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff, Lock } from "lucide-react";
import clsx from "clsx";

/**
 * ============================================================================
 * PasswordField
 * ============================================================================
 * Reusable password input component.
 *
 * Features:
 * - Show / Hide password
 * - React Hook Form compatible
 * - Accessible
 * - Error state
 * - Disabled state
 * - AutoComplete support
 * - ForwardRef
 * ============================================================================
 */

const PasswordField = forwardRef(
  (
    {
      label = "Password",
      name = "password",
      placeholder = "Enter your password",
      error,
      disabled = false,
      required = false,
      autoComplete = "current-password",
      className,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((previous) => !previous);
    };

    return (
      <div className={clsx("space-y-2", className)}>
        {/* Label */}

        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        {/* Input */}

        <div className="relative">
          {/* Lock Icon */}

          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id={id}
            ref={ref}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : undefined
            }
            className={clsx(
              "w-full rounded-lg border bg-white",
              "py-3 pl-10 pr-12",
              "text-sm outline-none transition",
              "placeholder:text-slate-400",
              "focus:border-blue-600 focus:ring-2 focus:ring-blue-200",
              disabled &&
                "cursor-not-allowed bg-slate-100 opacity-70",
              error
                ? "border-red-500"
                : "border-slate-300"
            )}
            {...props}
          />

          {/* Toggle Button */}

          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* Error */}

        {error && (
          <p
            id={`${id}-error`}
            className="text-sm text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

PasswordField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  className: PropTypes.string
};

export default PasswordField;