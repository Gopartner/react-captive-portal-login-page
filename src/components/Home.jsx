import React from "react";

const Home = ({ activeHotspots }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Active Hotspots</h1>
      {activeHotspots.length > 0 ? (
        <ul>
          {activeHotspots.map((hotspot) => (
            <li key={hotspot.id} className="bg-white p-4 rounded-lg shadow-md mb-2">
              <h2 className="text-lg font-semibold">{hotspot.name}</h2>
              <p>Proxy URL: {hotspot.proxy_url}</p>
              <p>Proxy Port: {hotspot.proxy_port}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active hotspots</p>
      )}
    </div>
  );
};

export default Home;

