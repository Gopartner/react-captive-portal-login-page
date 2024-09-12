import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import HotspotList from "./components/HotspotList";
import AddHotspot from "./components/AddHotspot";
import EditHotspot from "./components/EditHotspot";
import axios from "axios";

const App = () => {
  const [activeHotspots, setActiveHotspots] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/hotspot")
      .then((response) => {
        const activeHotspots = response.data.filter(hotspot => hotspot.active);
        setActiveHotspots(activeHotspots);
      })
      .catch((error) => {
        console.error("Error fetching active hotspots:", error);
      });
  }, []);

  const handleAddHotspot = (newHotspot) => {
    setActiveHotspots(prev => [...prev, newHotspot]);
  };

  const handleUpdateHotspot = (updatedHotspot) => {
    setActiveHotspots(prev => {
      const index = prev.findIndex(hotspot => hotspot.id === updatedHotspot.id);
      if (index !== -1) {
        const updatedActiveHotspots = [...prev];
        updatedActiveHotspots[index] = updatedHotspot;
        return updatedActiveHotspots;
      }
      return prev;
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-indigo-600 text-white">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/hotspots" className="hover:underline">Hotspot List</Link>
            </li>
            <li>
              <Link to="/add-hotspot" className="hover:underline">Add Hotspot</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home activeHotspots={activeHotspots} />} />
          <Route path="/hotspots" element={<HotspotList setActiveHotspots={setActiveHotspots} />} />
          <Route path="/add-hotspot" element={<AddHotspot onAddHotspot={handleAddHotspot} />} />
          <Route path="/edit-hotspot/:id" element={<EditHotspot onUpdateHotspot={handleUpdateHotspot} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

