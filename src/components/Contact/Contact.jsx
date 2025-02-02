import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare } from 'react-icons/fi';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    status: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus({
      status: 'success',
      message: 'Thank you for your message. We will get back to you soon!'
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: 'Phone',
      details: [
        '+91 771 2222 333',
        'Toll Free: 1800 123 4567'
      ]
    },
    {
      icon: <FiMail />,
      title: 'Email',
      details: [
        'contact@chhattisgarhmunicipal.gov.in',
        'support@chhattisgarhmunicipal.gov.in'
      ]
    },
    {
      icon: <FiMapPin />,
      title: 'Address',
      details: [
        'Municipal Corporation Building,',
        'Civil Lines, Raipur,',
        'Chhattisgarh - 492001'
      ]
    },
    {
      icon: <FiClock />,
      title: 'Working Hours',
      details: [
        'Monday - Saturday',
        '10:00 AM - 5:00 PM'
      ]
    }
  ];

  const departments = [
    'General Enquiry',
    'Water Supply',
    'Tax Department',
    'Sanitation',
    'Building Permission',
    'Technical Support'
  ];

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you might have</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="departments-section">
            <h3>Our Departments</h3>
            <div className="departments-grid">
              {departments.map((dept, index) => (
                <div key={index} className="department-card">
                  <FiMessageSquare />
                  <span>{dept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-container">
            <h2>Send us a Message</h2>
            {submitStatus.status && (
              <div className={`alert alert-${submitStatus.status}`}>
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59498.95033987771!2d81.6027546!3d21.2351542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee1204ff9e240!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1656000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};