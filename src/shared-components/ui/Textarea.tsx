import { MailCheck, MailOpen, MailWarning, Mails } from "lucide-react";
import ValidationError from "../components/ValidationError";

type TextAreaProps = {
  name: string;
  value?: string;
  label?: unknown;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  forwardedRef?: any;
  classname: string;
  width?: string;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disablePaste?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  pattern?: RegExp;
  maskingPattern?: any;
  autoComplete?: string;
  readOnly?: boolean;
  feildStatus?:string
  onKeyDown?: (...args: unknown[]) => unknown;
};

const TextArea = ({
  name,
  value,
  label,
  placeholder = "Type here",
  forwardedRef,
  error,
  touched = false,
  classname,
  width="100%",
  onChange,
  disablePaste,
  disabled=false,
  maxLength,
  pattern,
  maskingPattern,
  onKeyDown,
  onBlur,
  autoComplete = "off",
  rows = 8,
  readOnly,
  feildStatus,
  ...props
}: TextAreaProps): JSX.Element => {
  const handleKeyPress = (event: any) => {
    const startPos = event.target.selectionStart;
    if (event.which === 32 && startPos === 0) {
      event.preventDefault();
      return;
    }

    if (typeof onKeyDown === "function") onKeyDown(event);
  };
  
  

  return (
    <>
      <div className="relative">
        <textarea
          className={`border textarea rounded-lg pt-2 bg-white ${classname} ${
            readOnly && "class-disable"
          } ${
            disabled && !(error && touched) && "class-disable"
          } ${
            error && touched ? "border-error text-error" : ""
          }`}
          id={name} 
          name={name}
          placeholder={placeholder}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          onPaste={
            disablePaste
              ? (e) => e.preventDefault()
              : () => {
                  /** do nothing * */
                }
          }
          onKeyDown={handleKeyPress}
          autoComplete={autoComplete}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          readOnly={readOnly}
          rows={4}
          {...props}
        />
       
        {touched && error && <ValidationError error={error} />}
      </div>
      
      <style jsx>{`
        /* Make the label and field look identical on every browser */
        .textarea {
          resize: none;
          padding-left: 10px;
          outline: 0;
          font-size: 14px;
          width: ${width};
          background:#d9d9d940;
        }
        .class-disable {
          background: #c2c7d13d 0% 0% no-repeat padding-box;
          border: 1px solid #c2c7d17a;
          border-radius: 8px;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default TextArea;
