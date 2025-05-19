import React from 'react';

 


const ProgressTrack = () => {
 
  const projects = [
    { name: 'Frontend Development', progress: 60, color: 'bg-orange-500',  },
    { name: 'React js', progress: 100, color: 'bg-green-500', },
    { name: 'Black Development', progress: 70, color: 'bg-red-500',  },
    { name: 'Ai/ML', progress: 90, color: 'bg-blue-500',  },
  ];

  return (
    <div className="p-4 bg-custom-primary rounded-lg shadow-md">
      {/* Header */}
      <h2 className="text-lg font-semibold text-black mb-4"> Topic Progress Track</h2>

      {/* Progress List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="flex items-center space-x-3">
            
            <div className="flex-1 my-2">
              <p className="text-sm font-medium text-black">{project.name}</p>
              <div className="w-full bg-custom-half-primary rounded-full h-2 mt-1">
                <div
                  className={`h-2 rounded-full bg-primary`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTrack;