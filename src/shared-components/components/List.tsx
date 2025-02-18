import Button from "@/shared-components/ui/Button";

import { Icon } from "@/lib";

import Checkbox from "../ui/Checkbox";
import { dateAndTimeFormatter } from "@/utils";
import { log } from "util";
import { useRouter } from "next/navigation";

const List = ({
  data,
  deleteHandler,
  showDetailsIcon = false,
  showDetails,
  showDeleteIcon = false,
  loggedinRole,
  config,
  className,
  listClassName,
  btnConfig,
  iconConfig,
  listElementClassName,
  detailsPopup,
  getValue,
  setValue,
  tab,
}: {
  data: any;
  deleteHandler?: (_: string, role: string) => void;
  showDetailsIcon?: boolean;
  showDetails?: any;
  showDeleteIcon?: boolean;
  loggedinRole?: string;
  config: any;
  className?: string;
  btnConfig?: any;
  iconConfig?: any;
  listClassName?: string;
  listElementClassName?: string;
  detailsPopup?: any;
  getValue?: any;
  setValue?: any;
  tab?: string;
}) => {
  const router = useRouter();

  return (
    <div
      className={`${listClassName ? listClassName : "rounded-xl list"}   mb-4`}
    >
      <div
        className={`${className} border-b-2 items-center font-semibold text-[14px] background px-6 sticky top-0 z-[1]`}
      >
        {Object.keys(config).map((el: any, index: number) => {
          return (
            <div className="" key={index}>
              {el}
            </div>
          );
        })}
      </div>

      {data?.length > 0 ? (
        data?.map((item: any, index: number) => {
          return (
            <div key={item?._id} className="px-6 bg-white rounded-b-xl">
              <div
                className={`${className} ${listElementClassName} text-[14px]`}
              >
                {Object.keys(config).map((key, inde) => {
                  let value = config[key].val;
                  let exactKey = config[key].entry;
                  let func = config[key].func;
                  let path = config[key].path;
                  const getValue = () => {
                    if (func) {
                      return func(item, index);
                    }
                    // if(typeof item[value]==="string"||typeof item[value]==="number")
                    else return item[value];
                  };

                  return (
                    <div
                      className="text-secondary relative"
                      key={inde}
                      onClick={() =>
                        path &&
                        router.push(`/site/subject/visit1/${item._id}?tab=DOV`)
                      }
                    >
                      <div
                        className={config[key].tag ? config[key]?.class : ""}
                      >
                        {getValue()}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="divider"
                style={{
                  borderBottom:
                    index === data?.length - 1
                      ? "none"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                }}
              ></div>
            </div>
          );
        })
      ) : (
        <div className="text-center my-4">{"No result found"}</div>
      )}
      <style jsx>
        {`
          .list {
            border: 2px solid;
          }
          .list .list-content:last-child .divider {
            border: none;
          }
          .background{
            background:#EDF2F7;
            border-top-left-radius: 8px;
    border-top-right-radius: 8px;
          }

          .divider {
            height: 2px;
          }
        `}
      </style>
    </div>
  );
};
export default List;
