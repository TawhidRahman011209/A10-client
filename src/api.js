
import { auth } from "./firebase/firebase.config";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

async function getToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";

  const token = await getToken();
  if (token) options.headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, options);

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

export const getChallenges = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/challenges${qs ? "?" + qs : ""}`);
};

export const getChallenge = (id) => request(`/challenges/${id}`);

export const addChallenge = (data) =>
  request(`/challenges`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const joinChallenge = (id) =>
  request(`/challenges/join/${id}`, {
    method: "POST",
    body: JSON.stringify({}),
  });

export const getUserChallenges = (userId) =>
  request(`/user-challenges?userId=${userId}`);

export const updateUserChallenge = (id, body) =>
  request(`/user-challenges/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const getTips = (limit) =>
  request(`/tips${limit ? `?limit=${limit}` : ""}`);

export const getEvents = (limit) =>
  request(`/events${limit ? `?limit=${limit}` : ""}`);


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
