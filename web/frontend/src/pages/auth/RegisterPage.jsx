import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-10 bg-gray-100">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;