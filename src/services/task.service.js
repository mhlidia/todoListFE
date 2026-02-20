const API_URL = "http://127.0.0.1:8000/api/tasks";

export const taskService = {

    getAll: async () => {
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error fetching tasks");
            }

            return await response.json();

        } catch (error) {
            console.error("Error in getAll:", error);
            throw error;
        }
    },

    create: async (data) => {
        // implementación pendiente
    },

    update: async (id, data) => {
        // implementación pendiente
    },

    delete: async (id) => {
        // implementación pendiente
    }

};