import { useState } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };

  //   student allocation

  //   const handleInputChangeStd = (e) => {
  //
  const handleInputChangetoNumberStd = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseInt(value, 10),
    });
  };

  const handleInputChangetoDOB = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });

    validate(fieldValue);
  };
  const handleInputChangetoNumber = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: parseInt(value, 10) };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };
  const handleInputChangetoNumberAge = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: parseInt(value, 10) };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue);
  };

  const resetForm = () => {
    setValues({
      ...initialFieldValues,
    });
    setErrors({});
    setCurrentId(0);
  };
  const resetFormControls = () => {
    setValues(initialFieldValues());
    setErrors({});
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleInputChangetoNumber,
    handleInputChangetoNumberAge,
    handleInputChangetoDOB,
    handleInputChangetoNumberStd,
    resetForm,
    resetFormControls,
  };
};

export default useForm;
