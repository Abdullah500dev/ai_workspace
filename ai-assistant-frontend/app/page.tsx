
'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import ConnectApps from '../components/ConnectApps';
import UploadArea from '../components/UploadArea';
import SemanticSearch from '../components/SemanticSearch';
import AIChat from '../components/AIChat';
import ActivityTimeline from '../components/ActivityTimeline';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <AIChat />;
      case 'search':
        return <SemanticSearch />;
      case 'upload':
        return <UploadArea />;
      default:
        return <AIChat />;
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Navigation */}
      {/* <nav className="bg-white dark:bg-dark-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['chat', 'search', 'upload'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-black transition-colors ${
                    activeTab === tab
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-dark-700'
                      : 'text-black-700 dark:text-black-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 !bg-red">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-red">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ConnectApps />
            <ActivityTimeline />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            <Hero />
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
