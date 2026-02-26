import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Task Manager
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/categories">
              Categorías
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tags">
              Etiquetas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;