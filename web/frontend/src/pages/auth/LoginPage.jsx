import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-10 bg-gray-100">
      {/* min-h-[calc(100vh-64px)] assumes a header height of 64px for full page content */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;