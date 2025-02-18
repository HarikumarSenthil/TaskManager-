"use client";
import { useEffect, useState } from "react";
import Form from "../../shared-components/ui/Form";
import { useValidation } from "../validation/hooks";
import Button from "@/shared-components/ui/Button";
import { decodeUserToken } from "..";

const FormRender = ({
  formHeading,
  formSubHeading,
  formData,
  formLabelStyle = "text-base mb-4",
  formColumn,
  headingStyle,
  formStyle,
  btnConfig,
  btnStyle,
  initialStaticData,
  validations,
  updatedState,
  customUpdatedState,
  autoCalculatedVals,
  resetFormHandler,
  submitForm,
  className,
  showNoLabel = false,
  buttonPlace = false,
}: {
  formHeading?: string;
  formSubHeading?: string;
  formData: any;
  formLabelStyle?: string;
  formStyle?: string;
  formColumn?: number;
  headingStyle?: string;
  initialStaticData: any;
  initialCustomStaticData?: any;
  btnStyle?: string;
  btnConfig?: any;
  formKeyDependent?: string;
  validations?: any;
  updatedState?: any;
  customUpdatedState?: any;
  autoCalculatedVals?: any;
  acknowledgementData?: any;
  formResponse?: any;
  editForm?: boolean;
  submitForm?: any;
  resetFormHandler?: () => any;
  getFormVals?: (_: any) => any;
  showNoLabel?: boolean;
  buttonPlace?: boolean;
  className?: string;
}) => {
  const [updatedData, setUpdatedData] = useState<any>(formData);
  const { role } = decodeUserToken();

  useEffect(() => {
    setUpdatedData(formData);
  }, [formData]);

  const visibilityArr: any = [];

  Object.values(updatedData).forEach((input: any) => {
    if (input.elementType !== "ComponentFormButton") {
      if (input.visible === false) {
        visibilityArr.push(input.name);
      }
    }
  });

  const [
    errors,
    values,
    touched,
    fieldDomRefs,
    markAllTouched,
    handleChange,
    handleBlur,
    resetForm,
    validateFormData,
    setValues,
    setErrors,
    updateFormErrors,
  ] = useValidation(
    initialStaticData,
    validations,
    visibilityArr,
    autoCalculatedVals
  );

  // const markFieldsTouched = () => {
  //     const touchedData = {};
  //     setFieldTouched(touchedData);
  // };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setErrors({});
    markAllTouched();
    // markFieldsTouched();
    let isValid = await validateFormData();
    if (!isValid) {
      return;
    }
    if (submitForm) {
      // dispatch<any>(apiCallStarted());
      const res = await submitForm(values);
      if (!res?.errors) {
        resetForm();
      }
      // dispatch<any>(apiCallResolved());
      return res;
    }
  };

  const resetDataHandler = async () => {
    if (resetFormHandler) {
      // dispatch<any>(apiCallStarted());
      await resetFormHandler();
      await resetForm();
      // dispatch<any>(apiCallResolved());
    } else {
      await resetForm();
    }
  };

  const formRender = (formDataList: any, GridClass: any, index: number) => {
    const visibilityHandler = () => {
      if (formDataList?.dependencies) {
        formDataList.dependencies.forEach((item: any) => {
          let filterField: any = () =>
            Object.values(updatedData).filter((el: any) => {
              return el.name === item.field;
            });
          const fieldToBeHidden = filterField();
          if (
            values[formDataList?.name] &&
            Array.isArray(item?.values) &&
            !item.values.includes(values[formDataList.name])
          ) {
            fieldToBeHidden[0].visible = false;
            visibilityArr.push(fieldToBeHidden[0].name);
          }
        });
      }
    };
    visibilityHandler();
    let form =
      Object.keys(formDataList).length > 0 ? (
        <div className={`grid  ${GridClass}`}>
          {Object.keys(formDataList)?.map((formEle, index) => {
            return (
              <div key={index} className={`${formDataList[formEle].class}`}>
                <div className="font-medium font-sans ">
                  {formDataList[formEle].feildName}
                </div>
                <Form
                  formData={formDataList[formEle]}
                  handleChange={handleChange}
                  formValues={values}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                  updatedData={formData}
                  setUpdatedData={setUpdatedData}
                  fieldDomRefs={fieldDomRefs}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Form
          formData={formDataList}
          handleChange={(element: string) => handleChange(element)}
          formValues={values}
          touched={touched}
          handleBlur={handleBlur}
          errors={errors}
          updatedData={formData}
          setUpdatedData={setUpdatedData}
          fieldDomRefs={fieldDomRefs}
        />
      );

    return (
      <div
        className={`${formDataList?.visible === false && "hidden"}`}
        key={index}
      >
        {/* {formFieldsLabel !== "noLabel" && !showNoLabel && (
          <div className={formLabelStyle}>{formFieldsLabel}</div>
        )} */}
        {form}
      </div>
    );
  };

  const isDisabled = () => {
    const isEnabled = Object.values(values).map((e: any) =>
      !e ? true : false
    );
    if (isEnabled && Object.keys(errors).length > 0) {
      return isEnabled;
    } else {
      return false;
    }
  };

  return (
    <div>
      {formHeading && (
        <h3 className={`font-bold text-xl mb-4 ${headingStyle}`}>
          {formHeading}
        </h3>
      )}
      {formSubHeading && (
        <h3
          className={`font-bold text-base tracking-wide text-secondary mb-10 ${headingStyle}`}
        >
          {formSubHeading}
        </h3>
      )}
      {buttonPlace && (
        <div className={btnStyle}>
          {btnConfig?.map((btn: any, index: number) => (
            <div key={index}>
              <Button
                type={btn.type}
                size={btn.size}
                onClick={
                  btn.type === "reset"
                    ? resetDataHandler
                    : btn.onClick || handleSubmit
                }
                variant={btn.variant}
                className={btn.className}
                precedingText={btn.precedingText}
                loading={btn.loading}
                disabled={btn.disabled}
                onSubmit={btn.onSubmit && isDisabled()}
              >
                {btn.children}
              </Button>
            </div>
          ))}
        </div>
      )}

      <form noValidate className={`${formStyle}`}>
        {Object.keys(updatedData).map((formFieldsLabel: any, index) => {
          return (
            <div key={index}>
              {formRender(
                updatedData[formFieldsLabel].config,
                updatedData[formFieldsLabel].className,
                index
              )}
            </div>
          );
        })}
      </form>

      {!buttonPlace && (
        <div className={btnStyle}>
          {btnConfig?.map((btn: any, index: number) => (
            <div key={index}>
              <Button
                type={btn.type}
                size={btn.size}
                onClick={
                  btn.type === "reset"
                    ? resetDataHandler
                    : btn.onClick || handleSubmit
                }
                variant={btn.variant}
                className={btn.className}
                precedingText={btn.precedingText}
                loading={btn.loading}
                disabled={btn.disabled}
                onSubmit={btn.onSubmit && isDisabled()}
              >
                {btn.children}
              </Button>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .form-grid {
          grid-template-columns: repeat(${formColumn || 1}, 1fr);
          grid-column-gap: 4.5rem;
          grid-row-gap: ${formColumn && (formColumn > 1 ? "2rem" : "1rem")};
        }

        .form-grid:nth-child(n-1){
          margin-bottom:${formColumn && formColumn > 1 && "2rem"};
        }

        @media screen and (max-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default FormRender;
