import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import PageTitle from "../../components/helper/PageTitle";
import Loader from "../../components/helper/Loader";
import {
  DisabledInput,
  DisabledTextArea
} from "../../components/helper/formHelpers";
import { getContactById } from "../../api/continuance";

const useContact = contactId => {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);

  const getContact = async () => {
    const {
      data: { data }
    } = await getContactById(contactId);

    setContact(toCamelCase(data));
    setLoading(false);
  };

  useEffect(() => {
    getContact();
  }, []);

  return [contact, loading];
};

const ViewContact = ({ match }) => {
  const [contact, loading] = useContact(match.params.id);

  const {
    firstName,
    lastName,
    contactPhone,
    contactEmail,
    locationBased,
    locationMet,
    companyPosition,
    companyName,
    notes
  } = contact;
  const fullName = firstName ? firstName + " " + lastName : "";
  return (
    <div className="ui form container">
      <PageTitle title={fullName} icon="address card outline" />
      {loading && <Loader />}
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
        <DisabledTextArea label="Notes" value={notes || ""} />
      </div>
    </div>
  );
};

export default ViewContact;
