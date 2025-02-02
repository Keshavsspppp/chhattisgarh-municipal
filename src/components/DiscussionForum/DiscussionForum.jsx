import React, { useState } from 'react';
import { FiMessageSquare, FiUsers, FiGlobe, FiSend, FiPlusCircle } from 'react-icons/fi';
import './DiscussionForum.css';

export const DiscussionForum = () => {
  const [activeTab, setActiveTab] = useState('intra');
  const [newPost, setNewPost] = useState('');
  
  const forumData = {
    intra: [
      {
        id: 1,
        department: 'Water Department',
        author: 'John Doe',
        title: 'Pipeline Maintenance Schedule',
        content: 'Discussion about upcoming maintenance schedule for sector 7.',
        comments: 5,
        date: '2024-03-20'
      },
      {
        id: 2,
        department: 'Water Department',
        author: 'Jane Smith',
        title: 'Equipment Request',
        content: 'Need additional equipment for emergency repairs.',
        comments: 3,
        date: '2024-03-19'
      }
    ],
    inter: [
      {
        id: 1,
        departments: ['Road', 'Water'],
        author: 'Mike Johnson',
        title: 'Road Repair Coordination',
        content: 'Coordination needed for road repair work affecting water lines.',
        comments: 8,
        date: '2024-03-20'
      },
      {
        id: 2,
        departments: ['Electricity', 'Construction'],
        author: 'Sarah Wilson',
        title: 'New Construction Site Planning',
        content: 'Discussion about electrical requirements for new construction.',
        comments: 6,
        date: '2024-03-19'
      }
    ],
    public: [
      {
        id: 1,
        category: 'General',
        author: 'Citizen Name',
        title: 'Water Supply Issue in Sector 5',
        content: 'Facing irregular water supply in Sector 5 area.',
        comments: 12,
        date: '2024-03-20',
        status: 'Under Review'
      },
      {
        id: 2,
        category: 'Suggestion',
        author: 'Community Member',
        title: 'Street Light Installation Request',
        content: 'Request for additional street lights in Park Avenue.',
        comments: 7,
        date: '2024-03-19',
        status: 'In Progress'
      }
    ]
  };

  return (
    <div className="forum-section">
      <div className="forum-container">
        <h2>Discussion Forum</h2>
        
        <div className="forum-tabs">
          <button 
            className={`tab ${activeTab === 'intra' ? 'active' : ''}`}
            onClick={() => setActiveTab('intra')}
          >
            <FiMessageSquare /> Intra Department
          </button>
          <button 
            className={`tab ${activeTab === 'inter' ? 'active' : ''}`}
            onClick={() => setActiveTab('inter')}
          >
            <FiUsers /> Inter Department
          </button>
          <button 
            className={`tab ${activeTab === 'public' ? 'active' : ''}`}
            onClick={() => setActiveTab('public')}
          >
            <FiGlobe /> Public Forum
          </button>
        </div>

        <div className="new-post-section">
          <button className="new-post-button">
            <FiPlusCircle /> Create New Discussion
          </button>
        </div>

        <div className="forum-content">
          {forumData[activeTab].map(post => (
            <div key={post.id} className="forum-post">
              <div className="post-header">
                <h3>{post.title}</h3>
                {activeTab === 'inter' && (
                  <div className="departments-tags">
                    {post.departments?.map(dept => (
                      <span key={dept} className="department-tag">{dept}</span>
                    ))}
                  </div>
                )}
                {activeTab === 'public' && (
                  <span className={`status-badge ${post.status.toLowerCase().replace(' ', '-')}`}>
                    {post.status}
                  </span>
                )}
              </div>
              
              <p className="post-content">{post.content}</p>
              
              <div className="post-footer">
                <span className="author">By {post.author}</span>
                <span className="date">{post.date}</span>
                <span className="comments">
                  <FiMessageSquare /> {post.comments} Comments
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};