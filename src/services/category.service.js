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

export const createCategory = async (data) => {
    try {
        const response = await fetch(CATEGORY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error creating category");
        }

        return await response.json();

    } catch (error) {
        console.error("Error in createCategory:", error);
        throw error;
    }
};
