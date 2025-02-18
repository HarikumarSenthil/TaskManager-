import React from "react";

type CheckboxProps = {
  name: string;
  className?: string;
  label?: string;
  value?: string;
  forwardedRef?: any;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  callback?: (...args: unknown[]) => unknown;
  checked?: boolean;
  visible?: boolean;
  line?: boolean;
  disabled?: boolean;
  customCheckbox?: boolean;
};

const Checkbox = ({
  name,
  checked,
  className,
  label,
  value,
  forwardedRef,
  onChange,
  onBlur,
  visible = false,
  line,
  disabled = false,
  customCheckbox = true,
  callback,
}: CheckboxProps): JSX.Element => {
  const handleClick = (event: any) => {
    onChange && onChange(event);
    if (callback) {
      onBlur && onBlur(event);
    }
  };

  return (
    <>
      <div
        className={`py-2 checkbox-container  ${className} 
        `}
      >
        <input
          onChange={(e: any) => handleClick(e)}
          // onBlur={(e)=>handleBlur(e)}
          type="checkbox"
          name={name}
          checked={checked}
          value={value}
          ref={forwardedRef}
          disabled={disabled}
          // onClick={(e) => handleClick(e)}
        />
        <span className={`px-1 ml-3 ${checked ? "text-success" : "label"}`}>
          {label}
        </span>

        <style jsx>
          {`
            input[type="checkbox"] {
              width: 17px;
              height: 17px;
              border: none;
              position: relative;
            }
            input[type="checkbox"]:checked {
              opacity: 0.7;
              width: ${customCheckbox && "17px"};
              height: ${customCheckbox && "17px"};
            }
            .label {
              color: #23232380;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Checkbox;
