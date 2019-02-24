export default ({ position, company, company_name }) => {
  const errors = {};

  if (!position) {
    errors.position = "Enter a first position";
  }

  if (company === "new" && !company_name) {
    errors.company_name = "Enter a company name";
  }

  return errors;
};
