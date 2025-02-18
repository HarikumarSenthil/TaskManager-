import { Icon } from "@/lib";

const ValidationError = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center mt-2">
      <Icon type="error"/>
      <p className="text-red-500 w-full text-left text-sm font-semibold ">
        {error}
      </p>
    </div>
  );
};

export default ValidationError;
