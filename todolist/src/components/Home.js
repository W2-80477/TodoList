import React, { useState, useEffect } from 'react';
import Delete from './Delete';

function Home({ onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/');
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map(task => ({
            ...task,
            dueDate: new Date(task.dueDate).toLocaleDateString('en-GB')
          }));
          setTasks(formattedData);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id));
        setShowDeleteModal(false);

        const fetchTasks = async () => {
            try {
              const response = await fetch('http://localhost:4000/');
              if (response.ok) {
                const data = await response.json();
                const formattedData = data.map(task => ({
                  ...task,
                  dueDate: new Date(task.dueDate).toLocaleDateString('en-GB')
                }));
                setTasks(formattedData);
              } else {
                console.error('Failed to fetch tasks');
              }
            } catch (error) {
              console.error('Error fetching tasks:', error);
            }
          };
      
          fetchTasks();
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown((prevActiveDropdown) => (prevActiveDropdown === id ? null : id));
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (id) => {
    setDeleteTaskId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <div className="container mx-auto mt-10 p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-8 text-white text-center">Task List</h1>
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="px-4 py-4 text-left">Select</th>
              <th className="px-4 py-4 text-left">Assign To</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Due Date</th>
              <th className="px-4 py-4 text-left">Priority</th>
              <th className="px-4 py-4 text-left">Description</th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id} className="bg-white hover:bg-gray-100 transition-colors duration-300">
                <td className="px-4 py-4 text-center">
                  <input type="checkbox" className="form-checkbox text-indigo-500 rounded-md" />
                </td>
                <td className="px-4 py-4">{task.user}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      task.status === 'Completed'
                        ? 'bg-green-500'
                        : task.status === 'In Progress'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4">{task.dueDate}</td>
                <td className="px-4 py-4">{task.priority}</td>
                <td className="px-4 py-4">{task.comments}</td>
                <td className="px-4 py-4 text-center relative">
                  <button
                    className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 focus:outline-none"
                    onClick={() => toggleDropdown(task._id)}
                  >
                    Actions
                  </button>
                  {activeDropdown === task._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <ul className="text-gray-800">
                        <li>
                          <button
                            onClick={() => onEdit(task)}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDeleteClick(task._id)}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 focus:outline-none"
              >
                Previous
              </button>
            )}
          </div>
          <div>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 mx-1 rounded-lg ${
                  currentPage === number
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
          <div>
            {currentPage < pageNumbers.length && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 focus:outline-none"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <Delete
          onConfirm={() => handleDelete(deleteTaskId)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Home;
