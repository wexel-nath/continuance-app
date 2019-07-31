import React from "react";

import Loader from "../helper/Loader";

const NoteRow = ({ note }) => {
  const { noteCreated, noteCreatedBy, noteType, noteContent } = note;
  return (
    <tr>
      <td>{noteCreated || ""}</td>
      <td>{noteCreatedBy || ""}</td>
      <td>{noteType || ""}</td>
      <td>{noteContent || ""}</td>
    </tr>
  );
};

const NoteTable = ({ notes, loading }) => {
  return (
    <div>
      {loading && <Loader text="Loading" />}
      <table className="ui striped table">
        <thead>
          <tr>
            <th>Created</th>
            <th>Created By</th>
            <th>Note Type</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => {
            return <NoteRow note={note} key={note.noteId} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NoteTable;
