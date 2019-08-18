import React from "react";
import { Link } from "react-router-dom";

import Loader from "../helper/Loader";

const MigrationRow = ({ migration }) => {
  const {
    migrationId,
    migrationOwner,
    migrationData: { rowsMigrated, rowsFailed },
    migrationStatus,
    migrationCreated
  } = migration;
  return (
    <tr>
      <td>
        <Link className="header" to={`/contacts/upload/${migrationId}`}>
          {migrationCreated}
        </Link>
      </td>
      <td>{migrationOwner || ""}</td>
      <td>{rowsMigrated || ""}</td>
      <td>{rowsFailed || ""}</td>
      <td>{migrationStatus || ""}</td>
    </tr>
  );
};

const MigrationTable = ({ migrations, loading }) => {
  return (
    <div>
      {loading && <Loader text="Loading" />}
      <table className="ui striped table">
        <thead>
          <tr>
            <th>Uploaded</th>
            <th>Uploaded By</th>
            <th>Successful</th>
            <th>Failed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {migrations.map(migration => {
            return (
              <MigrationRow migration={migration} key={migration.migrationId} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MigrationTable;
