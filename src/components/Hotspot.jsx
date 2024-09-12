import React from 'react';

const Hotspot = () => {
  return (
    <div className="p-4 bg-green-700 text-white h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">TetherFi</h1>
        <div className="flex justify-center gap-4 mt-4">
          <button className="text-white">Hotspot</button>
          <button className="text-white">How To</button>
          <button className="text-white">Connections</button>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
        <div className="flex justify-between">
          <p>Broadcast Status</p>
          <p className="text-green-600">Running</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Proxy Status</p>
          <p className="text-green-600">Running</p>
        </div>
        <div className="flex justify-center my-4">
          <p className="text-xl font-bold bg-green-100 p-2 rounded-md text-green-800">Running</p>
        </div>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Confused on what to do next? View the <a href="#" className="text-green-500">Setup Instructions</a><br />
            Experiencing <a href="#" className="text-green-500">Slow Hotspot Performance?</a>
          </p>
        </div>
        <div className="mt-4">
          <div className="mb-2">
            <p className="font-bold">HOTSPOT NAME</p>
            <p className="text-lg">DIRECT-TF-TetherFi</p>
          </div>
          <div className="mb-2">
            <p className="font-bold">HOTSPOT PASSWORD</p>
            <p>•••••••</p>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <p className="font-bold">PROXY URL/HOSTNAME</p>
              <p>192.168.49.1</p>
            </div>
            <div>
              <p className="font-bold">PROXY PORT</p>
              <p>8228</p>
            </div>
          </div>
          <div className="flex justify-around">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Refresh Hotspot</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">View QR Code</button>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-bold">Broadcast Frequency</h2>
            <div className="flex justify-around mt-2">
              <button className="bg-green-200 text-green-700 px-4 py-2 rounded-lg">2.4GHz</button>
              <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg">5GHz</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspot;

