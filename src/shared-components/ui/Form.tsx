import { SyntheticEvent, useEffect, useState } from "react";
import { validateFormField } from "@/utils/validation";
import Input from "./Input";
import ToggleSwitch from "./ToggleSwitch";
import Button from "./Button";
import Autosuggest from "./Autosuggest";
import Dropdown from "./Dropdown";
import Link from "next/link";
import TextArea from "./Textarea";
import RadioList from "./RadioList";
import Upload from "./Upload";
import Checkbox from "./Checkbox";
import SearchBar from "../components/SearchBar";
import CheckboxList from "./CheckboxList";

const Form = ({
  formData,
  handleChange,
  handleBlur,
  formValues,
  touched,
  errors,
  updatedData,
  setUpdatedData,
  fieldDomRefs,
}: {
  formData: any;
  handleChange?: any;
  handleBlur?: any;
  formValues?: any;
  touched?: any;
  errors?: any;
  updatedData?: any;
  setUpdatedData?: any;
  fieldDomRefs?: any;
}) => {
  const handleFormChange = (event: any, element?: any) => {
    let filterField: any = (condition: any) =>
      Object.values(updatedData).filter((el: any) => {
        return el.name === condition;
      });
    if (element?.dependencies) {
      element.dependencies.forEach((item: any) => {
        switch (item.type) {
          case "visibility":
            {
              const fieldToBeUpdated = filterField(item.field);
              if (!item?.values?.includes(event.target.value)) {
                fieldToBeUpdated[0].visible = false;
                setUpdatedData(updatedData);
              } else {
                fieldToBeUpdated[0].visible = true;
                setUpdatedData(updatedData);
              }
            }
            break;
        }
      });
    }
    handleChange(event);
  };

  const getInputValue = (element: any) => {
    let value;

    if (formValues && formValues[element.name] !== undefined) {
      value = formValues[element.name];
    }

    return value;
  };

  const handleFormBlur = async (event: any, element?: any, check?: boolean) => {
    let timer;
    clearTimeout(timer);
    if (element) {
      if (typeof element.callback === "function") {
        const delay = element.delay || 0;
        timer = setTimeout(() => {
          element.callback(event.target, formValues);
        }, delay);
      }
    }
    // !check && (await handleBlur(event));
    await handleBlur(event);
  };

  const getTouchedValue = (element: any) => {
    let touchVal;
    if (touched && touched[element.name]) {
      touchVal = touched[element.name];
    }
    return touchVal;
  };

  const getErrors = (element: any) => {
    let error;
    if (errors && errors[element.name]) {
      error = errors[element.name];
    }
    return error;
  };

  const renderSwitch = (element: any) => {
    switch (element.elementType) {
      case "FormInput":
        return (
          <div key={element.id}>
            <Input
              key={element.id}
              type={element.type}
              label={element.label}
              placeholder={element.placeholder}
              onChange={(event) => handleFormChange(event, element)}
              className={element.className}
              onBlur={(event) => handleFormBlur(event)}
              disablePaste={element.disablePaste}
              value={getInputValue(element)}
              name={element.name}
              touched={getTouchedValue(element)}
              error={getErrors(element)}
              disabled={element.disabled}
              width={element.width}
              inputStyle={element.inputStyle}
              visible={element.visible}
              forwardedRef={fieldDomRefs[element.name]}
              feildStatus={element.flagStatus}
            />
          </div>
        );
      case "FormToggleSwitch":
        return (
          <div>
            <ToggleSwitch
              label={element.label}
              type={element.type}
              name={element.name}
              handleToggle={handleFormChange}
              error={getErrors(element)}
              className={element.className}
              value={getInputValue(element)}
              handleBlur={handleFormBlur}
              visible={element.visible}
            />
          </div>
        );
      case "FormDropdown":
        return (
          <div key={element.id}>
            <Dropdown
              name={element.name}
              options={element.options}
              height={element.height}
              onChange={(event) => handleFormChange(event, element)}
              className={element.className}
              value={getInputValue(element)}
              placeholder={element.placeholder}
              width={element.width}
              onBlur={(event) => handleFormBlur(event, element, true)}
              error={getErrors(element)}
              touched={getTouchedValue(element)}
              key={element.id}
              disabled={element.disabled}
              feildStatus={element.flagStatus}
            />
          </div>
        );
      case "FormAutosuggestDropdown":
        return (
          <div key={element.id}>
            <Autosuggest
              uniqueKey={element.id}
              placeholder={element.placeholder}
              onChange={(event) => handleFormChange(event, element)}
              className={element.className}
              onBlur={(event) => handleFormBlur(event, element)}
              value={getInputValue(element) || ""}
              name={element.name}
              suggestions={element.suggestionArray}
              error={getErrors(element)}
              touched={getTouchedValue(element)}
              popupData={element.popupData}
              popupClasses={element.popupClasses}
              width={element.width}
              canAddEntry={element.canAddEntry}
              visible={element.visible}
              forwardedRef={fieldDomRefs[element.name]}
            />
          </div>
        );
      case "FormLink":
        return (
          <Link className={element.className} href={element.href}>
            {element.name}
          </Link>
        );
      case "FormCheckboxList":
        return (
          <CheckboxList
            name={element.name}
            checked={getInputValue(element)}
            className={element.classname}
            options={element.options}
            onChange={(event: any) => handleFormChange(event, element)}
            onBlur={handleFormBlur}
            visible={element.visible}
            disabled={element.disabled}
          />
        );
      case "FormCheckbox":
        return (
          <Checkbox
            name={element.name}
            label={element.label}
            className={element.className}
            onChange={(event: any) => handleFormChange(event, element)}
            onBlur={(event: any) => handleFormBlur(event, element)}
            value={element.label}
            visible={element.visible}
            checked={getInputValue(element) ? true : false}
            disabled={element.disabled}
            callback={element.callback}
          />
        );
      // case "FormCalendar":
      // return (
      //   <div key={element.id}>
      //     <Datepicker
      //       onChange={handleFormChange}
      //       value={getInputValue(element)}
      //       name={element.name}
      //       onBlur={(event) => handleFormBlur(event, element)}
      //       error={getErrors(element)}
      //       touched={getTouchedValue(element)}
      //       placeholder={element.placeholder}
      //       disableNavigatorWidth={element.disableNavigatorWidth}
      //       disableSaturdaySelection={element.disableSaturdaySelection}
      //       disableSundaySelection={element.disableSundaySelection}
      //       disabledState={element.disabledTiles}
      //       dateFormat={element.dateFormat}
      //     />
      //   </div>
      // );
      case "FormTextarea":
        return (
          <div>
            <TextArea
              key={element.id}
              placeholder={element.placeholder}
              onChange={handleFormChange}
              classname={element.className}
              onBlur={handleBlur}
              width={element.width}
              disablePaste={element.disablePaste}
              value={getInputValue(element)}
              name={element.name}
              touched={touched[element.name]}
              error={errors[element.name]}
              disabled={element.disabled}
              feildStatus={element.flagStatus}
            />
          </div>
        );
      case "FormRadio":
        return (
          <div key={element.id}>
            <RadioList
              options={element.options}
              name={element.name}
              onChange={handleFormChange}
              onBlur={(event) => handleFormBlur(event, element)}
              checked={getInputValue(element) || ""}
              error={errors[element.name]}
              clssName={element.className}
              disabled={element.disabled}
              touched={getTouchedValue(element)}
              feildStatus={element.flagStatus}
            />
          </div>
        );
      case "FormUploadInput":
        return (
          <div>
            <Upload
              key={element.id}
              type={element.type}
              onChange={handleFormChange}
              className={element.className}
              placeholder={element.placeholder}
              acceptedFileTypes={element.accept}
              onBlur={handleBlur}
              value={getInputValue(element)}
              name={element.name}
              multiple={element.multiple}
              touched={touched[element.name]}
              error={getErrors(element)}
              icon={element.icon}
            />
          </div>
        );
      case "FormSearchBar":
        return (
          <div>
            <SearchBar
              name={element.name}
              type={element.type}
              placeholder={element.placeholder}
              className={element.className}
              filterIcon={element.filterIcon}
              onChange={element.onChange || handleFormChange}
              onBlur={handleFormBlur}
              visible={element.visible}
            />
          </div>
        );
      case "FormButton":
        return (
          <Button
            type={element.type}
            size={element.size}
            onClick={element.onClick}
            variant={element.variant}
            className={element.className}
            precedingText={element.precedingText}
            loading={element.loading}
          >
            {element.children}
          </Button>
        );

      default:
        return null;
    }
  };

  return <div>{renderSwitch(formData)}</div>;
};

export default Form;
