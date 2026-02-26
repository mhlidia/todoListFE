import { useEffect, useState } from "react";
import { getAllCategories, createCategory } from "./services/category.service";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import Tasks from "./pages/Tasks";

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
    <Router>
      <Navbar />
      
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
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

    </Router>
  );
}

export default App;
