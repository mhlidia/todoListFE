import { API_BASE_URL } from "./index";

export const apiFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include"
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return response;
};