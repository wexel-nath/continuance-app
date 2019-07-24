import React from "react";
import { connect } from "react-redux";

import { handleGetContactList } from "../../actions";
import ContactTable from "./ContactTable";

class ListContacts extends React.Component {
  componentDidMount() {
    this.props.handleGetContactList(20, 0);
  }

  render() {
    const { contacts } = this.props;
    return (
      <div className="ui container">
        <h2 className="ui header">
          <i className="address card outline icon blue" />
          View Contacts
        </h2>
        <ContactTable contacts={contacts} />
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => {
  return { contacts };
};

export default connect(
  mapStateToProps,
  { handleGetContactList }
)(ListContacts);
