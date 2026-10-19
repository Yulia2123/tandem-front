'use client';

import RegistrationForm from '@/components/auth/RegisterPage/RegistrationForm/RegistrationForm';
import MainAuthNav from './MainAuthNav/MainAuthNav';

function RegisterPage() {
  const handleClose = () => {};
  return (
    <>
      <MainAuthNav />
      <RegistrationForm onClose={handleClose} />
    </>
  );
}

export default RegisterPage;
