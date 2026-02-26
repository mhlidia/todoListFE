import { useEffect, useState } from "react";
import * as tagService from "../services/tag.service";

function Tags() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [viewTag, setViewTag] = useState(null);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const data = await tagService.getAllTags();
    setTags(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    if (editingId) {
      await tagService.updateTag(editingId, { name, color });
      setEditingId(null);
    } else {
      await tagService.createTag({ name, color });
    }

    setName("");
    setColor("#000000");
    loadTags();
  };

  const handleEdit = (tag) => {
    setName(tag.name);
    setColor(tag.color || "#000000");
    setEditingId(tag.id);
  };

  const handleView = async (id) => {
    const data = await tagService.getOneTag(id);
    setViewTag(data);
  };

  const handleDelete = async () => {
    await tagService.deleteTag(deleteId);
    setDeleteId(null);
    loadTags();
  };

  return (
    <div>
      <h2>Etiquetas</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la etiqueta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="color"
              className="form-control form-control-color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary">
              {editingId ? "Actualizar" : "Crear"}
            </button>
          </div>
        </div>
      </form>

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.id}</td>
              <td>{tag.name}</td>
              <td>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: tag.color || "#000",
                    borderRadius: "4px"
                  }}
                ></span>
              </td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleView(tag.id)}
                >
                  Ver
                </button>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(tag)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setDeleteId(tag.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewTag && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Detalle de Etiqueta</h5>
                <button
                  className="btn-close"
                  onClick={() => setViewTag(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {viewTag.id}</p>
                <p><strong>Nombre:</strong> {viewTag.name}</p>
                <p>
                  <strong>Color:</strong>{" "}
                  <span
                    style={{
                      display: "inline-block",
                      width: "30px",
                      height: "20px",
                      backgroundColor: viewTag.color
                    }}
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Confirmar eliminación</h5>
                <button
                  className="btn-close"
                  onClick={() => setDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                ¿Deseas eliminar esta etiqueta?
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

export default Tags;