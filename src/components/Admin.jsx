import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    name: '',
    password: '',
    proxy_url: '',
    proxy_port: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // State untuk notifikasi sukses
  const [errorMessage, setErrorMessage] = useState('');     // State untuk notifikasi error

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data'); // URL json-server
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/data/${id}`);
      setSuccessMessage('Data deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      setErrorMessage('Error deleting data');
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/data', newData);
      setNewData({ name: '', password: '', proxy_url: '', proxy_port: '' });
      setSuccessMessage('Data added successfully!');
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
      setErrorMessage('Error adding data');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/data/${id}`, newData);
      setNewData({ name: '', password: '', proxy_url: '', proxy_port: '' });
      setSuccessMessage('Data updated successfully!');
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
      setErrorMessage('Error updating data');
    }
  };

  // Menghapus pesan setelah beberapa detik
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 3000); // Menghilangkan pesan setelah 3 detik
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Data</h1>

      {/* Notifikasi sukses atau error */}
      {successMessage && (
        <div className="bg-green-200 text-green-700 p-2 mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-200 text-red-700 p-2 mb-4">
          {errorMessage}
        </div>
      )}

      {/* Form untuk menambah data */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newData.name}
          onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Password"
          value={newData.password}
          onChange={(e) => setNewData({ ...newData, password: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Proxy URL"
          value={newData.proxy_url}
          onChange={(e) => setNewData({ ...newData, proxy_url: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Proxy Port"
          value={newData.proxy_port}
          onChange={(e) => setNewData({ ...newData, proxy_port: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white p-2">
          Add Data
        </button>
      </div>

      {/* Tabel Data */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Proxy URL</th>
            <th className="px-4 py-2">Proxy Port</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.password}</td>
              <td className="border px-4 py-2">{item.proxy_url}</td>
              <td className="border px-4 py-2">{item.proxy_port}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

