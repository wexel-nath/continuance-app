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
      <TableCell align="left" style={{ fontWeight: "bold" }}>
        {value}
      </TableCell>
    </TableRow>
  );
};

const boolValue = value => {
  return value ? "Yes" : "No";
};

const SubmissionContent = ({ data, supportingFiles }) => {
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
    otherTeam
  } = data;

  const fileLinks = supportingFiles.map(file => {
    const parts = file.split("/");
    return (
      <Typography>
        <FileLink href={file} title={parts[parts.length - 1]} />
      </Typography>
    );
  });

  return (
    <Table size="small">
      <TableBody>
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
      </TableBody>
    </Table>
  );
};

const FileLink = ({ href, title }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" download={title}>
      {title}
    </a>
  );
};

export const SubmissionCardHeader = ({ submission, reviewable }) => {
  const {
    firstName,
    lastName,
    contactId,
    shortScript,
    featureScript,
    scriptTitle,
    submissionCreated,
    submissionId
  } = submission;

  const title = (
    <Typography variant="h6">
      <FileLink href={featureScript} title={scriptTitle} />
      {" submitted by "}
      <Link to={`/contacts/${contactId}`}>{firstName + " " + lastName}</Link>
    </Typography>
  );

  const reviewButton = reviewable && (
    <ButtonLink text="Review" to={`/submissions/${submissionId}/review`} />
  );

  const subHeader = (
    <div>
      {submissionCreated}
      {" | "}
      <FileLink href={shortScript} title="Short" />
      {" | "}
      <FileLink href={featureScript} title="Feature" />
    </div>
  );

  return (
    <CardHeader
      avatar={<TheatersIcon color="primary" />}
      title={title}
      subheader={subHeader}
      action={reviewButton}
    />
  );
};

const SubmissionCard = ({ submission }) => {
  const { submissionData, supportingFiles } = submission;
  return (
    <Card>
      <SubmissionCardHeader submission={submission} reviewable />
      <CardContent>
        <SubmissionContent
          data={submissionData}
          supportingFiles={supportingFiles || []}
        />
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
