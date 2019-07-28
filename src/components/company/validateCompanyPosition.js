export default ({ companyPosition, companySelector, companyName }) => {
  const errors = {};

  if (!companyPosition) {
    errors.companyPosition = "Enter a position";
  }

  if (companySelector === "new" && !companyName) {
    errors.companyName = "Enter a company name";
  }

  return errors;
};
