import React from "react";
import NewContact from "./contacts/NewContact";

class Content extends React.Component {
  getContent() {
    const content = this.props.content;
    if (content === "contact-add-new") {
      return <NewContact />;
    }
    return <div />;
  }

  render() {
    return (
      <div>
        <div className="ui hidden divider" />
        {this.getContent()}
      </div>
    );
  }
}

export default Content;
