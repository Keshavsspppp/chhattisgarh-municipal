import React from 'react';
import { FiAward, FiTrendingUp, FiCheck, FiStar } from 'react-icons/fi';
import './Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      icon: <FiStar />,
      title: 'Smart City Award 2023',
      description: 'Recognized for excellence in smart city implementation',
      metric: '1st Rank'
    },
    {
      id: 2,
      icon: <FiTrendingUp />,
      title: 'Digital Transformation',
      description: 'Successfully digitized 95% of municipal services',
      metric: '95%'
    },
    {
      id: 3,
      icon: <FiCheck />,
      title: 'Project Completion Rate',
      description: 'Completed projects within scheduled timeline',
      metric: '92%'
    },
    {
      id: 4,
      icon: <FiAward />,
      title: 'Citizen Satisfaction',
      description: 'Overall citizen satisfaction with municipal services',
      metric: '4.5/5'
    }
  ];

  return (
    <div className="achievements-section">
      <div className="achievements-container">
        <div className="achievements-header">
          <h2>
            <FiAward className="achievements-icon" />
            Our Achievements
          </h2>
        </div>
        
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">
                {achievement.icon}
              </div>
              <div className="achievement-metric">{achievement.metric}</div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;