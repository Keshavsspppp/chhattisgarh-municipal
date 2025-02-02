import React, { useState } from 'react';
import { FiSearch, FiFileText, FiHome, FiDollarSign, FiTrash2, FiDroplet, FiTruck, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Services.css';

export const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const services = [
    {
      id: 1,
      title: 'Property Tax Payment',
      icon: <FiHome />,
      description: 'Pay your property tax online with easy installment options.',
      category: 'Tax',
      link: '/services/property-tax',
      status: 'Available'
    },
    {
      id: 2,
      title: 'Birth Certificate',
      icon: <FiFileText />,
      description: 'Apply for birth certificates and get them delivered to your doorstep.',
      category: 'Documentation',
      link: '/services/birth-certificate',
      status: 'Available'
    },
    {
      id: 3,
      title: 'Trade License',
      icon: <FiDollarSign />,
      description: 'Apply for new trade licenses or renew existing ones.',
      category: 'Business',
      link: '/services/trade-license',
      status: 'Maintenance'
    },
    {
      id: 4,
      title: 'Waste Management',
      icon: <FiTrash2 />,
      description: 'Schedule waste pickup and recycling services.',
      category: 'Sanitation',
      link: '/services/waste-management',
      status: 'Available'
    },
    {
      id: 5,
      title: 'Water Connection',
      icon: <FiDroplet />,
      description: 'Apply for new water connections or report issues.',
      category: 'Utilities',
      link: '/services/water-connection',
      status: 'Available'
    },
    {
      id: 6,
      title: 'Building Permission',
      icon: <FiTruck />,
      description: 'Apply for building permits and construction approvals.',
      category: 'Construction',
      link: '/services/building-permission',
      status: 'Available'
    }
  ];

  const categories = [...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = (
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Access municipal services easily and efficiently</p>
      </div>

      <div className="services-search">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="categories-list">
        <button
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className={`service-icon ${service.status.toLowerCase()}`}>
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-footer">
              <span className="service-category">{service.category}</span>
              <span className={`service-status ${service.status.toLowerCase()}`}>
                <FiAlertCircle /> {service.status}
              </span>
            </div>
            <Link to={service.link} className="service-link">
              Learn More →
            </Link>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div className="no-results">
            <h3>No services found</h3>
            <p>Try adjusting your search term or category</p>
          </div>
        )}
      </div>

      <div className="services-help">
        <h2>Need Help?</h2>
        <p>Our support team is here to assist you with any queries</p>
        <div className="help-buttons">
          <Link to="/contact" className="help-btn primary">Contact Support</Link>
          <Link to="/faq" className="help-btn secondary">View FAQs</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;