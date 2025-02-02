import React from 'react';
import { FiTool, FiClipboard, FiUsers } from 'react-icons/fi';
import './Projects.css';

export const Projects = () => {
  const projects = [
    {
      id: 1,
      icon: <FiTool />,
      title: "Ongoing Projects",
      items: [
        {
          name: "Smart City Development",
          status: "Phase 2 Implementation"
        },
        {
          name: "Water Management",
          status: "Infrastructure Upgrade"
        }
      ]
    },
    {
      id: 2,
      icon: <FiClipboard />,
      title: "Upcoming Projects",
      items: [
        {
          name: "Solar Energy Initiative",
          status: "Starting Q3 2024"
        },
        {
          name: "Road Network Expansion",
          status: "Planning Phase"
        }
      ]
    },
    {
      id: 3,
      icon: <FiUsers />,
      title: "Inter-departmental Projects",
      items: [
        {
          name: "Urban Planning Initiative",
          status: "Multi-department Coordination"
        },
        {
          name: "Green City Program",
          status: "Joint Development Project"
        }
      ]
    }
  ];

  return (
    <div className="projects-section">
      <div className="projects-container">
        <h2>Current Projects</h2>
        <div className="project-categories">
          {projects.map(category => (
            <div key={category.id} className="project-category">
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <div className="project-list">
                {category.items.map((project, index) => (
                  <div key={index} className="project-item">
                    <h4>{project.name}</h4>
                    <p>{project.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};