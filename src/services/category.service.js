import { API_BASE_URL } from "./index";

const CATEGORY_URL = `${API_BASE_URL}categories`;

export const getAllTasks = async () => {
  const response = await fetch(CATEGORY_URL);
  if (!response.ok) throw new Error("Error fetching categories");
  return await response.json();
};