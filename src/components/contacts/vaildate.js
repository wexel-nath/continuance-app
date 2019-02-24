const emailRegex = new RegExp(
  "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
);

export default ({ firstName, lastName, phone, email }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "Enter a first name";
  }
  if (!lastName) {
    errors.lastName = "Enter a last name";
  }
  if (!phone) {
    errors.phone = "Enter a contact number";
  }
  if (!emailRegex.test(email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};
