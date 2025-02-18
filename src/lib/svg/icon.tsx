export type IconProps = {
  type: string;
  className?: string;
  fill?: string;
  height?: string;
  width?: string;
  onClick?: (e: any) => void;
  options?: Record<string, string>;
};

const Icon = ({
  className,
  type,
  fill,
  width,
  height,
  options = {},
  onClick,
}: IconProps): JSX.Element => {
  const icon: any = {
  
  };
  return (
    <>
      {onClick ? (
        <i role="button" tabIndex={0} onKeyDown={onClick} onClick={onClick}>
          {icon[type]}
        </i>
      ) : (
        <i>{icon[type]}</i>
      )}
    </>
  );
};

export default Icon;
