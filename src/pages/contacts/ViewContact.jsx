import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { camelizeKeys as toCamelCase } from "humps";

import PageTitle from "../../components/helper/PageTitle";
import Loader from "../../components/helper/Loader";
import { DisabledInput } from "../../components/helper/formHelpers";
import { getContactById, getNotesForContact } from "../../api/continuance";
import NoteTable from "../../components/note/NoteTable";

import "./ViewContact.css";

const useContact = contactId => {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const getContact = async () => {
    const {
      data: { data }
    } = await getContactById(contactId);

    setContact(toCamelCase(data));
    setLoading(false);
  };

  const getNotes = async () => {
    const {
      data: { data }
    } = await getNotesForContact(contactId);

    setNotes(toCamelCase(data));
  };

  useEffect(() => {
    getContact();
    getNotes();
  }, []);

  return [contact, notes, loading];
};

const ViewContact = ({ match }) => {
  const contactId = match.params.id;
  const [contact, notes, loading] = useContact(contactId);

  const {
    firstName,
    lastName,
    contactPhone,
    contactEmail,
    locationBased,
    locationMet,
    companyPosition,
    companyName
  } = contact;
  const fullName = firstName ? firstName + " " + lastName : "";
  return (
    <div className="ui form container">
      <PageTitle title={fullName} icon="address card outline" />
      {loading && <Loader text="Loading" />}
      <div className="ui segment">
        <div className="two fields">
          <DisabledInput label="First Name" value={firstName || ""} />
          <DisabledInput label="Last Name" value={lastName || ""} />
        </div>
        <div className="two fields">
          <DisabledInput label="Contact Number" value={contactPhone || ""} />
          <DisabledInput label="Email Address" value={contactEmail || ""} />
        </div>
        <div className="two fields">
          <DisabledInput label="Based In" value={locationBased || ""} />
          <DisabledInput label="Location Met" value={locationMet || ""} />
        </div>
        <div className="two fields">
          <DisabledInput label="Position" value={companyPosition || ""} />
          <DisabledInput label="Company" value={companyName || ""} />
        </div>
      </div>
      <div className="ui clearing segment">
        <h3 className="ui header">Recent Notes</h3>
        <NoteTable notes={notes} />
        <Link
          className="ui right floated primary button table-action"
          to={`/contacts/${contactId}/note`}
        >
          See all Recent Notes
        </Link>
      </div>
    </div>
  );
};

export default ViewContact;
