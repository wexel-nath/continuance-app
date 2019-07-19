export default ({ position, companySelector, companyName }) => {
  const errors = {};

  if (!position) {
    errors.position = "Enter a first position";
  }

  if (companySelector === "new" && !companyName) {
    errors.companyName = "Enter a company name";
  }

  return errors;
};
