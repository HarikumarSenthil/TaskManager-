import React from "react";

const ToggleSwitch = ({
  label,
  type,
  name,
  checked,
  handleToggle,
  handleBlur,
  value,
  error,
  className,
  visible = true,
}: {
  label?: string;
  type: string;
  className?: string;
  error?: string;
  checked?: string[];
  name?: string;
  value?: boolean;
  handleToggle?: (...args: unknown[]) => unknown;
  handleBlur?: any;
  visible?: boolean;
}) => {
  return (
    <div className={`${className} ${!visible && "hidden"}`}>
      <div className="justify-between items-center flex">
        <input
          type={type}
          className="checkbox"
          name={name}
          id={label}
          checked={value}
          onChange={handleToggle}
        />
        <div className="text-sm font-bold ml-1.5">{label}</div>
      </div>
      {error && (
        <p className="text-red-600 w-full text-left text-xs font-semibold">
          {error}
        </p>
      )}
      <style jsx>{`
        .checkbox {
          // display: none;
        }
        input[type="checkbox"] {
          accent-color: #45bd75;
        }
      `}</style>
    </div>
  );
};

export default ToggleSwitch;
