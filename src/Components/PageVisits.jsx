import React from 'react';

const PageVisits = () => {
  // Sample data for page visits
  const pages = [
    { name: '/MindForge/', visitors: '4,569', uniqueUsers: '340', bounceRate: '46.53%', trend: 'up' },
    { name: '/MindForge/Course', visitors: '3,985', uniqueUsers: '319', bounceRate: '46.53%', trend: 'down' },
    { name: '/MindForge/About us', visitors: '3,513', uniqueUsers: '294', bounceRate: '36.49%', trend: 'down' },
    { name: '/MindForge/dashboard', visitors: '2,050', uniqueUsers: '147', bounceRate: '50.87%', trend: 'up' },
    { name: '/MindForge/blog', visitors: '1,795', uniqueUsers: '190', bounceRate: '46.53%', trend: 'down' },
  ];

  return (
    <div className="p-4 bg-primary rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Page visits</h2>
        <button className="px-4 py-1 text-sm text-black bg-white rounded-md  ">
          See all
        </button>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Table Header */}
          <thead>
            <tr className="text-xs text-white uppercase">
              <th className="py-2 px-4">Page name</th>
              <th className="py-2 px-4">Visitors</th>
              <th className="py-2 px-4">Unique users</th>
              <th className="py-2 px-4">Bounce rate</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {pages.map((page, index) => (
              <tr key={index} className="border-t border-white">
                <td className="py-3 px-4 text-sm text-white">{page.name}</td>
                <td className="py-3 px-4 text-sm text-white">{page.visitors}</td>
                <td className="py-3 px-4 text-sm text-white">{page.uniqueUsers}</td>
                <td className="py-3 px-4 text-sm text-white flex items-center space-x-1">
                  <span>{page.bounceRate}</span>
                  {page.trend === 'up' ? (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageVisits;