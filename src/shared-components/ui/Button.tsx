import { ButtonProps } from "@/config/types";

const Button = ({
  type = "button",
  disabled = false,
  size = "small",
  variant = "primary",
  className,
  onClick,
  children,
  precedingText,
  icon,
  loading,
  visible = true,
  onSubmit = false,
}: ButtonProps): JSX.Element => {
  return (
    <div className={`${precedingText && "mt-6 flex"} ${!visible && "hidden"}`}>
      {precedingText && <p className="text-sm mr-1">{precedingText}</p>}
      <button
        type={type}
        className={`${variant !== "link" && size} ${variant} btn-style flex  common ${
          onSubmit && !loading && "cursor-not-allowed"
        } justify-center items-center border-box font-serif ${className} ${
          loading && "pointer-events-none"
        } `}
        onClick={onClick}
        disabled={onSubmit ? onSubmit : loading}
      >
        {children}
      </button>
      <style>{`

      .common{
        font-size:14px;
        border-radius:6px;

      }
      .primary{
        background-color: #2563eb;
        color:white;
        padding:5px 10px;
        border:1px solid blue;

      }
      .secondary{
        color:black;
        padding:5px 10px;
        background-color: #D3D3D3;
        border:1px solid grey;
      }

      .add{
        color:white;
        padding:5px 10px;
      	background-color: rgb(20 184 166);

      }
      .show{
        color:white;
        padding:5px 10px;
        background-color: rgb(239 68 68);
      }
      .lock{
        color:white;
        padding:5px 10px;
        background-color: rgb(190 24 93);
      }
      .sdv{
        color:white;
        padding:5px 10px;
        background-color: rgb(168 85 247);
      }
      
      
      `}</style>
    </div>
  );
};

export default Button;
