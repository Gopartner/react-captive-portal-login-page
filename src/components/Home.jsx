import React, { useState } from "react";
import QRCode from "react-qr-code";

const Home = ({ activeHotspots }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleViewQRCode = (hotspot) => {
    setSelectedHotspot(hotspot);
    setShowQRCode(true);
  };

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
              <button
                onClick={() => handleViewQRCode(hotspot)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-2"
              >
                View QR Code
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active hotspots</p>
      )}

      {showQRCode && selectedHotspot && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Scan QR Code</h2>
          <QRCode value={`http://captive-portal.example.com?url=${encodeURIComponent(`http://${selectedHotspot.proxy_url}:${selectedHotspot.proxy_port}`)}`} />
          <button
            onClick={() => setShowQRCode(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-md mt-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

