export default ({ position, company, companyName }) => {
  const errors = {};

  if (!position) {
    errors.position = "Enter a first position";
  }

  if (company === "new" && !companyName) {
    errors.companyName = "Enter a company name";
  }

  return errors;
};
