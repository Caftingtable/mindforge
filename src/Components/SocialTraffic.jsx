import React from 'react';

const SocialTraffic = () => {
   
  const trafficData = [
    { referral: 'Facebook', visitors: '1,480', percentage: 60, color: 'bg-red-500' },
    { referral: 'Facebook', visitors: '5,480', percentage: 70, color: 'bg-teal-500' },
    { referral: 'Google', visitors: '4,807', percentage: 80, color: 'bg-purple-500' },
    { referral: 'Instagram', visitors: '3,678', percentage: 75, color: 'bg-blue-500' },
    { referral: 'Twitter', visitors: '2,645', percentage: 30, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-4 bg-primary rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Social traffic</h2>
        <button className="px-4 py-1 text-sm text-black bg-white rounded-md">
          See all
        </button>
      </div>

    
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead>
            <tr className="text-xs text-white uppercase">
              <th className="py-2 px-4">Referral</th>
              <th className="py-2 px-4">Visitors</th>
              <th className="py-2 px-4">%</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {trafficData.map((data, index) => (
              <tr key={index} className="border-t border-white">
                <td className="py-3 px-4 text-sm text-white">{data.referral}</td>
                <td className="py-3 px-4 text-sm text-white">{data.visitors}</td>
                <td className="py-3 px-4 text-sm text-white flex items-center space-x-2">
                  <span>{data.percentage}%</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${data.color}`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SocialTraffic;