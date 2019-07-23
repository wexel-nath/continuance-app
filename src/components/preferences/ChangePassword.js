import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { renderTextInput } from "../helper/formHelpers";
import { changePassword } from "../../api/authentication";

const FORM_NAME = "change_password";

class ChangePassword extends React.Component {
  state = {
    message: "",
    loading: false
  };

  handleChangePassword = async ({ newPassword }) => {
    this.setState({ loading: true });

    const {
      data: { meta },
      status,
      statusText
    } = await changePassword(newPassword);

    const message =
      status === 200 ? "Your password has been updated." : meta || statusText;
    this.setState({ message, loading: false });
  };

  render() {
    const { handleSubmit } = this.props;
    const { message, loading } = this.state;

    return (
      <div className={`ui ${loading && "loading"} segment`}>
        <h3>Change Password</h3>
        <form
          className="ui form"
          onSubmit={handleSubmit(this.handleChangePassword)}
        >
          <div className="two fields">
            <Field
              component={renderTextInput}
              name="newPassword"
              placeholder="New Password"
              type="password"
            />
            <Field
              component={renderTextInput}
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
          </div>

          <button className="ui primary button" type="submit">
            Change my password
          </button>
        </form>
        {message && <div className="ui warning message">{message}</div>}
      </div>
    );
  }
}

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

const formFunc = reduxForm({
  form: FORM_NAME,
  validate
})(ChangePassword);

export default connect()(formFunc);
