'use client';

import RegistrationForm from '@/components/auth/RegisterPage/RegistrationForm/RegistrationForm';
import MainAuthNav from './MainAuthNav/MainAuthNav';

function RegisterPage() {
  return (
    <>
      <MainAuthNav />
      <RegistrationForm />
    </>
  );
}

export default RegisterPage;
