import { API_BASE_URL } from "./index";

const TASK_URL = `${API_BASE_URL}tasks`;

export const getAllTasks = async () => {
  const response = await fetch(TASK_URL);
  if (!response.ok) throw new Error("Error fetching tasks");
  return await response.json();
};

export const createTask = async (data) => {
  const response = await fetch(TASK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error creating task");
  return await response.json();
};

export const updateTask = async (id, data) => {
  const response = await fetch(`${TASK_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error updating task");
  return await response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${TASK_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("Error deleting task");
  return true;
};