import { apiFetch } from "./api";

export const getAllTags = async () => {
  const response = await apiFetch("tags");
  if (!response.ok) throw new Error("Error fetching tags");
  return await response.json();
};

export const getOneTag = async (id) => {
  const response = await apiFetch(`tags/${id}`);
  if (!response.ok) throw new Error("Error fetching tag");
  return await response.json();
};

export const createTag = async (data) => {
  const response = await apiFetch("tags", {
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error creating tag");
  }

  return await response.json();
};

export const updateTag = async (id, data) => {
  const response = await apiFetch(`tags/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error updating tag");
  }

  return await response.json();
};

export const deleteTag = async (id) => {
  const response = await apiFetch(`tags/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Error deleting tag");
  }

  return true;
};