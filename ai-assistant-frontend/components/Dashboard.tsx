import { FiSearch, FiUpload, FiClock, FiMessageSquare, FiCalendar, FiMail } from 'react-icons/fi';
import ConnectApps from './ConnectApps';
import UploadArea from './UploadArea';
import ActivityTimeline from './ActivityTimeline';

const Dashboard = () => {
  const connectedApps = [
    { name: 'Slack', icon: <FiMessageSquare className="text-purple-600" />, connected: true },
    { name: 'Gmail', icon: <FiMail className="text-red-500" />, connected: true },
    { name: 'Google Calendar', icon: <FiCalendar className="text-blue-500" />, connected: false },
    { name: 'ClickUp', icon: <FiClock className="text-green-500" />, connected: false },
  ];

  const recentActivity = [
    { id: 1, type: 'meeting', title: 'Team Sync', date: '2025-07-20', participants: 5 },
    { id: 2, type: 'document', title: 'Q3 Roadmap.pdf', date: '2025-07-19', size: '2.4 MB' },
    { id: 3, type: 'message', title: 'Project Update Discussion', date: '2025-07-18', source: 'Slack' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Team Workspace</h1>
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
        <h2 className="text-lg font-medium text-gray-900 mb-4">Connected Apps</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {connectedApps.map((app) => (
            <div key={app.name} className={`p-4 border rounded-lg ${app.connected ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">{app.icon}</span>
                <div>
                  <p className="font-medium">{app.name}</p>
                  <p className="text-sm text-gray-500">{app.connected ? 'Connected' : 'Not Connected'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Upload */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Upload</h2>
        <UploadArea />
      </div>

      {/* Activity Timeline */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
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
