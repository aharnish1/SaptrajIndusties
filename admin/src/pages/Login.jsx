import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing lockout on mount
  useEffect(() => {
    const lockoutData = localStorage.getItem('adminLockout');
    if (lockoutData) {
      const { until, attempts } = JSON.parse(lockoutData);
      if (until > Date.now()) {
        setIsLocked(true);
        setLockoutTime(until);
        setFailedAttempts(attempts);
        setRemainingTime(Math.ceil((until - Date.now()) / 1000));
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isLocked && lockoutTime > Date.now()) {
      const interval = setInterval(() => {
        const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutTime(0);
          setRemainingTime(0);
          setFailedAttempts(0);
          localStorage.removeItem('adminLockout');
          clearInterval(interval);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockoutTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Login form submitted');
    console.log('Username:', formData.username);
    console.log('Password:', formData.password);
    
    if (isLocked) return;
    
    setIsLoading(true);
    setError('');

    // Demo authentication logic
    if (formData.username === 'admin' && formData.password === 'admin123') {
      console.log('Credentials are valid - attempting login');
      // Successful login
      try {
        await login({ username: 'admin' });
        console.log('Login successful - navigating to dashboard');
        localStorage.removeItem('adminLockout');
        setFailedAttempts(0);
        navigate('/dashboard');
      } catch (err) {
        console.error('Login error:', err);
        setError('Login failed. Please try again.');
      }
    } else {
      console.log('Invalid credentials');
      // Failed login
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        // Lock for 5 minutes
        const lockoutUntil = Date.now() + (5 * 60 * 1000);
        localStorage.setItem('adminLockout', JSON.stringify({
          until: lockoutUntil,
          attempts: newAttempts
        }));
        setIsLocked(true);
        setLockoutTime(lockoutUntil);
        setRemainingTime(5 * 60); // 5 minutes in seconds
        setError('Too many failed attempts. Try again later.');
      } else {
        setError(`Invalid credentials. ${5 - newAttempts} attempts remaining.`);
      }
    }
    
    setIsLoading(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A] border border-gunmetal-gray rounded-lg p-8"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-industrial-yellow rounded-lg flex items-center justify-center">
              <LogIn size={32} className="text-deep-black" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Admin Login
          </h1>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6 flex items-center gap-3"
            >
              <AlertCircle size={20} className="text-red-400" />
              <span className="text-red-400">{error}</span>
            </motion.div>
          )}

          {/* Lockout Message */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mb-6 text-center"
            >
              <div className="text-yellow-400 mb-2">
                Account locked due to too many failed attempts.
              </div>
              <div className="text-yellow-300 font-mono text-lg">
                Try again in {formatTime(remainingTime)}
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLocked || isLoading}
                className="w-full px-4 py-3 bg-deep-black border border-gunmetal-gray rounded-lg text-white focus:outline-none focus:border-industrial-yellow transition-colors"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLocked || isLoading}
                  className="w-full px-4 py-3 bg-deep-black border border-gunmetal-gray rounded-lg text-white focus:outline-none focus:border-industrial-yellow transition-colors pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked || isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLocked || isLoading || !formData.username || !formData.password}
              className="w-full py-3 bg-industrial-yellow text-deep-black font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {!isLocked && (
            <div className="mt-6 pt-6 border-t border-gunmetal-gray">
              <div className="text-center text-gray-400 text-sm">
                <div className="mb-2">Demo Credentials:</div>
                <div className="font-mono">
                  Username: <span className="text-industrial-yellow">admin</span>
                </div>
                <div className="font-mono">
                  Password: <span className="text-industrial-yellow">admin123</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
