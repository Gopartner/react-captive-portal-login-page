import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHotspot = ({ onUpdateHotspot }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [hotspot, setHotspot] = useState({
    name: "",
    proxy_url: "",
    proxy_port: "",
    active: false
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/hotspot/${id}`)
      .then((response) => {
        setHotspot(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotspot data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotspot(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/hotspot/${id}`, hotspot)
      .then(() => {
        onUpdateHotspot(hotspot);
        navigate("/hotspots");
      })
      .catch((error) => {
        console.error("Error updating hotspot:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Hotspot</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={hotspot.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Proxy URL</label>
          <input
            type="text"
            name="proxy_url"
            value={hotspot.proxy_url}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Proxy Port</label>
          <input
            type="text"
            name="proxy_port"
            value={hotspot.proxy_port}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Active</label>
          <input
            type="checkbox"
            name="active"
            checked={hotspot.active}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditHotspot;

