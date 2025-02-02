// src/components/ChitChat/ChitChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiPaperclip, FiImage } from 'react-icons/fi';
import './ChitChatPage.css';

const departments = [
    { id: 'water', name: 'Water Department' },
    { id: 'road', name: 'Road Department' },
    { id: 'sanitation', name: 'Sanitation Department' },
    { id: 'electricity', name: 'Electricity Department' }
];

export const ChitChatPage = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(departments[0].id);
    const [activeTab, setActiveTab] = useState('intra'); // 'intra', 'inter', 'public'

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            const newMessage = {
                id: Date.now(),
                department: selectedDepartment,
                content: currentMessage,
                timestamp: new Date().toLocaleTimeString(),
                type: activeTab // Store the type of message (intra, inter, public)
            };
            setMessages([...messages, newMessage]);
            setCurrentMessage('');
        }
    };

    const filteredMessages = messages.filter(message => message.type === activeTab || activeTab === 'public');

    return (
        <div className="chit-chat-page">
            <h2>Chit-Chat Page</h2>
            <div className="tab-selector">
                <button onClick={() => setActiveTab('intra')}>Intra Department</button>
                <button onClick={() => setActiveTab('inter')}>Inter Department</button>
                <button onClick={() => setActiveTab('public')}>Public Forum</button>
            </div>
            {activeTab === 'inter' && (
                <div className="department-selector">
                    <label>Select Department:</label>
                    <select 
                        value={selectedDepartment} 
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className="messages-container">
                {filteredMessages.map(message => (
                    <div key={message.id} className={`message ${message.department}`}>
                        <span className="timestamp">{message.timestamp}</span>
                        <span className="content">{message.content}</span>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={currentMessage} 
                    onChange={(e) => setCurrentMessage(e.target.value)} 
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};