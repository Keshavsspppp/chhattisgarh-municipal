import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import WelcomePage from '../Welcome/WelcomePage'; // Import the WelcomePage

export const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'worker') {
        navigate('/worker');
      } else {
        navigate('/');  // Redirect to home for regular users
      }
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWorkerLogin = async () => {
    try {
      const response = await fetch('/workers.json');
      const data = await response.json();
      
      const worker = data.workers.find(
        w => w.email === formData.email && w.password === formData.password
      );

      if (worker) {
        // Store worker info in localStorage or state management
        localStorage.setItem('workerInfo', JSON.stringify({
          id: worker.id,
          name: worker.name,
          role: worker.role,
          department: worker.department,
          email: worker.email
        }));
        
        setLoginError('');
        navigate('/worker-dashboard');
      } else {
        setLoginError('Invalid worker credentials');
      }
    } catch (error) {
      console.error('Error during worker login:', error);
      setLoginError('Something went wrong. Please try again.');
    }
  };

  const handleUserLogin = () => {
    // Here you would typically make an API call
    // For now, just store some dummy user data
    localStorage.setItem('userInfo', JSON.stringify({
      fullName: formData.email.split('@')[0],
      email: formData.email,
      id: 'U001'
    }));
    navigate('/user-dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Simulate API call
        const userInfo = {
          id: Date.now().toString(),
          fullName: formData.email.split('@')[0], // For demo purposes
          email: formData.email,
          role: loginType // 'user' or 'worker'
        };

        // Call onLoginSuccess prop
        onLoginSuccess(userInfo);
        
        // Navigate to home page
        navigate('/');
      } catch (error) {
        setLoginError('Login failed. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-subtitle">Welcome back! Please login to your account.</p>
        
        <div className="login-type-toggle">
          <button
            className={`type-button ${loginType === 'user' ? 'active' : ''}`}
            onClick={() => setLoginType('user')}
          >
            User Login
          </button>
          <button
            className={`type-button ${loginType === 'worker' ? 'active' : ''}`}
            onClick={() => setLoginType('worker')}
          >
            Worker Login
          </button>
        </div>
        
        {loginError && <div className="error-message">{loginError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Login as {loginType === 'user' ? 'User' : 'Worker'}
          </button>
        </form>

        {loginType === 'user' && (
          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        )}
      </div>
    </div>
  );
}; 