'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${input}". This is a simulated response.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FiMessageSquare className="mr-2 text-blue-600" />
        AI Assistant Chat
      </h2>
      
      <div className="border rounded-lg h-96 overflow-y-auto p-4 mb-4 bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`flex max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.isUser 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex-shrink-0 mr-2">
                {message.isUser ? (
                  <FiUser className="h-5 w-5" />
                ) : (
                  <FiMessageSquare className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <FiSend className="mr-1" /> Send
        </button>
      </form>
    </div>
  );
}