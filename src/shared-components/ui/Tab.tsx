

type TabProps = {
  activeTab: string;
  label: string;
  iconType?: string;
  tabType?: string;
  onTabClick?: (...args: unknown[]) => unknown;
  superscript?: number | string;
  isFirst: boolean;
  isLast: boolean;
  children?: any;
};
const Tab = ({
  activeTab,
  label,
  iconType,
  tabType = "borderless",
  onTabClick,
  superscript,
  isFirst,
  isLast,
}: TabProps): JSX.Element => {
  const style = ` ${isFirst && "rounded-l-md"} ${
    isLast && "rounded-r-md"
  } py-1 px-5 justify-center`;
  return (
    <div className="mb-3">
      <div
        className={`round flex flex-col font-semibold md:flex-row text-xs md:text-base
            ${tabType === "bordered" ? style : "px-6 py-2"}
            ${
              activeTab !== label && tabType === "bordered"
                ? "inactive"
                : "text-secondary"
            }
            ${
              tabType === "bordered" ? activeTab === label && "bg-selected" : ""
            }
            hover:${
              activeTab === label ? "text-link-secondary" : "text-link-primary"
            }`}
        onClick={() => onTabClick && onTabClick(label)}
        onKeyDown={() => onTabClick && onTabClick(label)}
        role="button"
        tabIndex={0}
      >
        {/* {iconType && (
          <Icon
            type={iconType}
            fill={activeTab === label ? "#FFF" : "#838383"}
            width="20"
            height="20"
          />
        )} */}
        {label && tabType === "borderless" && (
          <p className={activeTab === label ? "text-black font-bold" : ""}>
            {label}
          </p>
        )}
        {superscript && (
          <span className="superscript absolute top-0 right-0 text-2xs rounded-full text-white font-bold h-3 w-3 flex items-center justify-center">
            {superscript}
          </span>
        )}
      </div>
      {tabType === "borderless" && activeTab === label && (
        <div className="tab-active"></div>
      )}
      <style jsx>{`
        .superscript {
          position: absolute;
          top: 15%;
          right: 20%;
          background-image: linear-gradient(to left, #2d95ef, #113874);
        }
        .inactive {
          background: ${"grey"};
        }
        .tab-active {
          height: 4px;
          background: ${"green"};
          border-radius: 30px;
          width: 25%;
          margin: 0 auto;
        }
        @media screen and (min-width: 768px) {
          .superscript {
            right: 0%;
          }
        }
        @media screen and (min-width: 1024px) {
          .superscript {
            right: 10%;
          }
        }
      `}</style>
    </div>
  );
};

export default Tab;
