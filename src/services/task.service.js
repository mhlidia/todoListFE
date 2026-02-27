import { API_BASE_URL } from "./index";

const TASK_URL = `${API_BASE_URL}tasks`;

export const getAllTasks = async () => {
    try {
        const response = await fetch(TASK_URL);

        if (!response.ok) {
            throw new Error("Error fetching tasks");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in getAllTasks:", error);
        throw error;
    }
};

