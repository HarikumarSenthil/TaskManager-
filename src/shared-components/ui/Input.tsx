import { useEffect, useState } from "react";
import ValidationError from "@/shared-components/components/ValidationError";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  FlagIcon,
  MailCheck,
  MailOpen,
  MailWarning,
  Mails,
} from "lucide-react";

type InputProps = {
  name: string;
  type?: "text" | "number" | "password" | "email" | "date";
  value?: string;
  variant?: "border" | "no-border";
  label?: string;
  autoSuggest?: boolean;
  suggestionList?: JSX.Element;
  width?: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  pattern?: RegExp;
  maskingPattern?: any;
  forwardedRef?: any;
  autoComplete?: string;
  className?: string;
  inputStyle?: string;
  feildStatus?: string;
  disabled?: boolean;
  maxLength?: number;
  disablePaste?: boolean;
  visible?: boolean;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (...args: unknown[]) => unknown;
};

const Input = ({
  name,
  variant = "border",
  label,
  type = "text",
  value,
  autoSuggest,
  suggestionList,
  width = "100%",
  inputStyle,
  error,
  placeholder,
  forwardedRef,
  touched = false,
  className,
  maxLength,
  pattern,
  maskingPattern,
  onChange,
  onKeyDown,
  onBlur,
  autoComplete = "off",
  visible = true,
  disablePaste,
  disabled = false,
  feildStatus,
  ...props
}: InputProps): JSX.Element => {
  const [show, setShow] = useState(type);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [hasText, setHasText] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShow(show === type ? "text" : type);
  };

  useEffect(() => {
    if (value && value.length > 0) {
      setHasText(true);
    } else {
      setHasText(false);
    }
  }, [value]);

  return (
    <div className={`${className} ${!visible && "hidden"} relative`}>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          className={`text-sm w-full p-2 rounded-md ${
            variant === "border"
              ? `border ${hasText ? "border-green-500" : error ? "border-red-500" : "border-gray-300"} focus:ring focus:ring-green-500`
              : "border-0 outline-none"
          } ${disabled && "opacity-50 cursor-not-allowed border-black"} $
          } ${inputStyle}`}
          id={name}
          name={name}
          type={type === "password" ? show : type}
          placeholder={error ? error : placeholder}
          disabled={disabled}
          onChange={(e) => {
            onChange?.(e);
            setHasText(e.target.value.length > 0);
          }}
          onKeyDown={onKeyDown}
          ref={forwardedRef}
          onPaste={disablePaste ? (e) => e.preventDefault() : undefined}
          autoComplete={autoComplete}
          onBlur={onBlur}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {type === "password" && !disablePaste && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 cursor-pointer"
          >
            {passwordVisible ? (
              <AiFillEye className="text-blue-500" />
            ) : (
              <AiFillEyeInvisible className="text-red-500" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
