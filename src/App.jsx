import { useEffect, useState } from "react";
import { getAllCategories, createCategory } from "./services/category.service";

function App() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      await createCategory({ name });
      setName("");
      setError("");
      fetchCategories(); // refrescar lista
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow mb-4">
        <div className="card-body">
          <h2 className="mb-3">Create Category</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <small className="text-danger">{error}</small>}
            </div>

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>

        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">
          <h2 className="mb-3">Category List</h2>

          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}

export default App;
