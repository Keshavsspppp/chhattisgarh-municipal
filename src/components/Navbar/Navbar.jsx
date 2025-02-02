import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiChevronDown, FiSearch, FiLogOut, FiMessageSquare } from 'react-icons/fi';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and profile dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    onLogout();
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="logo">
            <img 
              src="/logo.png" 
              alt="CG Muni" 
              className="logo-img"
            />
            <div className="logo-text">
              <h1>Chhattisgarh</h1>
              <span>Municipal Corporation</span>
            </div>
          </Link>

          <div className={`nav-elements ${isOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link 
                    to="/chat"
                    className={location.pathname === '/chat' ? 'active' : ''}
                  >
                    Chat
                  </Link>
                </li>
              )}
            </ul>

            <div className="nav-right">
              {user ? (
                <div className="profile-section" ref={profileRef}>
                  <button 
                    className="profile-button"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="profile-avatar">
                      <FiUser />
                    </div>
                    <span>{user.fullName}</span>
                    <FiChevronDown className={`chevron ${isProfileOpen ? 'open' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="profile-dropdown">
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiUser />
                        <span>My Profile</span>
                      </Link>
                      <Link 
                        to="/chat" 
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiMessageSquare />
                        <span>Chat</span>
                      </Link>
                      <button 
                        onClick={handleLogout} 
                        className="dropdown-item logout-item"
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="login-button">Login</Link>
                  <Link to="/register" className="register-button">Register</Link>
                </div>
              )}
            </div>
          </div>

          <button 
            className="mobile-menu" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;