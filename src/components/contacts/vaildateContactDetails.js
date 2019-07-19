const emailRegex = new RegExp(
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
);

export default ({ firstName, lastName, contactPhone, contactEmail }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "Enter a first name";
  }
  if (!lastName) {
    errors.lastName = "Enter a last name";
  }
  if (!contactPhone) {
    errors.contactPhone = "Enter a contact number";
  }
  if (!emailRegex.test(contactEmail)) {
    errors.contactEmail = "Enter a valid email address";
  }

  return errors;
};
