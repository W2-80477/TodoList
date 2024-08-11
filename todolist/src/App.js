import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Task from './components/Task';
import Home from './components/Home';
import Edit from './components/Edit';
import Delete from './components/Delete';

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (task) => {
    setSelectedTask(task);
    navigate(`/edit/${task._id}`);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onEdit={handleEdit} />} />
        <Route path="/task" element={<Task />} />
        <Route path="/edit/:id" element={<Edit task={selectedTask} />} />
        <Route path="/delete" element={<Delete/>}/>
      </Routes>
    </>
  );
}

export default App;
