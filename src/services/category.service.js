import { apiFetch } from "./api";

export const getAllCategories = async () => {

  const response = await apiFetch("categories");

  if (!response.ok) {
    throw new Error("Error fetching categories");
  }

  return await response.json();
};

export const getOneCategory = async (id) => {
  const response = await apiFetch(`categories/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching category");
  }

  return await response.json();
};

export const createCategory = async (data) => {
  const response = await apiFetch("categories", {
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error creating category");
  }

  return await response.json();
};

export const updateCategory = async (id, data) => {
  const response = await apiFetch(`categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error updating category");
  }

  return await response.json();
};

export const deleteCategory = async (id) => {
  const response = await apiFetch(`categories/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Error deleting category");
  }

  return true;
};
