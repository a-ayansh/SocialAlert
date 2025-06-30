import React, { useState } from 'react';
import Input from '../common/Form/Input';
import Button from '../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage({ type: '', text: '' });
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      setServerMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      // Redirect to dashboard or previous page
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerMessage({ type: 'error', text: err.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

      {serverMessage.text && (
        <div
          className={`p-3 mb-4 rounded-md text-sm ${
            serverMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {serverMessage.text}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@example.com"
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        error={errors.password}
      />

      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isLoading}
      >
        {isLoading ? 'Logging In...' : 'Login'}
      </Button>

      <div className="text-center text-sm mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </div>
      <div className="text-center text-sm mt-2">
        <Link to="/forgot-password" className="text-indigo-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;