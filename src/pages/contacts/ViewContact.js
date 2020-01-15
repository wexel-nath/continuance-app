import React, { useState, useEffect } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Loader from "../../components/helper/Loader";
import { getContactById, getNotesForContact } from "../../api/continuance";
import ContactCard from "../../components/contacts/ContactCard";
import NotesCard from "../../components/note/NotesCard";

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

  return (
    <Container maxWidth="lg">
      {loading && <Loader text="Loading" />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ContactCard contact={contact} />
        </Grid>
        <Grid item xs={12}>
          <NotesCard contactId={contactId} notes={notes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewContact;
