import { FaGoogle, FaSlack, FaCalendarAlt, FaEnvelope, FaTasks } from 'react-icons/fa';

export default function ConnectApps() {
  const apps = [
    { name: 'Google Drive', icon: <FaGoogle /> },
    { name: 'Slack', icon: <FaSlack /> },
    { name: 'Gmail', icon: <FaEnvelope /> },
    { name: 'ClickUp', icon: <FaTasks /> },
    { name: 'Calendar', icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white text-black">Connect Your Tools</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {apps.map((app, i) => (
          <button
            key={i}
            className="flex items-center gap-2 px-4 py-2 border rounded shadow dark:text-white text-black dark:hover:text-black hover:bg-blue-50"
          >
            <span className="text-blue-600 text-xl">{app.icon}</span>
            {app.name}
          </button>
        ))}
      </div>
    </div>
  );
}
