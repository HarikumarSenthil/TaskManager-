import React from "react";

export type Input = {
  __typename:
    | "ComponentFormInput"
    | "ComponentFormButton"
    | "ComponentFormMobileInput"
    | "ComponentFormEmailInput"
    | "ComponentFormDropdown"
    | "ComponentFormTextAreaInput"
    | "ComponentFormUploadInput"
    | "ComponentFormCalendarPicker"
    | "ComponentFormText"
    | "ComponentFormCheckbox"
    | "ComponentFormSwitch"
    | "ComponentFormMultiSelect"
    | "ComponentFormCheckboxCombo"
    | "ComponentFormMoneyInput";
  id: string;
};

export type Options = {
  id: string;
  label: string;
  value: string;
};

export interface actionType extends Input {
  actionType?: string;
}

export interface Image {
  url: string;
}

export interface ComponentFormSwitch extends Input {
  label: string;
  name: string;
  trueValue: {
    label: string;
    value: string;
  };
  falseValue: {
    label: string;
    value: string;
  };
  value: string;
  dependencies: Record<any, any>;
}

export interface ComponentFormMultiSelect extends Input {
  label: string;
  name: string;
  options: Options[];
  classname: string;
  dependencies: Record<any, any>;
  optionsJsonArray: Options[];
  searchLabel: string;
  searchPlaceholder: string;
}

export interface ComponentFormInput extends Input {
  name: string;
  Mobile?: any;
  type?: string;
  inputType?: string;
  placeholder?: string;
  label?: string;
  inputLabel?: string;
  disabled?: boolean;
  transform?: string;
  autocomplete?: boolean;
  hidden?: boolean;
  dependencies?: any;
  classname?: string;
  disablePaste?: boolean;
  inputChild?: JSX.Element;
  visibleStatus?: boolean;
  successStatus?: any;
  disableCountryDropdown?: boolean;
  parentClassName?: string;
  gaEvent?: any;
}

export interface ComponentFormUploadInput extends Input {
  maximumSize?: number;
  note?: string;
  name: string;
  hidden?: boolean;
  dependencies?: Record<any, any>[];
  acceptedFileType?: string[];
  footerText?: string;
  workType?: string;
  ParentClassName?: string;
  className?: string;
}

export interface ComponentFormText extends Input {
  value: string;
  classname: string;
  hidden?: boolean;
}

export interface ComponentFormCheckbox extends Input {
  name: string;
  label: string;
  truthValue: boolean;
  classname?: string;
  addOnFunctionality?: Record<any, any>;
  hidden?: boolean;
  parentClassName?: string;
}

export interface ComponentFormCheckboxCombo extends Input {
  name: string;
  checkboxes: ComponentFormCheckbox[];
  showNoneOfAbove: boolean;
  classname?: string;
}

export interface ComponentFormTextAreaInput extends Input {
  name: string;
  type?: string;
  row?: number;
  textareatype?: string;
  textplaceholder?: string;
  textlabel?: string;
  textarealabel?: string;
  textareaplaceholder?: string;
  textareadisabled?: boolean;
  hidden?: boolean;
  redOnly?: boolean;
}

export interface ComponentFormCalendarPicker extends Input {
  name: string;
  type?: string;
  calendarlabel?: string;
  placeholder?: string;
  disabled?: boolean;
  worktype?: string;
  title?: string;
  note?: string;
  minDay?: number;
  maxDay?: number;
  dateFormat?: string;
  holidayDate?: any;
  disableSaturdaySelection?: boolean;
  disableSundaySelection?: boolean;
}

export interface ComponentFormButton extends Input {
  label?: string;
  classname?: string;
  type?: "submit" | "button" | "reset";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "text" | "ghost" | "danger";
  color?: string;
  disabled?: boolean;
  btnLabel?: string;
  gaEvent?: GAEvent;
  loadingLabel?: string;
  fallbackLabel?: string;
  href?: string;
  visibleStatus?: boolean;
  action?: actionType;
}

