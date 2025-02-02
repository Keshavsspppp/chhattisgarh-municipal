import React from 'react';
import { FiDatabase, FiCalendar, FiMap } from 'react-icons/fi';
import './Features.css';

export const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FiDatabase />,
      title: "Resource Exchange Platform",
      items: [
        "Technical expertise sharing",
        "Machinery and equipment allocation",
        "Technology transfer programs",
        "Project resource management"
      ]
    },
    {
      id: 2,
      icon: <FiCalendar />,
      title: "Inter-departmental Coordination",
      items: [
        "Task scheduling and tracking",
        "Work distribution management",
        "Progress reporting system",
        "Department collaboration tools"
      ]
    },
    {
      id: 3,
      icon: <FiMap />,
      title: "Project Site Management",
      items: [
        "Project site identification",
        "Unified project phasing",
        "Cost optimization tools",
        "Meeting coordination system"
      ]
    }
  ];

  return (
    <div className="features-section">
      <div className="features-container">
        <h2>Key Features</h2>
        <div className="feature-cards">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <ul>
                {feature.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};