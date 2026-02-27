import { useEffect, useState } from "react";
import * as taskService from "../services/task.service";
import * as categoryService from "../services/category.service";
import * as tagService from "../services/tag.service";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const taskData = await taskService.getAllTasks();
    const categoryData = await categoryService.getAllCategories();
    const tagData = await tagService.getAllTags();

    setTasks(taskData);
    setCategories(categoryData);
    setTags(tagData);
  };

  const handleTagChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => Number(option.value));
    setSelectedTags(values);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      category_id: Number(categoryId),
      tags: selectedTags
    };

    if (editingTaskId) {
      await taskService.updateTask(editingTaskId, data);
    } else {
      await taskService.createTask(data);
    }

    resetForm();
    loadData();
  };

  const resetForm = () => {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    setCategoryId("");
    setSelectedTags([]);
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
    setCategoryId(task.category_id);

    const tagIds = task.tags.map(tag => tag.id);
    setSelectedTags(tagIds);
  };

  const toggleStatus = async (task) => {
    await taskService.updateTask(task.id, {
      title: task.title,
      description: task.description,
      category_id: task.category_id,
      status: !task.status,
      tags: task.tags.map(tag => tag.id)
    });

    loadData();
  };

  return (
    <div>
      <h2>Tareas</h2>

      <form onSubmit={handleSubmit} className="mb-4">

        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <select
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <select
            multiple
            className="form-select"
            value={selectedTags}
            onChange={handleTagChange}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">
          {editingTaskId ? "Actualizar tarea" : "Crear tarea"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
            <tr>
                <th>Estado</th>
                <th>ID</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Etiquetas</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    {task.status ? (
                      <span className="badge bg-success">Completada</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Pendiente</span>
                    )}
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => toggleStatus(task)}
                    >
                      {task.status ? "Desmarcar" : "Completar"}
                    </button>
                  </td>
                <td>{task.id}</td>
                <td style={{ textDecoration: task.status ? "line-through" : "none" }}>{task.title}</td>
                <td>{task.category?.name}</td>

                <td>
                    {task.tags && task.tags.length > 0
                    ? task.tags.map(tag => (
                        <span
                          key={tag.id}
                          style={{
                            backgroundColor: tag.color,
                            color: "#000",
                            padding: "5px 10px",
                            borderRadius: "50px",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            display: "inline-block",
                            marginRight: "5px"
                          }}
                        >
                          {tag.name}
                        </span>
                        ))
                    : "Sin etiquetas"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => setSelectedTask(task)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(task)}
                  >
                    Editar
                  </button>
                  
                </td>
                

                </tr>
            ))}
        </tbody>
      </table>

      {selectedTask && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">{selectedTask.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedTask(null)}
                ></button>
              </div>

              <div className="modal-body">

                <p><strong>Descripción:</strong></p>
                <p>{selectedTask.description || "Sin descripción"}</p>

                <p><strong>Categoría:</strong></p>
                <span className="badge bg-primary">
                  {selectedTask.category?.name}
                </span>

                <p className="mt-3"><strong>Etiquetas:</strong></p>
                {selectedTask.tags.map(tag => (
                  <span
                    key={tag.id}
                    className="badge me-2"
                    style={{
                      backgroundColor: tag.color,
                      color: "#fff"
                    }}
                  >
                    {tag.name}
                  </span>
                ))}

                <p className="mt-3"><strong>Estado:</strong></p>
                {selectedTask.status ? (
                  <span className="badge bg-success">Completada</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pendiente</span>
                )}

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;