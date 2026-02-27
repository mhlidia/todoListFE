import { useEffect, useState } from "react";
import * as categoryService from "../services/category.service";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await categoryService.getAllCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    await categoryService.createCategory({ name });
    setName("");
    loadCategories();
  };

  return (
    <div>
      <h2>Categorías</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la categoría"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Crear</button>
      </form>

      <table className="table table-bordered w-100">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;