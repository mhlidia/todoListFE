import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from "react";
import { taskService } from "./services/task.service";

function App() {

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const data = await taskService.getAll();
        console.log("Tasks from API:", data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
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

export default App;
