import axios from "axios";

import { request, requestWithAuth } from "./request";

const continuance = axios.create({
  baseURL: "https://continuance-server.herokuapp.com"
});

export async function getHealth() {
  return await request(continuance.get("/healthz"));
}

export async function newContact(data) {
  const config = {
    method: "POST",
    url: "/contact",
    data: data
  };
  return await requestWithAuth(continuance, config);
}

export async function getContactList(page) {
  const config = {
    method: "GET",
    url: "/contact",
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function getContactById(contactId) {
  const config = {
    method: "GET",
    url: `/contact/${contactId}`
  };
  return await requestWithAuth(continuance, config);
}

export async function getNotesForContact(contactId, page) {
  const config = {
    method: "GET",
    url: `/contact/${contactId}/notes`,
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function searchContacts(search) {
  const config = {
    method: "GET",
    url: "/search/contact",
    params: { search }
  };
  return await requestWithAuth(continuance, config);
}

export async function getCompanyList() {
  const config = {
    method: "GET",
    url: "/company"
  };
  return await requestWithAuth(continuance, config);
}

export async function getExpertiseList() {
  const config = {
    method: "GET",
    url: "/company-expertise"
  };
  return await requestWithAuth(continuance, config);
}

export async function getRecentNotes(page) {
  const config = {
    method: "GET",
    url: `/recent-notes`,
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function uploadContacts(file) {
  const formData = new FormData();
  formData.append("migration", file);
  const config = {
    method: "POST",
    url: `/migrate`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return await requestWithAuth(continuance, config);
}

export async function getMigrationList(page) {
  const config = {
    method: "GET",
    url: "/migrate",
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function getSubmissionList(page) {
  const config = {
    method: "GET",
    url: "/submissions",
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function getSubmissionById(submissionId) {
  const config = {
    method: "GET",
    url: `/submission/${submissionId}`
  };
  return await requestWithAuth(continuance, config);
}

export async function getReviewsBySubmissionById(submissionId) {
  const config = {
    method: "GET",
    url: `/submission/${submissionId}/reviews`
  };
  return await requestWithAuth(continuance, config);
}
