import { useRef, useState } from "react";
import { useOnClickOutside } from "../../features/hooks";
import { customizeEvent, isArrayOfObjects } from "../../utils";
import Input from "./Input";
import { PopupData } from "@/config/types";

type AutosuggestInputProps = {
  uniqueKey: string;
  name: string;
  value?: string;
  className?: string;
  width?: string;
  label?: string;
  forwardedRef?: any;
  visible?: boolean;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  character?: string;
  pattern?: RegExp;
  maskingPattern?: any;
  onBlur?: (...args: unknown[]) => unknown;
  onChange?: (...args: unknown[]) => unknown;
  transformFn?: (_: string) => string;
  suggestions?: Array<any>;
  popupData?: PopupData;
  popupClasses?: any;
  canAddEntry?: boolean;
};

const Autosuggest = ({
  uniqueKey,
  label,
  placeholder,
  character,
  forwardedRef,
  onChange,
  onBlur,
  value,
  className,
  width,
  touched,
  error,
  transformFn,
  name,
  visible = true,
  pattern,
  maskingPattern,
  suggestions,
  popupData,
  popupClasses,
  canAddEntry = false,
}: AutosuggestInputProps): JSX.Element => {
  // const dispatch = useDispatch();

  const createBtn = [`Create ${name}`];
  const ref: any = useRef();
  const [activeSuggestions, setActiveSuggestions] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  let suggestionsListComponent: JSX.Element = <></>;

  const arrayOfObjects = suggestions && isArrayOfObjects(suggestions);

  const getSuggestionsArray = () => {
    let suggestionArray = [];
    if (arrayOfObjects) {
      suggestions?.map((el) => {
        suggestionArray.push(el.name);
      });
    } else {
      if (suggestions) {
        suggestionArray = suggestions;
      }
    }
    return suggestionArray;
  };

  const suggestionHandler = (str: string) => {
    const suggestionArr = getSuggestionsArray()?.filter(
      (suggestion) => suggestion?.toLowerCase()?.indexOf(str.toLowerCase()) > -1
    );
    setFilteredSuggestions(suggestionArr);
    if (suggestionArr.length) {
      setShowSuggestions(true);
    } else {
      canAddEntry
        ? setFilteredSuggestions(createBtn)
        : setFilteredSuggestions(["No data!"]);
      setShowSuggestions(true);
    }
  };

  useOnClickOutside(ref, (e: any): void => {
    e.stopPropagation();
    if (showSuggestions) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  });

  const onChangeHandler = (e: any) => {
    onChange && onChange(e);
    const input = e.target.value;
    let str: string;
    if (character && input.includes(character)) {
      str = input.substring(input.indexOf(character) + 1);
      suggestionHandler(str);
    } else if (!character) {
      str = input;
      suggestionHandler(str);
    } else {
      setShowSuggestions(false);
    }
    setUserInput(e.target.value);
  };

  const onBlurHandler = (event: any) => {
    onBlur && onBlur(event);
    const suggestionArr = getSuggestionsArray();
    if (suggestionArr.indexOf(value) === -1) {
      customizeEvent(event, name, "");
      onChange && onChange(event);
    }
  };

  const onClick = (e: any, enterClicked?: boolean) => {
    let val: string;
    if (e.target.innerText === `Create ${name}`) {
      val = "";
      customizeEvent(e, name, val);
      onChange && onChange(e);
      onBlur && onBlur(e);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      // dispatch<any>(
      //   showPopup(
      //     {
      //       title: popupData?.title,
      //       description: popupData?.description,
      //       btnArray: popupData?.btnArray,
      //     },
      //     popupData?.classAdditions
      //   )
      // );
      return;
    }
    if (e.target.innerText === "No data!") {
      val = "";
      customizeEvent(e, name, val);
      onChange && onChange(e);
      onBlur && onBlur(e);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    if (character && value) {
      const position = value.indexOf(character) + 1;
      if (enterClicked && position) {
        val =
          value.substring(0, position) + filteredSuggestions[activeSuggestions];
      } else {
        val = value.substring(0, position) + e.target.innerText;
      }
    } else if (enterClicked) {
      if (filteredSuggestions[activeSuggestions] === `Create ${name}`) {
        val = "";
        customizeEvent(e, name, val);
        onChange && onChange(e);
        onBlur && onBlur(e);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        // dispatch<any>(
        //   showPopup(
        //     {
        //       title: popupData?.title,
        //       description: popupData?.description,
        //       btnArray: popupData?.btnArray,
        //     },
        //     popupData?.classAdditions
        //   )
        // );
        return;
      }
      val = filteredSuggestions[activeSuggestions];
    } else {
      val = e.target.innerText;
    }
    customizeEvent(e, name, val);
    onChange && onChange(e);
    onBlur && onBlur(e);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const onKeyDown = (e: any) => {
    setActiveSuggestions(0)
    if (e.keyCode === 13) {
      onClick(e, true);
    } else if (e.keyCode === 38) {
      if (activeSuggestions === 0) {
        setActiveSuggestions(filteredSuggestions.length - 1);
      } else {
        setActiveSuggestions(activeSuggestions - 1);
      }
    } else if (e.keyCode === 40 || e.keyCode === 9) {
      if (activeSuggestions + 1 === filteredSuggestions.length) {
        setActiveSuggestions(0);
      } else {
        setActiveSuggestions(activeSuggestions + 1);
      }
    }
  };

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="border rounded-md mt-3">
          {filteredSuggestions.map((suggestion, index) => {
            return (
              <li
                className={`${
                  index === activeSuggestions && suggestion !== "No data!"
                    ? "bg-selected"
                    : ""
                } ${
                  suggestion === "No data!" && "bg-gray-200"
                } pl-2 cursor-pointer text-sm py-1`}
                key={suggestion}
                onClick={onClick}
                onKeyDown={onKeyDown}
                role="button"
                tabIndex={0}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <>
      <div ref={ref}>
        <Input
          key={uniqueKey}
          label={label}
          placeholder={placeholder}
          forwardedRef={forwardedRef}
          autoSuggest={showSuggestions}
          suggestionList={suggestionsListComponent}
          onChange={onChangeHandler}
          onKeyDown={onKeyDown}
          onBlur={onBlurHandler}
          value={value}
          name={name}
          width={width}
          touched={touched}
          error={error}
          visible={visible}
        />
      </div>
    </>
  );
};

export default Autosuggest;
