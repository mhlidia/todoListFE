import { API_BASE_URL } from "./index";

const CATEGORY_URL = `${API_BASE_URL}categories`;

export const getAllCategories = async () => {
    try {
        const response = await fetch(CATEGORY_URL);

        if (!response.ok) {
            throw new Error("Error fetching categories");
        }

        return await response.json();

    } catch (error) {
        console.error("Error in getAllCategories:", error);
        throw error;
    }
};