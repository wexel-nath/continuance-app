import React from "react";
import { connect } from "react-redux";

class ListContacts extends React.Component {
  render() {
    console.log(this.props.contacts);
    return <div>ListContacts</div>;
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  };
};

export default connect(mapStateToProps)(ListContacts);
