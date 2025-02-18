import {
  FlagIcon,
  MailCheck,
  MailOpen,
  MailWarning,
  Mails,
} from "lucide-react";
import ValidationError from "../components/ValidationError";
import RadioButton from "./RadioButton";

interface RadioListProps {
  options: {
    name?: string | undefined;
    id?: string | undefined;
    label?: string | undefined;
    value?: string;
    defaultChecked?: boolean;
  }[];
  name?: string;
  error?: string;
  checked?: any;
  disabled?: any;
  onChange?: (...args: unknown[]) => unknown;
  onBlur?: (...args: unknown[]) => unknown;
  clssName: string;
  feildStatus: string;
  touched: any;
}

const RadioList = ({
  options,
  name,
  onChange,
  checked,
  error,
  clssName,
  onBlur,
  disabled = false,
  touched,
  feildStatus,
  ...props
}: RadioListProps): JSX.Element => {

  return (
    <>
      <div className={`${clssName} flex  items-center gap-3 relative`}>
        {options.map((radio, index) => (
          <div key={index} className="relative">
            <RadioButton
              id={radio.id}
              name={name}
              label={radio.label}
              value={radio.value}
              checked={checked}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              {...props}
            />
            
          </div>
        ))}
      </div>
      {touched && error && <ValidationError error={error} />}
      <style jsx>
        {`
          .radio-container {
            display: flex;
          }
        `}
      </style>
    </>
  );
};

export default RadioList;
