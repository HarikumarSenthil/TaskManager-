import { Fragment } from "react";
import Checkbox from "./Checkbox";

interface CheckboxListProps {
  options: {
    id?: string;
    name: string;
    label?: string;
    value?: string;
    defaultChecked?: boolean;
  }[];
  className?: string;
  name: string;
  checked?: any;
  visible?: boolean;
  disabled?: boolean;
  onChange?: (...args: unknown[]) => unknown;
  onBlur?: any
}

const CheckboxList = ({
  options,
  name,
  className,
  onChange,
  onBlur,
  checked,
  visible = true,
  disabled = false,
  ...props
}: CheckboxListProps): JSX.Element => {
  return (
    <>
      {options?.map((checkbox, index) => (
        <Fragment key={index}>
          <Checkbox
            key={index}
            name={name}
            label={checkbox.label}
            className={className}
            onChange={onChange}
            onBlur={onBlur}
            value={checkbox.label}
            disabled={disabled}
            visible={visible}
            checked={checked?.includes(checkbox.label) ? true : false}
            {...props}
          />
          {/* <div className="checkbox-container"></div> */}
        </Fragment>
      ))}
      {/* <style>
        {`
        .checkbox-container {
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
        }
        `}
      </style> */}
    </>
  );
};

export default CheckboxList;
