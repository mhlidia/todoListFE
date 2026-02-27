const API_URL = "http://localhost:8000";

const login = async (data) => {

  //Pedir cookie CSRF
  await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: "include"
  });

  //Enviar credenciales
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return await response.json();
};

const logout = async () => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/api/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    credentials: "include"
  });

  localStorage.removeItem("token");
};

export default { login, logout };