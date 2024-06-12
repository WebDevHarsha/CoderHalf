import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  const find = () => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/search/users?q=location:${encodeURIComponent(location)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl text-center font-bold mb-4">Find coders near you😉</h1>
        <textarea
          className="w-full p-2 border-2 border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={find}
        >
          Find
        </button>
        {loading && <div className="mt-4 text-center">Loading...</div>}
        {error && <div className="mt-4 text-center text-red-500">Error: {error}</div>}
        {data && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Coders in {location}</h2>
            <ul className="space-y-4">
              {data.items.map((user) => (
                <li key={user.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full"/>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user.login}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
