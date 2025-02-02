import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiPaperclip, FiImage } from 'react-icons/fi';
import './ChatPage.css';

export const ChatPage = ({ user }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Protect route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load initial messages
  useEffect(() => {
    // Simulated initial messages
    const initialMessages = [
      {
        id: 1,
        sender: 'Municipal Worker',
        text: 'Hello! How can I assist you today?',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        senderType: 'worker'
      },
      {
        id: 2,
        sender: user?.fullName || 'User',
        text: 'Hi, I need information about waste collection schedule.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        senderType: 'user'
      }
    ];
    setMessages(initialMessages);
  }, [user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() || selectedFile) {
      const newMsg = {
        id: Date.now(),
        sender: user?.fullName || 'User',
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
        senderType: user?.role || 'user',
        file: selectedFile
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should not exceed 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Municipal Support Chat</h2>
          <div className="user-info">
            <span className="user-status">●</span>
            <span>{user?.fullName || 'Guest'}</span>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.senderType === (user?.role || 'user') ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                <div className="message-header">
                  <span className="sender">{message.sender}</span>
                  <span className="timestamp">{formatTime(message.timestamp)}</span>
                </div>
                <p>{message.text}</p>
                {message.file && (
                  <div className="file-attachment">
                    <FiPaperclip />
                    <span>{message.file.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="message-input-form">
          <div className="input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            
            <div className="input-actions">
              <label className="file-input-label" title="Attach file">
                <FiPaperclip />
                <input
                  type="file"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
              
              <button 
                type="submit" 
                className="send-button" 
                disabled={!newMessage.trim() && !selectedFile}
              >
                <FiSend />
              </button>
            </div>
          </div>
          
          {selectedFile && (
            <div className="selected-file-info">
              <FiPaperclip />
              <span>{selectedFile.name}</span>
              <button 
                type="button" 
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="remove-file"
              >
                ×
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatPage;