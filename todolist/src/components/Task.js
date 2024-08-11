import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Task() {
  const navigate = useNavigate();  

  const [user, setUser] = useState('');
  const [status, setStatus] = useState('not-started');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [comments, setComments] = useState('');
  const [error, setError] = useState(null);  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      user,
      status,
      dueDate,
      priority,
      comments
    };

    try {
      const response = await fetch('https://todo-list-backend-stfi.onrender.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      if (response.ok) {
        setUser('');
        setStatus('not-started');
        setDueDate('');
        setPriority('low');
        setComments('');
        setError(null);  
        navigate('/'); 
      } else {
        const errorData = await response.json();  
        setError(errorData.message || 'Failed to add task. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
    <div className='max-w-md mx-auto mt-10 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-xl'>
      <div className='text-center'>
        <h1 className='text-2xl font-extrabold mb-4 text-white'>Add New Task</h1>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-white font-semibold'>
            Assign To:
          </label>
          <input 
            type='text' 
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder='Assign to' 
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' 
          />
        </div>
        <div>
          <label className='block text-white font-semibold'>
            Status:
          </label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          >
            <option value='not-started'>Not Started</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div>
          <label className='block text-white font-semibold'>
            Due Date:
          </label>
          <input 
            type='date' 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500' 
          />
        </div>
        <div>
          <label className='block text-white font-semibold'>
            Priority:
          </label>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div>
          <label className='block text-white font-semibold'>
            comments:
          </label>
          <textarea 
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder='Task comments' 
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          ></textarea>
        </div>
        {error && (
          <div className='text-red-500 mt-4'>
            {error}
          </div>
        )}
        <div className='flex justify-end mt-6 space-x-3'>
          <button 
            type='button'
            className='px-3 py-2 bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700'
          >
            Cancel
          </button>
          <button 
            type='submit'
            className='px-3 py-2 bg-green-400 text-green-900 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700'
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Task;
