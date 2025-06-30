import React, { useState } from 'react';
import Input from '../common/Form/Input';
import Button from '../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      await register(email, password, confirmPassword);
      setServerMessage({ type: 'success', text: 'Registration successful! Redirecting to dashboard...' });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerMessage({ type: 'error', text: err.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

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
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="********"
        error={errors.confirmPassword}
      />

      <Button
        type="submit"
        className="w-full mt-6"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </Button>

      <div className="text-center text-sm mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;