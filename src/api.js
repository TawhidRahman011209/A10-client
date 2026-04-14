import { auth } from "./firebase/firebase.config";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// 🔐 Get Firebase token
async function getToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

// 🌐 Core request handler
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = await getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  let data;
  const text = await res.text();

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!res.ok) {
    const error = new Error(data?.message || "API Error");
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}

//
// ✅ GENERIC METHODS (optional but useful)
//
export const apiGet = (path) => request(path);

export const apiPost = (path, body) =>
  request(path, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const apiPatch = (path, body) =>
  request(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const apiDelete = (path) =>
  request(path, {
    method: "DELETE",
  });

//
// ✅ FEATURE APIs (🔥 USE THESE IN COMPONENTS)
//

// Challenges
export const getChallenges = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/challenges${qs ? `?${qs}` : ""}`);
};

export const getChallenge = (id) =>
  request(`/challenges/${id}`);

export const addChallenge = (data) =>
  apiPost(`/challenges`, data);

export const joinChallenge = (id) =>
  apiPost(`/challenges/join/${id}`, {});

// User Challenges
export const getUserChallenges = (userId) =>
  request(`/user-challenges?userId=${userId}`);

export const updateUserChallenge = (id, body) =>
  apiPatch(`/user-challenges/${id}`, body);

// Tips
export const getTips = (limit) =>
  request(`/tips${limit ? `?limit=${limit}` : ""}`);

// Events
export const getEvents = (limit) =>
  request(`/events${limit ? `?limit=${limit}` : ""}`);

//
// ✅ DEFAULT EXPORT (optional)
//
export default {
  getChallenges,
  getChallenge,
  addChallenge,
  joinChallenge,
  getUserChallenges,
  updateUserChallenge,
  getTips,
  getEvents,
};