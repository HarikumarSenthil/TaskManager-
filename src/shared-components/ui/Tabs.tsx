import { useState } from "react";
import Tab from "./Tab";

const Tabs = ({
  config,
  children,
  tabType,
  onSelectTab,
  className,
  setCurrentTab,
  ...props
}: Record<any, any>): JSX.Element => {
  let tabdata = null;
  const active = config[0]?.name;
  const [activeTab, setActiveTab] = useState<string>(active);

  const onClickTabItem: any = (tab: string): void => {
    setActiveTab(tab);
    if (typeof onSelectTab === "function") onSelectTab(tab);
  };

  tabdata = config?.map((itemTab: any, index: number): JSX.Element => {
    if (setCurrentTab) {
      setCurrentTab(activeTab);
    }
    return (
      <div key={itemTab.name}>
        <Tab
          isFirst={index === 0}
          isLast={index === config.length - 1}
          activeTab={activeTab}
          label={itemTab.name}
          onTabClick={onClickTabItem}
          iconType={itemTab.icon}
          tabType={tabType}
          superscript={itemTab?.superscript}
        />
      </div>
    );
  });
  return (
    <>
      <div className={`flex ${className}`}>{tabdata}</div>
      <div className={`${tabType !== "bordered" ? "w-full" : "mt-4"}`}>
        {Array.isArray(children) &&
          children.map((child: any) => {
            if (child.props.content !== activeTab) return undefined;
            return child.props.children;
          })}
      </div>
    </>
  );
};

export default Tabs;
