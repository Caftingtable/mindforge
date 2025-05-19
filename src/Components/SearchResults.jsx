import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results, onClose, isVisible }) => {
  if (!isVisible || !results.length) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-[60vh] overflow-y-auto z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Search Results</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={result.id}
              to={result.link}
              className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <div className="flex items-start space-x-3">
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-600">{result.description}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{result.type}</span>
                    {result.date && (
                      <span className="text-xs text-gray-500">
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 