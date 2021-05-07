import React from "react";
import { Route, Switch } from "react-router-dom";

import ListContacts from "../contacts/ListContacts";
import NewContact from "../contacts/NewContact";
import SearchContacts from "../contacts/SearchContacts";
import UploadContacts from "../contacts/UploadContacts";
import ViewContact from "../contacts/ViewContact";
import Preferences from "../Preferences";
import ListSubmissions from "../submissions/ListSubmissions";
import ViewSubmission from "../submissions/ViewSubmission";
import ReviewSubmission from "../submissions/ReviewSubmission";
import ViewReview from "../submissions/ViewReview";
import LandingPage from "../LandingPage";
import ManageUsers from "../administration/ManageUsers";
import NewUser from "../administration/NewUser";

const routes = {
  "/contacts": ListContacts,
  "/contacts/new": NewContact,
  "/contacts/search": SearchContacts,
  "/contacts/upload": UploadContacts,
  "/contacts/:id": ViewContact,
  "/preferences": Preferences,
  "/short-film/:year/submissions": ListSubmissions,
  "/short-film/:year/submissions/:id": ViewSubmission,
  "/short-film/:year/submissions/:id/review": ReviewSubmission,
  "/short-film/:year/submissions/:submissionId/reviews/:reviewId": ViewReview,
  "/users": ManageUsers,
  "/users/new": NewUser,
  "/": LandingPage
};

const Content = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Switch>
        {Object.entries(routes).map(([route, component]) => (
          <Route key={route} exact path={route} component={component} />
        ))}
      </Switch>
    </div>
  );
};

export default Content;
