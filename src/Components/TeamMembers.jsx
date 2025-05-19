import React from 'react';

const TeamMembers = () => {

  const members = [
    { name: 'Ved Chand', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { name: 'Karan Subedi', status: 'in a meeting', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Roshes Manandhar', status: 'offline', avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { name: 'Dr. Sardar Farhad', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/14.jpg' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'in a meeting':
        return 'bg-orange-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1f2937] rounded-lg shadow-md transition-all">
      <h2 className="text-xl font-semibold text-black dark:text-white mb-4">MindForge Team</h2>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                    member.status
                  )} rounded-full border-[2px] border-white dark:border-gray-800`}
                ></span>
              </div>
              <div>
                <p className="text-sm font-semibold text-black dark:text-white">{member.name}</p>
                <p className="text-xs capitalize text-gray-600 dark:text-gray-400">{member.status}</p>
              </div>
            </div>

            <button className="px-4 py-1 text-sm text-white bg-primary rounded-lg hover:opacity-90 transition">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
