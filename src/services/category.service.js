import { API_BASE_URL } from "./index";

const CATEGORY_URL = `${API_BASE_URL}categories`;

export const getAllCategories = async () => {
  const response = await fetch(CATEGORY_URL);
  if (!response.ok) throw new Error("Error fetching categories");
  return await response.json();
};

export const createCategory = async (data) => {
    const response = await fetch(CATEGORY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error creating categories");
  return await response.json();
};

export const updateCategory = async (id, data) => {
    try {
        const response = await fetch(`${CATEGORY_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error updating category");
        }

        return await response.json();

    } catch (error) {
        console.error("Error in updateCategory:", error);
        throw error;
    }
};
