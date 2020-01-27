import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TheatersIcon from "@material-ui/icons/Theaters";

import { ButtonLink } from "../ui/Button";

const Row = ({ name, value }) => {
  return (
    <TableRow>
      <TableCell style={{ width: "250px" }}>{name}</TableCell>
      <TableCell
        align="left"
        style={{ fontWeight: "bold", whiteSpace: "pre-line" }}
      >
        {value}
      </TableCell>
    </TableRow>
  );
};

const boolValue = value => {
  return value ? "Yes" : "No";
};

const SubmissionContent = ({
  data,
  featureScript,
  shortScript,
  supportingFiles
}) => {
  if (!data) {
    return null;
  }
  const {
    altContactName,
    altContactEmail,
    previouslySubmitted,
    budget,
    hasFunding,
    fundingDetails,
    location,
    logline,
    synopsis,
    genre,
    primaryAudience,
    hasFemaleProtagonist,
    hasDiversity,
    diversityDetails,
    website,
    visionStatement,
    videoLinks,
    socialMedia,
    referenceFilms,
    chainOfTitle,
    otherTeam,
    orderId,
    orderTotal
  } = data;

  const fileLinks = supportingFiles.map(file => <FileLink file={file} />);

  return (
    <Table size="small">
      <TableBody>
        <Row name="Short Script" value={<FileLink file={shortScript} />} />
        <Row name="Feature Script" value={<FileLink file={featureScript} />} />
        <Row name="Supporting Files" value={fileLinks} />
        <Row name="Alternative Contact Name" value={altContactName} />
        <Row name="Alternative Contact Email" value={altContactEmail} />
        <Row
          name="Previously Submitted"
          value={boolValue(previouslySubmitted)}
        />
        <Row name="Project Budget (USD)" value={budget} />
        <Row
          name="Project Funding"
          value={hasFunding ? fundingDetails : "No"}
        />
        <Row name="Location" value={location} />
        <Row name="Logline" value={logline} />
        <Row name="Synopsis" value={synopsis} />
        <Row name="Reference Films" value={referenceFilms} />
        <Row name="Genre" value={genre} />
        <Row name="Primary Audience" value={primaryAudience} />
        <Row
          name="Female Protagonist"
          value={boolValue(hasFemaleProtagonist)}
        />
        <Row name="Diversity" value={hasDiversity ? diversityDetails : "No"} />
        <Row name="Website" value={website} />
        <Row name="Vision Statement" value={visionStatement} />
        <Row name="Chain of Title" value={chainOfTitle} />
        <Row name="Other Team Members" value={otherTeam} />
        <Row name="Video Links" value={videoLinks} />
        <Row name="Social Media" value={socialMedia} />
        <Row name="Squarespace Order Id" value={orderId} />
        <Row
          name="Squarespace Order Total"
          value={orderTotal && "$" + orderTotal}
        />
      </TableBody>
    </Table>
  );
};

const FileLink = ({ file }) => {
  const { url, name } = file;
  return (
    <Typography>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </Typography>
  );
};

export const SubmissionCardHeader = ({ submission, reviewable }) => {
  const {
    firstName,
    lastName,
    contactId,
    scriptTitle,
    submissionCreated,
    submissionId
  } = submission;

  const inlineStyle = {
    display: "inline",
    margin: 0,
    padding: 0
  };

  const title = (
    <>
      <Typography variant="h6" style={inlineStyle}>
        {scriptTitle}
      </Typography>
      <p style={inlineStyle}>
        {" submitted by "}
        <Link to={`/contacts/${contactId}`}>{firstName + " " + lastName}</Link>
      </p>
    </>
  );

  const reviewButton = reviewable && (
    <ButtonLink text="Review" to={`/submissions/${submissionId}/review`} />
  );

  return (
    <CardHeader
      avatar={<TheatersIcon color="primary" />}
      title={title}
      subheader={submissionCreated}
      action={reviewButton}
    />
  );
};

const SubmissionCard = ({ submission }) => {
  const {
    shortScript,
    featureScript,
    submissionData,
    supportingFiles
  } = submission;
  return (
    <Card>
      <SubmissionCardHeader submission={submission} reviewable />
      <CardContent>
        <SubmissionContent
          shortScript={shortScript}
          featureScript={featureScript}
          data={submissionData}
          supportingFiles={supportingFiles || []}
        />
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
