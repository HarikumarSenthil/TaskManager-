type RadioButtonProps = {
  id: string | undefined;
  name: string | undefined;
  label: string | undefined;
  value?: string;
  className?: string;
  checked?: boolean;
  selectedChecked?: boolean;
  disabled?: boolean;
  onChange?: (...args: unknown[]) => unknown;
  onBlur?: (...args: unknown[]) => unknown;
};

const RadioButton = ({
  id,
  name,
  value,
  label,
  className,
  selectedChecked,
  checked = false,
  disabled = false,
  onChange,
  onBlur,
  ...props
}: RadioButtonProps): JSX.Element => {
  const handleChange = (event: any) => {
    onChange && onChange(event);
    onBlur && onBlur(event);
  };

  return (
    <div className=" flex gap-1  items-center">
      <input
        type="radio"
        id={id}
        name={name}
        disabled={disabled}
        checked={selectedChecked}
        value={value}
        onChange={(e) => handleChange(e)}
        // onBlur={(e) => onBlur(e)}
        {...props}
        className={`w-4 h-4 ${className}`}
      />
      <span className="">{label}</span>

      <style jsx>
        {`
          .radio-oval {
            position: absolute;
            opacity: 0;
            width: 100px;
            height: 40px;
            cursor: pointer;
          }
          .radio-oval:checked + span {
            background-color: ${"red"};
            color: ${"white"};
          }
          .value {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 40px;
            background-color: #f0f0f0;
            margin-right: 0.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
};

export default RadioButton;
