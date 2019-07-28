import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event, action) => {
    let name,
      value = "";
    if (event.target) {
      event.persist();
      name = event.target.name;
      value = event.target.value;
    } else {
      name = action.name;
      value = event.value;
    }
    setValues(values => ({
      ...values,
      [name]: value
    }));
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
