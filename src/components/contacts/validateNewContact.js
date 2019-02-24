import validateContactDetails from "./vaildateContactDetails";
import validateCompanyPosition from "../company/validateCompanyPosition";

export default formValues => {
  let errors = {};

  errors = { ...errors, ...validateContactDetails(formValues) };
  errors = { ...errors, ...validateCompanyPosition(formValues) };

  return errors;
};
