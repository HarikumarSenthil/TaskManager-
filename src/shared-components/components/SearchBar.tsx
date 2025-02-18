import Icon from "@/lib/svg/icon";
import Input from "../ui/Input";

const SearchBar = ({
  name,
  type = "text",
  placeholder,
  className,
  onChange,
  onBlur,
  width = "100%",
  filterIcon = true,
  setIsFilterOpen,
  isFilterOpen,
  visible = true,
}: {
  name?: string;
  type: string;
  placeholder: string;
  className?: any;
  width?: string;
  onChange?: any;
  filterIcon?: boolean;
  onBlur?: any;
  setIsFilterOpen?: any;
  isFilterOpen?: boolean;
  visible?: boolean;
}) => {
  const filterHandler = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div
        className={`searchbar relative flex items-center border px-2 py-3 border-light bg-primary ${
          !visible && "hidden"
        } ${className}`}
      >
        <div className="flex items-center w-11/12">
          <Icon type="search" className="ml-2 mr-4" />
          <Input
            type={`text`}
            placeholder={placeholder}
            className="w-full"
            onChange={onChange}
            variant="no-border"
            name=""
          />
        </div>
        {filterIcon && (
          <Icon
            type="filter"
            onClick={filterHandler}
            width="20"
            height="20"
            className="mr-2"
            // fill={COLOR.GREEN}
          />
        )}
      </div>
      <style jsx>{`
        .searchbar {
          border-radius: 50px;
          height: 54px;
          width: ${width};
        }
      `}</style>
    </>
  );
};
export default SearchBar;
