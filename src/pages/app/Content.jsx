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
import ManageOperators from "../administration/ManageOperators";

const routes = {
  "/contacts/new": NewContact,
  "/contacts": ListContacts,
  "/contacts/search": SearchContacts,
  "/contacts/upload": UploadContacts,
  "/contacts/:id": ViewContact,
  "/preferences": Preferences,
  "/submissions": ListSubmissions,
  "/submissions/:id": ViewSubmission,
  "/submissions/:id/review": ReviewSubmission,
  "/submissions/:submissionId/reviews/:reviewId": ViewReview,
  "/operators": ManageOperators,
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
