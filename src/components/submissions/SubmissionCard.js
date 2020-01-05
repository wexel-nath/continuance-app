import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TheatersIcon from "@material-ui/icons/Theaters";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

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

const protagonistValue = data => {
  const {
    hasFemaleProtagonist,
    hasAsianProtagonist,
    hasOtherProtagonist,
    otherProtagonist
  } = data;
  let protagonists = [];
  if (hasFemaleProtagonist) protagonists.push("female");
  if (hasAsianProtagonist) protagonists.push("asian");
  if (hasOtherProtagonist) protagonists.push(otherProtagonist);
  return protagonists.join();
};

const SubmissionContent = ({ data }) => {
  if (!data) {
    return null;
  }
  const {
    altContactName,
    altContactEmail,
    alreadySubmitted,
    budget,
    hasFunding,
    fundingDetails,
    location,
    synopsisLine,
    synopsisParagraph,
    genre,
    targetAudience,
    visionStatement,
    videoLinks,
    socialMedia,
    referenceFilms,
    hasDiversity,
    diversityDetails,
    chainOfTitle,
    otherTeam
  } = data;

  return (
    <Table>
      <TableBody>
        <Row name="Alternative Contact Name" value={altContactName} />
        <Row name="Alternative Contact Email" value={altContactEmail} />
        <Row name="Previously Submitted" value={boolValue(alreadySubmitted)} />
        <Row name="Project Budget (USD)" value={budget} />
        <Row name="Project Funding" value={hasFunding && fundingDetails} />
        <Row name="Location" value={location} />
        <Row name="One-line Synopsis" value={synopsisLine} />
        <Row name="One-Paragraph Synopsis" value={synopsisParagraph} />
        <Row name="Genre" value={genre} />
        <Row name="Target Audience" value={targetAudience} />
        <Row name="Protagonist" value={protagonistValue(data)} />
        <Row name="Vision Statement" value={visionStatement} />
        <Row name="Video Links" value={videoLinks} />
        <Row name="Social Media" value={socialMedia} />
        <Row name="Reference Films" value={referenceFilms} />
        <Row name="Diversity" value={hasDiversity && diversityDetails} />
        <Row name="Chain of Title" value={chainOfTitle} />
        <Row name="Other Team Members" value={otherTeam} />
      </TableBody>
    </Table>
  );
};

const SubmissionCard = ({ submission }) => {
  const {
    firstName,
    lastName,
    contactId,
    scriptFile,
    scriptTitle,
    submissionCreated,
    submissionData
  } = submission;

  const title = (
    <div>
      <a
        href={scriptFile}
        target="_blank"
        rel="noopener noreferrer"
        download={scriptTitle}
      >
        {scriptTitle}
      </a>
      {" submitted by "}
      <Link to={`/contacts/${contactId}`}>{firstName + " " + lastName}</Link>
    </div>
  );

  return (
    <Card>
      <CardHeader
        avatar={<TheatersIcon />}
        title={title}
        subheader={submissionCreated}
      />
      <CardContent>
        <SubmissionContent data={submissionData} />
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
