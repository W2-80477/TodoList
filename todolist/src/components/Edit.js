import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Edit({ task }) {
  const navigate = useNavigate();
  
  const convertDateToISO = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toISOString().split('T')[0];
  };
  

  const [formData, setFormData] = useState({
    user: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        user: task.user || '',
        status: task.status || '',
        dueDate: task.dueDate ? convertDateToISO(task.dueDate) : '',
        priority: task.priority || '',
        comments: task.comments || '',
      });
    }
  }, [task]);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Task updated successfully:', formData);
        navigate('/'); 
      } else {
        const errorData = await response.json();
        console.error('Failed to update task:', errorData);
        
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
    <div className='max-w-md mx-auto mt-10 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-xl'>
      <div className='text-center'>
        <h1 className='text-2xl font-extrabold mb-4 text-white'>Edit Task</h1>
        {console.log(formData)}
      </div>
      <div className='space-y-4'>
        <div>
          <label className='block text-white font-semibold'>Assign To:</label>
          <input
            type='text'
            name='user'
            value={formData.user}
            onChange={handleChange}
            placeholder='Assign to'
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          />
        </div>
        <div>
          <label className='block text-white font-semibold'>Status:</label>
          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          >
            <option value='not-started'>Not Started</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div>
          <label className='block text-white font-semibold'>Due Date:</label>
          {console.log(formData.dueDate)}
          <input
            type='date'
            name='dueDate'
            value={formData.dueDate}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          />
        </div>
        <div>
          <label className='block text-white font-semibold'>Priority:</label>
          <select
            name='priority'
            value={formData.priority}
            onChange={handleChange}
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>
        <div>
          <label className='block text-white font-semibold'>Description:</label>
          <textarea
            name='comments'
            value={formData.comments}
            onChange={handleChange}
            placeholder='Task description'
            className='w-full mt-1 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
          ></textarea>
        </div>
      </div>
      <div className='flex justify-end mt-6 space-x-3'>
        <button
          className='px-3 py-2 bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700'
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className='px-3 py-2 bg-green-400 text-green-900 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-700'
        >
          Save
        </button>
      </div>
    </div>
    </div>
  );
}

export default Edit;
