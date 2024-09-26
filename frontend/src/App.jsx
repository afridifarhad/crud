import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [updateUser, setUpdateUser] = useState({ id: '', name: '' });

  async function fetchUsers() {
    const response = await axios.get(API_URL);
    const content = response.data;
    setUsers(content.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = () => {
    axios
      .post(API_URL, { name: newUser })
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser('');
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  const updateUserById = (id) => {
    axios
      .put(`${API_URL}/${id}`, { name: updateUser.name })
      .then((response) => {
        setUsers(users.map((user) => (user.id === id ? response.data : user)));
        setUpdateUser({ id: '', name: '' });
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  const deleteUserById = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">CRUD Operations with Express & React</h1>

        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Enter new user"
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addUser}
            className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600"
          >
            Add User
          </button>
        </div>

        {/* Update User */}
        {updateUser.id && (
          <div className="mb-6 flex items-center">
            <input
              type="text"
              value={updateUser.name}
              onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
              placeholder="Update user name"
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={() => updateUserById(updateUser.id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600"
            >
              Update User
            </button>
          </div>
        )}

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <span className="text-lg text-gray-800">{user.name}</span>
              <div className="space-x-4">
                <button
                  onClick={() => setUpdateUser({ id: user.id, name: user.name })}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUserById(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
