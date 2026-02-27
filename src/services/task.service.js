import { apiFetch } from "./api";

export const getAllTasks = async () => {
  const response = await apiFetch("tasks");
  if (!response.ok) throw new Error("Error fetching tasks");
  return await response.json();
};

export const createTask = async (data) => {
  const response = await apiFetch("tasks", {
    method: "POST",
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error creating task");
  return await response.json();
};

export const updateTask = async (id, data) => {
  const response = await apiFetch(`tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error updating task");
  return await response.json();
};

export const deleteTask = async (id) => {
  const response = await apiFetch(`tasks/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("Error deleting task");
  return true;
};