import { useState } from "react";
import { customizeEvent } from "../../utils";

import ValidationError from "../components/ValidationError";
import { Icon } from "@/lib";
import { File, Trash2, UploadIcon } from "lucide-react";

type UploadProps = {
  name: string;
  // type?: 'text' | 'number' | 'password' | 'email' | 'date';
  type?: string;
  value?: any;
  placeholder?: string;
  acceptedFileTypes?: string;
  error?: string;
  touched?: boolean;
  pattern?: RegExp;
  maskingPattern?: any;
  className?: string;
  multiple?: boolean;
  icon: string;
  containerStyle?: string;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  onKeyDown?: (...args: unknown[]) => unknown;
};

const Upload = ({
  name,
  type = "file",
  value,
  placeholder,
  acceptedFileTypes,
  error,
  touched = false,
  className,
  multiple,
  pattern,
  maskingPattern,
  icon = "paperClip",
  containerStyle,
  onChange,
  onKeyDown,
  onBlur,
  ...props
}: UploadProps): JSX.Element => {
  const [keycode, setKeycode] = useState();
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

  const onFileChange = (event: any, empty?: boolean) => {
    customizeEvent(event, name, empty ? "" : event.target?.files[0]);
    onChange && onChange(event);
    onBlur && onBlur(event);
  };

  return (
    <div className={` ${className} file-upload`}>
      <input
        className={`${
          containerStyle ? containerStyle : "upload-input"
        } text-sm`}
        id={name}
        name={name}
        accept={acceptedFileTypes}
        type={type}
        onChange={onFileChange}
        onKeyDown={handleKeyPress}
        onBlur={onBlur}
        value={undefined}
        {...props}
        multiple={multiple}
      />
      {!containerStyle && (
        <div className="custom-upload flex justify-between gap-5 py-2 px-1">
          <UploadIcon className="cursor-pointer" />
          <p>{placeholder}</p>
        </div>
      )}

      {value && typeof value === "string" ? (
        <p className={`text-base pt-2`}>
          {!containerStyle && value}{" "}
          <Trash2
            size={15}
            className="cursor-pointer"
            onClick={(e: any) => onFileChange(e,true)}
          />
        </p>
      ) : (
        <p
          className={`${
            containerStyle ? "absolute" : ""
          } flex justify-start items-center gap-4 text-base pt-2`}
        >
          {value?.name}
          {value?.name && (
            <Trash2
              size={15}
              className="cursor-pointer"
              onClick={(e: any) => onFileChange(e,true)}
            />
          )}
        </p>
      )}
      {touched && error && <ValidationError error={error} />}

      <style jsx>{`
        .file-upload {
          position: relative;
          display: inline-block;
          z-index: 2;
        }
        .upload-input {
          position: relative;
          border-radius: 6px;
          opacity: 0;
          width: 50%;
          height: 38px;
          z-index: 2;
          cursor: pointer;
        }
        .custom-upload {
          border: 1px solid grey;
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          font-size: 12px;
          color: #626262;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Upload;
