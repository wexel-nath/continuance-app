import React, { useState } from "react";

import { Input } from "../helper/formHelpers";
import useForm from "../helper/useForm";
import { changePassword } from "../../api/authentication";

const validate = ({ newPassword, confirmPassword }) => {
  const errors = {};

  if (!newPassword) {
    errors.newPassword = "Enter your new password";
  }
  if (!confirmPassword || newPassword !== confirmPassword) {
    errors.confirmPassword = "Type it again to confirm";
  }
  return errors;
};

const useChangePassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async ({ newPassword }) => {
    setLoading(true);
    const {
      data: { meta },
      status,
      statusText
    } = await changePassword(newPassword);

    setMessage(
      status === 200 ? "Your password has been updated." : meta || statusText
    );
    setLoading(false);
  };

  const formValues = useForm(handleChangePassword, validate);
  return [formValues, message, loading];
};

const ChangePassword = () => {
  const [formValues, message, loading] = useChangePassword();

  return (
    <div className={`ui ${loading && "loading"} segment`}>
      <h3>Change Password</h3>
      <form className="ui form" onSubmit={formValues.handleSubmit}>
        <div className="two fields">
          <Input
            name="newPassword"
            placeholder="New Password"
            type="password"
            formValues={formValues}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            formValues={formValues}
          />
        </div>
        <button className="ui primary button" type="submit">
          Change my password
        </button>
      </form>
      {message && <div className="ui warning message">{message}</div>}
    </div>
  );
};

export default ChangePassword;
