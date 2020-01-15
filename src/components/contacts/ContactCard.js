import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";

const Row = ({ name, value }) => {
  return (
    <TableRow>
      <TableCell style={{ width: "200px" }}>{name}</TableCell>
      <TableCell align="left" style={{ fontWeight: "bold" }}>
        {value}
      </TableCell>
    </TableRow>
  );
};

const ContactContent = ({ contact }) => {
  const {
    firstName,
    lastName,
    contactPhone,
    contactEmail,
    contactLink,
    locationBased,
    locationMet,
    contactExpertise = [],
    companyPosition,
    companyName
  } = contact;

  const website = (
    <a href={contactLink} target="_blank" rel="noopener noreferrer">
      {contactLink}
    </a>
  );

  const email = <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;

  return (
    <Table size="small">
      <TableBody>
        <Row name="First Name" value={firstName} />
        <Row name="Last Name" value={lastName} />
        <Row name="Contact number" value={contactPhone} />
        <Row name="Email Address" value={email} />
        <Row name="Website" value={website} />
        <Row name="Based In" value={locationBased} />
        <Row name="Location Met" value={locationMet} />
        <Row name="Position" value={companyPosition} />
        <Row name="Expertise" value={contactExpertise.join(", ")} />
        <Row name="Company" value={companyName} />
      </TableBody>
    </Table>
  );
};

const ContactCardHeader = ({ contact }) => {
  const { firstName, lastName, contactCreated } = contact;

  const title = (
    <Typography variant="h6">{firstName + " " + lastName}</Typography>
  );

  return (
    <CardHeader
      avatar={<PersonIcon color="primary" />}
      title={title}
      subheader={`Added on ${contactCreated}`}
    />
  );
};

const ContactCard = ({ contact }) => {
  return (
    <Card>
      <ContactCardHeader contact={contact} />
      <CardContent>
        <ContactContent contact={contact} />
      </CardContent>
    </Card>
  );
};

export default ContactCard;
