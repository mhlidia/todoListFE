import { useEffect, useState } from "react";
import * as categoryService from "../services/category.service";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

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

    if (editingId) {
      await categoryService.updateCategory(editingId, { name });
      setEditingId(null);
    } else {
      await categoryService.createCategory({ name });
    }

    setName("");
    loadCategories();
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    await categoryService.deleteCategory(deleteId);
    setDeleteId(null);
    loadCategories();
  };

  const handleView = async (id) => {
    const data = await categoryService.getOneCategory(id);
    setViewCategory(data);
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
        <button className="btn btn-primary">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <table className="table table-bordered w-100">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleView(cat.id)}
                >
                  Ver
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(cat)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => setDeleteId(cat.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {viewCategory && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalle de Categoría</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewCategory(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {viewCategory.id}</p>
                <p><strong>Nombre:</strong> {viewCategory.name}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setViewCategory(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás segura que deseas eliminar esta categoría?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteId(null)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;