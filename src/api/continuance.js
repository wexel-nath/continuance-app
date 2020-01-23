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
    url: "/contacts",
    data: data
  };
  return await requestWithAuth(continuance, config);
}

export async function getContactList(page) {
  const config = {
    method: "GET",
    url: "/contacts",
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function getContactById(contactId) {
  const config = {
    method: "GET",
    url: `/contacts/${contactId}`
  };
  return await requestWithAuth(continuance, config);
}

export async function getNotesForContact(contactId, page) {
  const config = {
    method: "GET",
    url: `/contacts/${contactId}/notes`,
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function searchContacts(search) {
  const config = {
    method: "GET",
    url: "/contacts/search",
    params: { search }
  };
  return await requestWithAuth(continuance, config);
}

export async function getCompanyList() {
  const config = {
    method: "GET",
    url: "/companies"
  };
  return await requestWithAuth(continuance, config);
}

export async function getExpertiseList() {
  const config = {
    method: "GET",
    url: "/expertise"
  };
  return await requestWithAuth(continuance, config);
}

export async function getRecentNotes(page) {
  const config = {
    method: "GET",
    url: `/notes`,
    params: { page }
  };
  return await requestWithAuth(continuance, config);
}

export async function uploadContacts(file) {
  const formData = new FormData();
  formData.append("migration", file);
  const config = {
    method: "POST",
    url: `/migrations`,
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
    url: "/migrations",
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
    url: `/submissions/${submissionId}`
  };
  return await requestWithAuth(continuance, config);
}

export async function getReviewById(submissionId, reviewId) {
  const config = {
    method: "GET",
    url: `/submissions/${submissionId}/reviews/${reviewId}`
  };
  return await requestWithAuth(continuance, config);
}

export async function getReviewsBySubmissionById(submissionId) {
  const config = {
    method: "GET",
    url: `/submissions/${submissionId}/reviews`
  };
  return await requestWithAuth(continuance, config);
}

export async function newReview(submissionId, data) {
  const config = {
    method: "POST",
    url: `/submissions/${submissionId}/reviews`,
    data: data
  };
  return await requestWithAuth(continuance, config);
}
