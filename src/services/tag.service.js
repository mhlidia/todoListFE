import { API_BASE_URL } from "./index";

const TAG_URL = `${API_BASE_URL}tags`;

export const getAllTags = async () => {
  const response = await fetch(TAG_URL);
  if (!response.ok) throw new Error("Error fetching tags");
  return await response.json();
};

export const getOneTag = async (id) => {
  const response = await fetch(`${TAG_URL}/${id}`);
  if (!response.ok) throw new Error("Error fetching tag");
  return await response.json();
};

export const createTag = async (data) => {
  const response = await fetch(TAG_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error creating tag");
  return await response.json();
};

export const updateTag = async (id, data) => {
  const response = await fetch(`${TAG_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error updating tag");
  return await response.json();
};

export const deleteTag = async (id) => {
  const response = await fetch(`${TAG_URL}/${id}`, {
    method: "DELETE",
    headers: { "Accept": "application/json" }
  });

  if (!response.ok) throw new Error("Error deleting tag");
  return true;
};