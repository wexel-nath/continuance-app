import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";

import { ButtonLink } from "../ui/Button";
import NoteTable from "./NoteTable";

const NotesCardHeader = ({ contactId, text }) => {
  const title = <Typography variant="h6">{text}</Typography>;

  const seeAllNotesButton = (
    <ButtonLink
      text="See All Recent Notes"
      to={`/contacts/${contactId}/notes`}
    />
  );

  return (
    <CardHeader
      avatar={<CommentIcon color="primary" />}
      title={title}
      action={seeAllNotesButton}
    />
  );
};

const NotesCard = ({ contactId, notes }) => {
  return (
    <Card>
      <NotesCardHeader contactId={contactId} text="Recent Notes" />
      <CardContent>
        <NoteTable notes={notes} />
      </CardContent>
    </Card>
  );
};

export default NotesCard;
