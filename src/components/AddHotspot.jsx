import React, { useState } from "react";
import axios from "axios";

const AddHotspot = ({ onAddHotspot }) => {
  const [name, setName] = useState("");
  const [proxyUrl, setProxyUrl] = useState("");
  const [proxyPort, setProxyPort] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHotspot = {
      name,
      proxy_url: proxyUrl,
      proxy_port: proxyPort,
      active: false
    };

    axios.post("http://localhost:3000/hotspot", newHotspot)
      .then((response) => {
        onAddHotspot(response.data);
        setName("");
        setProxyUrl("");
        setProxyPort("");
      })
      .catch((error) => {
        console.error("Error adding hotspot:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Hotspot</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Proxy URL</label>
          <input
            type="text"
            value={proxyUrl}
            onChange={(e) => setProxyUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Proxy Port</label>
          <input
            type="text"
            value={proxyPort}
            onChange={(e) => setProxyPort(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Add Hotspot
        </button>
      </form>
    </div>
  );
};

export default AddHotspot;

