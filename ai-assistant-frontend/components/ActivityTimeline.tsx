export default function ActivityTimeline() {
    return (
      <div className="max-w-3xl mx-auto mt-10 px-4 mb-20">
        <h3 className="text-xl font-bold mb-3">Recent Activity</h3>
        <ul className="space-y-2">
          <li className="bg-white dark:bg-gray-700 shadow p-3 rounded dark:text-white text-black">💬 Meeting notes from 'Team Sync' synced from Calendar</li>
          <li className="bg-white dark:bg-gray-700 shadow p-3 rounded dark:text-white text-black">📧 Email from Bob saved to memory</li>
          <li className="bg-white dark:bg-gray-700 shadow p-3 rounded dark:text-white text-black">📄 Alice uploaded 'Q3-Budget.pdf'</li>
        </ul>
      </div>
    );
  }
  