import React, { useState } from 'react';

const ToDoList = () => {
  
  const [tasks, setTasks] = useState([
    { title: 'Call with Dave', time: '10:30 AM',   checked: false },
    { title: 'Lunch meeting', time: '12:00 PM',   checked: false },
    { title: 'Web seminar ', time: '10:30 AM',   checked: false },
    { title: 'Winter-Hackathon', time: '10:30 AM',   checked: false },
  ]);

   
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4 bg-custom-primary rounded-lg shadow-md">
      {/* Header */}
      <h2 className="text-lg font-semibold text-black mb-4">Meeting 
      </h2>

       
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Task  */}
            <div className="flex items-center space-x-3 my-2">
              <div className={`w-1 h-10 bg-white rounded`}></div>
              
              <div>
                <p className= { task.checked ? 'line-through text-sm font-medium text-black' : 'text-sm font-medium text-black'} >{task.title}</p>
                <p className={task.checked ?'text-xs text-black line-through':'text-xs text-black'}  >{task.time}</p>
              </div>
            </div>

            {/* Checkbox */}
            <div
              onClick={() => toggleTask(index)}
              className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center ${
                task.checked ? 'bg-primary border-primary' : 'border-gray-300'
              }`}
            >
              {task.checked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;