export interface ComponentFormDropdown extends Input {
  name: string;
  label: string;
  Options: Options[];
  Classname?: string;
  dependencies: Record<any, any>;
  gaEvent?: GAEvent;
  parentClassName?: string;
  showMsg?: string;
}

export type Forms = {
  name: string;
  Description1: string;
  fallbackDescription1?: string;
  Description2: string;
  description?: string;
  note?: string;
  btnParentstatus?: boolean;
  bannerImg?: Image;
  inputs: (
    | ComponentFormButton
    | ComponentFormInput
    | ComponentFormDropdown
    | ComponentFormUploadInput
    | ComponentFormTextAreaInput
    | ComponentFormCalendarPicker
    | ComponentFormCheckbox
    | ComponentFormText
    | ComponentFormSwitch
    | ComponentFormMultiSelect
  )[];
  validations?: any;
};

export type GAEvent = {
  title: string;
  category: string;
  action: string;
  label?: string;
  value?: string;
};

export interface Route {
  id: number;
  link?: string;
  label: string;
  subNav?: Array<Route>;
  icon?: string;
  show?: boolean;
}

export interface NavData {
  __typename?: string;
  id?: number;
  label: string;
  url?: string;
  neoUrl?: string;
  title?: string;
  links?: Array<NavData>;
  gaEvent?: GAEvent;
  hidden?: boolean;
}

export interface SideMenuData {
  id?: number;
  body?: Array<NavData>;
}

export interface Logo {
  src: string;
  alt: string;
  size: LogoSize;
  style?: string;
}

export interface Icon {
  type: string;
  onClick?: (...args: unknown[]) => unknown;
  link?: string;
}

export interface LogoSize {
  width: string;
  height?: string;
}

export interface HeaderConfig {
  headerStyle?: string;
  leftDiv?: { leftDivStyle: string; icon: Icon };
  rightDiv?: { rightDivStyle: string; navbar?: Route[]; icons?: Icon[] };
}
export interface Footer {
  content: string;
  style?: Record<string, string>;
}

export type ThemeConfig = {
  logo: Logo;
  footer: Footer;
  style: any;
};

export type SeoConfig = {
  title?: string;
  titleTemplate?: string;
  additionalMetaTags?: any;
  description?: string;
  canonical?: string;
};

export type Routes = {
  routes: Array<Route>;
};

export type AppConfig = {
  themeConfig: ThemeConfig;
  seoConfig: SeoConfig;
  routeConfig?: Routes;
};

export type Props = {
  value?: string;
  componentName?: string;
};

export type DropdownConfig = {
  id?: string;
  label: string;
  value: string;
};

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "link"
    | "disable"
    | "add"
    | "show"
    | "lock"
    | "sdv";
  className?: string;
  onClick?: (...args: unknown[]) => unknown;
  children: React.ReactNode;
  precedingText?: string;
  loading?: boolean;
  icon?: string;
  visible?: any;
  onSubmit?: any;
};

export interface PopupData {
  title: string;
  description: JSX.Element | string;
  content?: any;
  btnArray: ButtonProps[];
  deviceIcon?: string;
  classAdditions?: any;
  head?: string;
  image?: string;
}

export type User = {
  _id: string;
  role: string;
  employeeId?: string;
};

export interface DataList {
  _id: string;
  name: string;
  employeeId: string;
  department: {
    departmentName: string;
    __typename: string;
    _id: string;
  };
  role: string;
  reportingManager: {
    _id: string;
    employeeId: string;
    name: string;
    department: string;
  };
  designation: string;
  gender: string;
  employeeType: string;
}
export interface HolidayList {
  _id: string;
  _typename: string;
  holidayName: string;
  date: Date;
}

export type TabProps = {
  type?: "toggle" | "route";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (...args: unknown[]) => unknown;
  children: React.ReactNode;
  src: string;
};
