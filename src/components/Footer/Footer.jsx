import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Municipal Corporation</h3>
          <p>
            Chhattisgarh Municipal Corporation is dedicated to providing efficient
            civic services and promoting sustainable urban development for the
            well-being of all citizens.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FiYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/notices">Public Notices</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Employee Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Important Links</h3>
          <ul className="footer-links">
            <li><a href="#">RTI</a></li>
            <li><a href="#">Tenders</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Downloads</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Information</h3>
          <ul className="contact-info">
            <li>
              <FiMapPin />
              <span>
                Municipal Corporation Building,<br />
                Civil Lines, Raipur,<br />
                Chhattisgarh - 492001
              </span>
            </li>
            <li>
              <FiPhone />
              <span>+91 771 2222 333</span>
            </li>
            <li>
              <FiMail />
              <span>contact@chhattisgarhmunicipal.gov.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Chhattisgarh Municipal Corporation. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>

      <div className="emergency-banner">
        <p>
          <strong>24/7 Emergency Helpline:</strong> 1800-123-4567
        </p>
      </div>
    </footer>
  );
};