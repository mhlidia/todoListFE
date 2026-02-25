/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from "react";
import { getAllTasks } from "./services/task.service";

function App() {

  useEffect(() => {

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      console.log("Tasks from API:", data);
    } catch (error) {
      console.error("Error fetching tasks:",error);
    }
  };

  fetchTasks();

}, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;*/

import { useEffect, useState } from "react";
import { getAllCategories } from "./services/category.service";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Category List</h2>

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
