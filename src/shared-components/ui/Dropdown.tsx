import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../features/hooks";
import { customizeEvent, noOperation } from "../../utils";
import ValidationError from "../components/ValidationError";
import { Icon } from "@/lib";
import { MailCheck, MailOpen, MailWarning, Mails } from "lucide-react";

type DropdownProps = {
  name?: string;
  placeholder?: string;
  options: {
    id?: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    hidden?: boolean;
  }[];
  width?: string;
  value?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
  height?: string;
  feildStatus?: string;
  onChange?: (...args: unknown[]) => unknown;
  onBlur?: (...args: unknown[]) => unknown;
};

const Dropdown = ({
  name,
  placeholder,
  options,
  width,
  value,
  className,
  height,
  error,
  onBlur,
  touched,
  onChange,
  disabled,
  feildStatus,
}: DropdownProps): JSX.Element => {
  const ref: any = useRef();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [updatedOptions, setUpdatedOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState({});
  useEffect(() => {
    if (value === "" || options) {
      setUpdatedOptions(options);
    }
  }, [options, value]);

  useEffect(() => {
    if (value) {
      const event = new Event("customEvent");
      if (name) {
        customizeEvent(event, name, value);
      }
      onBlur && onBlur(event);
    }
  }, [value]);

  const showDropdown = (): void => {
    setDropdown(!dropdown);
  };

  // const onKeyDown = (event, option) => {
  //   const itemIndex = options.indexOf(option);
  //   if (event.keyCode === 13) {
  //     onClickOption(event, option);
  //   } else if (event.keyCode === 38) {
  //     if (itemIndex === 0) {
  //       setSelectedOption(options[options.length - 1]);
  //     } else {
  //       setSelectedOption(options[itemIndex - 1]);
  //     }
  //   } else if (event.keyCode === 40 || event.keyCode === 9) {
  //     if (itemIndex + 1 === options.length) {
  //       setSelectedOption(options[0]);
  //     } else {
  //       setSelectedOption(options[itemIndex + 1]);
  //     }
  //   }
  // };

  const onClickOption = (event: any, option: any): void => {
    let itemIndex: number;
    itemIndex = options.indexOf(option);
    const newSelect = options.filter((item, index) => index !== itemIndex);
    setUpdatedOptions(newSelect);
    if (name) {
      customizeEvent(event, name, option?.value);
    }
    onChange && onChange(event);
    setDropdown(false);
    onBlur && onBlur(event);
  };

  /**
   * adding item-selected class on the basis of selectedOption?.label
   * because in some cases root component wants to override
   * the CSS Currently using this for update address
   */

  useOnClickOutside(ref, (e: any): void => {
    e.stopPropagation();
    if (dropdown) {
      showDropdown();
    }
  });

  return (
    <>
      <div>
        <div
          ref={ref}
          className={`rounded-md border  border-dark text-sm relative ${className} width ${
            error && touched && "border border-error"
          }`}
          style={{ zIndex: dropdown ? 10 : "unset" }}
        >
          <div
            id={name}
            className={`relative  flex items-center justify-between selectbox text-sm`}
            // onKeyDown={noOperation}
            onClick={(e) => {
              if (!disabled) {
                showDropdown();
                if (dropdown && !value) {
                  onClickOption(e, value);
                }
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="overflow-x-scroll ">
              <p
                className={`truncate px-1 mt-4   ${
                  value ? "text-primary" : "text-disable"
                }`}
              >
                {value || placeholder}
              </p>
            </div>
            <div className="chevron">
              {dropdown ? (
                <Icon type="chevron-up" className="fill-current mr-2"  height="12"
                width="12"/>
              ) : (
                <Icon
                  type="chevron-down"
                  height="12"
                  width="12"
                  className="fill-current mr-2"
                />
              )}
            </div>

            {feildStatus && (
              <div className="absolute right-[-30px] top-0">
                {feildStatus === "Open" ? (
                  <MailOpen color="blue" fill="lightblue" />
                ) : feildStatus === "Responded" ? (
                  <Mails color="yellow" fill="lightyellow" />
                ) : feildStatus === "Reopened" ? (
                  <MailWarning color="red" fill="lightred" />
                ) : (
                  <MailCheck color="green" fill="lightgreen" />
                )}
              </div>
            )}
          </div>

          <div
            style={{ display: dropdown ? "block" : "none" }}
            className={`items background-white border rounded-md w-full absolute mt-3 py-2 max-h-48 overflow-y-scroll`}
          >
            {Array.isArray(updatedOptions) &&
              updatedOptions?.map((option, index) => (
                <div
                  key={option.id}
                  onClick={(event) => onClickOption(event, option)}
                  // onKeyDown={(event) => onKeyDown(event, option)}
                  role="button"
                  tabIndex={0}
                  className="hover:text-cyan-700"
                >
                  {option.label ? option.label : option.value}
                </div>
              ))}
          </div>
        </div>

        {touched && error && <ValidationError error={error} />}
      </div>
      <style jsx>{`
      .width{
        width:${width}
      }
      .items{
        height:${height && height}px;
        overflow-y:scroll;
        background:#fff;
      }
        .items div {
          padding: 2px;
          padding-left:10px;
          cursor: pointer;
          font-size:14px;
        }
        .selectbox {
          height: 35px;
          padding-left:10px;
          border:1.5px solid gray;
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
        }

        @media screen and (max-width: 768px) {
        .width{
          width:100%;
        }
     @media screen and (max-height: 700px) {
        .chevron {
          position: absolute;
          right: 14px;
        }

      `}</style>
    </>
  );
};

export default Dropdown;
