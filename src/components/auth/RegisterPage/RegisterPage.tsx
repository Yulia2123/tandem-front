'use client';

import RegistrationForm from '@/components/auth/RegisterPage/RegisterForm/RegisterForm';
import MainAuthNav from '@/components/auth/MainAuthNav/MainAuthNav';

function RegisterPage() {
  return (
    <>
      <MainAuthNav />
      <RegistrationForm />
    </>
  );
}

export default RegisterPage;
