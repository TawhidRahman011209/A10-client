
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch (e) { data = text; }
  if (!res.ok) {
    const error = new Error(data?.message || "API error");
    error.status = res.status;
    error.body = data;
    throw error;
  }
  return data;
}

export const getChallenges = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/challenges${qs ? `?${qs}` : ""}`);
};

export const getChallenge = (id) => request(`/challenges/${id}`);
export const addChallenge = (data, token) =>
  request(`/challenges`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(data)
  });

export const joinChallenge = (id, body, token) =>
  request(`/challenges/join/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body)
  });

export const getTips = (limit) => {
  return request(`/tips${limit ? `?limit=${limit}` : ""}`);
};

export const getEvents = (limit) => {
  return request(`/events${limit ? `?limit=${limit}` : ""}`);
};

export const getUserChallenges = (userId) => request(`/user-challenges?userId=${encodeURIComponent(userId)}`);
export const updateUserChallenge = (id, body) =>
  request(`/user-challenges/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

export default { getChallenges, getChallenge, addChallenge, joinChallenge, getTips, getEvents, getUserChallenges, updateUserChallenge };
