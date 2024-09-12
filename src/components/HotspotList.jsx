import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotspotList = ({ setActiveHotspots }) => {
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/hotspot")
      .then((response) => {
        setHotspots(response.data);
        const activeHotspots = response.data.filter(hotspot => hotspot.active);
        setActiveHotspots(activeHotspots);
      })
      .catch((error) => {
        console.error("Error fetching hotspots:", error);
      });
  }, [setActiveHotspots]);

  const handleCheckboxChange = (id, checked) => {
    const updatedHotspots = hotspots.map(hotspot =>
      hotspot.id === id ? { ...hotspot, active: checked } : hotspot
    );
    setHotspots(updatedHotspots);

    axios.put(`http://localhost:3000/hotspot/${id}`, {
      ...updatedHotspots.find(hotspot => hotspot.id === id),
    })
    .then(() => {
      const activeHotspots = updatedHotspots.filter(hotspot => hotspot.active);
      setActiveHotspots(activeHotspots);
    })
    .catch((error) => {
      console.error("Error updating hotspot:", error);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/hotspot/${id}`)
      .then(() => {
        const updatedHotspots = hotspots.filter(hotspot => hotspot.id !== id);
        setHotspots(updatedHotspots);
        const activeHotspots = updatedHotspots.filter(hotspot => hotspot.active);
        setActiveHotspots(activeHotspots);
      })
      .catch((error) => {
      console.error("Error deleting hotspot:", error);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hotspot List</h1>
      <Link to="/add-hotspot" className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 inline-block">Add Hotspot</Link>
      <div className="grid grid-cols-1 gap-4">
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{hotspot.name}</h2>
              <p>Proxy URL: {hotspot.proxy_url}</p>
              <p>Proxy Port: {hotspot.proxy_port}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hotspot.active || false}
                onChange={(e) => handleCheckboxChange(hotspot.id, e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <Link
                to={`/edit-hotspot/${hotspot.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(hotspot.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotspotList;

