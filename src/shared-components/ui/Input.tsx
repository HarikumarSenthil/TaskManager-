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
  // type?: string;
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
  const [keycode, setKeycode] = useState();
  const [show, setShow] = useState(type);
  const handleKeyPress = (event: any) => {
    const startPos = event.target.selectionStart;
    setKeycode(event.which);
    if (event.which === 32 && startPos === 0) {
      event.preventDefault();
      return;
    }

    if (type === "number") {
      if (["e", "E", "+", "-"].includes(event.key)) {
        event.preventDefault();
        return;
      }
    }
    if (typeof onKeyDown === "function") onKeyDown(event);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShow(show == type ? "text" : type);
  };
  

  return (
    <>
      <div className={`${className} ${!visible && " hidden"}`}>
        <div className={`${label && "flex"} relative `}>
          {label && <label className={`mr-2`}>{label}</label>}
          <input
            className={`text-sm ${
              variant === "border"
                ? "border border-dark input"
                : "border-0 outline-0 w-full"
            } ${disabled && !(error && touched) && "class-disable"} ${
              error && touched && "border border-error"
            } ${inputStyle}`}
            id={name}
            name={name}
            type={type === "password" ? show : type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={handleKeyPress}
            ref={forwardedRef}
            onPaste={
              disablePaste
                ? (e) => e.preventDefault()
                : () => {
                    /** do nothing * */
                  }
            }
            autoComplete={autoComplete}
            onBlur={onBlur}
            value={value}
            {...props}
            maxLength={maxLength}
          />
          {autoSuggest && suggestionList}
          {type === "password" && !disablePaste && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute end-0 eye-icon cursor-pointer top-[-5px] "
            >
              {passwordVisible ? (
                <AiFillEye style={{ color: `blue` }} />
              ) : (
                <AiFillEyeInvisible style={{ color: `red` }} />
              )}
            </span>
          )}
          
        </div>
        {touched && error && <ValidationError error={error} />}
      </div>

      <style jsx>{`
        .fully-rounded {
          border-radius: 5px !important;
        }
        .input {
          border-radius: 5px;
          height: 35px;
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
          padding-left: 1rem;
          width: ${width};
          border: 1.5px solid gray;
        }
        .eye-icon {
          padding: 1rem 24px 24px 0px;
        }
        @media screen and (max-width: 768px) {
          .input {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Input;
