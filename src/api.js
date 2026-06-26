import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({ baseURL: API_URL });

export async function createCard(payload) {
  const { data } = await client.post("/cards", payload);
  return data;
}

export async function fetchGallery(limit = 24) {
  const { data } = await client.get("/cards", { params: { limit } });
  return data;
}

export async function fetchCard(id) {
  const { data } = await client.get(`/cards/${id}`);
  return data;
}

export async function deleteCard(id) {
  const { data } = await client.delete(`/cards/${id}`);
  return data;
}
