import React from "react";
import { Link } from "react-router-dom";

import Loader from "../helper/Loader";

const NoteRow = ({ includeContact, note }) => {
  const {
    firstName,
    lastName,
    contactId,
    noteCreated,
    noteCreatedBy,
    noteType,
    noteContent
  } = note;
  return (
    <tr>
      {includeContact && (
        <td>
          <Link className="header" to={`/contacts/${contactId}`}>
            {firstName + " " + lastName}
          </Link>
        </td>
      )}
      <td>{noteType}</td>
      <td>{noteContent}</td>
      <td>{noteCreatedBy}</td>
      <td>{noteCreated}</td>
    </tr>
  );
};

const NoteTable = ({ includeContact, notes, loading }) => {
  return (
    <div>
      {loading && <Loader text="Loading" />}
      <table className="ui striped table">
        <thead>
          <tr>
            {includeContact && <th>Contact</th>}
            <th>Note Type</th>
            <th>Content</th>
            <th>Created By</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => {
            return (
              <NoteRow
                note={note}
                key={note.noteId}
                includeContact={includeContact}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;
