import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await authService.login({ email, password });

      localStorage.setItem("token", data.token);

      setUserName(data.user.name);
      setShowModal(true);

      setTimeout(() => {
        navigate("/tasks");
      }, 2000);

    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Iniciar Sesión</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-center">

                <div className="modal-body p-4">
                  <h4 className="text-success">🎉 ¡Bienvenid@ {userName}!</h4>
                  <p className="mt-3">
                    Inicio de sesión exitoso.
                  </p>
                  <div className="spinner-border text-success mt-2"></div>
                </div>

              </div>
            </div>
          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
}