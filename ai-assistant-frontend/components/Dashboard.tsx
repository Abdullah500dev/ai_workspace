
"use client";
import { FiSearch, FiUpload, FiClock, FiMessageSquare, FiCalendar, FiMail, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import ConnectApps from './ConnectApps';
import UploadArea from './UploadArea';
import ActivityTimeline from './ActivityTimeline';
import GmailConnect from './GmailConnect';

const Dashboard = () => {
  const [showGmailConnect, setShowGmailConnect] = useState(false);
  const [connectedApps, setConnectedApps] = useState([
    { name: 'Slack', icon: <FiMessageSquare className="text-purple-600" />, connected: true },
    { 
      name: 'Gmail', 
      icon: <FiMail className="text-red-500" />, 
      connected: true,
      onConnect: () => setShowGmailConnect(true)
    },
    { name: 'Google Calendar', icon: <FiCalendar className="text-blue-500" />, connected: false },
    { name: 'ClickUp', icon: <FiClock className="text-green-500" />, connected: false },
  ]);

  const recentActivity = [
    { id: 1, type: 'meeting', title: 'Team Sync', date: '2025-07-20', participants: 5 },
    { id: 2, type: 'document', title: 'Q3 Roadmap.pdf', date: '2025-07-19', size: '2.4 MB' },
    { id: 3, type: 'message', title: 'Project Update Discussion', date: '2025-07-18', source: 'Slack' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Team Workspace</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FiUpload className="inline mr-2" />
            Upload
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Connect Apps
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search across all your team's knowledge..."
        />
      </div>

      {/* Connected Apps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Connected Apps</h2>
          <button 
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            onClick={() => setShowGmailConnect(true)}
          >
            <FiPlus className="h-4 w-4 mr-1" />
            Add Account
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {connectedApps.map((app, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={app.onConnect}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {app.icon}
                  </div>
                  <span className="font-medium text-black">{app.name}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${app.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {app.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              {!app.connected && (
                <button 
                  className="mt-3 w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    app.onConnect?.();
                  }}
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gmail Connect Modal */}
      {showGmailConnect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <GmailConnect onClose={() => setShowGmailConnect(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Quick Upload */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-white mb-4">Quick Upload</h2>
        <UploadArea />
      </div>

      {/* Activity Timeline */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
        <ActivityTimeline />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Recent Meetings</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Synced Messages</h3>
          <p className="text-3xl font-bold">1,245</p>
          <p className="text-sm text-gray-500">From connected apps</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">AI Highlights</h3>
          <p className="text-3xl font-bold">8</p>
          <p className="text-sm text-gray-500">Key insights generated</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
