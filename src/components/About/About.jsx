import React from 'react';
import { FiUsers, FiTarget, FiAward, FiTrendingUp } from 'react-icons/fi';
import './About.css';

export const About = () => {
  const milestones = [
    { year: '1956', description: 'Establishment of Municipal Corporation' },
    { year: '1980', description: 'Implementation of First Master Plan' },
    { year: '2000', description: 'Digital Transformation Initiative' },
    { year: '2020', description: 'Smart City Project Launch' }
  ];

  const stats = [
    { icon: <FiUsers />, number: '2M+', label: 'Citizens Served' },
    { icon: <FiTarget />, number: '95%', label: 'Service Efficiency' },
    { icon: <FiAward />, number: '50+', label: 'Awards Received' },
    { icon: <FiTrendingUp />, number: '500+', label: 'Projects Completed' }
  ];

  const leaders = [
    {
      name: 'Rajesh Kumar',
      position: 'Municipal Commissioner',
      image: '/images/leader1.jpg'
    },
    {
      name: 'Priya Singh',
      position: 'Deputy Commissioner',
      image: '/images/leader2.jpg'
    },
    {
      name: 'Amit Verma',
      position: 'Chief Engineer',
      image: '/images/leader3.jpg'
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Building a better future for our community</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="mission-vision">
            <div className="mission">
              <h2>Our Mission</h2>
              <p>To provide efficient municipal services and promote sustainable urban development through transparent governance and citizen participation.</p>
            </div>
            <div className="vision">
              <h2>Our Vision</h2>
              <p>To transform Chhattisgarh into a model of urban excellence with world-class infrastructure and quality of life for all citizens.</p>
            </div>
          </div>

          <div className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <FiUsers className="value-icon" />
                <h3>Citizen First</h3>
                <p>Prioritizing citizen needs and satisfaction in all our initiatives</p>
              </div>
              <div className="value-card">
                <FiTarget className="value-icon" />
                <h3>Excellence</h3>
                <p>Striving for excellence in service delivery and governance</p>
              </div>
              <div className="value-card">
                <FiAward className="value-icon" />
                <h3>Integrity</h3>
                <p>Maintaining highest standards of transparency and accountability</p>
              </div>
              <div className="value-card">
                <FiTrendingUp className="value-icon" />
                <h3>Innovation</h3>
                <p>Embracing new technologies and innovative solutions</p>
              </div>
            </div>
          </div>

          <div className="milestones-section">
            <h2>Our Journey</h2>
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-content">
                    <h3>{milestone.year}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="leadership-section">
        <div className="container">
          <h2>Our Leadership</h2>
          <div className="leaders-grid">
            {leaders.map((leader, index) => (
              <div key={index} className="leader-card">
                <div className="leader-image">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <h3>{leader.name}</h3>
                <p>{leader.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};