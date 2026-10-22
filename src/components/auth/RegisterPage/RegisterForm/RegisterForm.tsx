'use client';

import * as Yup from 'yup';
import css from '@/components/auth/RegisterPage/RegisterForm/RegisterForm.module.css';
import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { registerUser, RegisterData } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

const INITIAL_VALUES: RegisterData = {
  name: '',
  email: '',
  password: '',
};

const CreateUserFormSchema = Yup.object({
  name: Yup.string()
    .max(32, "Ім'я та прізвище занадто довгі!")
    .required("Ім'я та прізвище обов'язкові!"),
  email: Yup.string()
    .max(64, 'Пошта занадто довга!')
    .email('Такої пошти не існує!')
    .required("Пошта обов'язкова!"),
  password: Yup.string()
    .min(8, 'Пароль занадто малий!')
    .max(128, 'Пароль занадто довгий!')
    .required("Пароль обов'язковий!"),
});

function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values: RegisterData) => {
    try {
      const user = await registerUser(values);

      if (user) {
        setUser(user);
        router.push('/');
        router.refresh();
      } else {
        setServerError('Invalid email or password');
      }
    } catch (error) {
      setServerError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error',
      );
    }
  };

  return (
    <div className={css.container}>
      <div className={css.title}>
        <h2 className={css.subtitle}>Реєстрація</h2>
        <p className={css.text}>Раді вас бачити у спільноті мандрівників!</p>
      </div>

      <Formik<RegisterData>
        initialValues={INITIAL_VALUES}
        validationSchema={CreateUserFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-name`}>Ім&lsquo;я та прізвище*</label>
              <Field
                id={`${fieldId}-name`}
                type="text"
                name="name"
                placeholder="Ваше ім&lsquo;я та прізвище"
                className={`${css.input} ${
                  touched.name && errors.name ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-email`}>Пошта*</label>
              <Field
                id={`${fieldId}-email`}
                type="email"
                name="email"
                placeholder="hello@podorozhnyky.ua"
                className={`${css.input} ${
                  touched.email && errors.email ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-password`}>Пароль*</label>
              <Field
                id={`${fieldId}-password`}
                type="password"
                name="password"
                placeholder="********"
                className={`${css.input} ${
                  touched.password && errors.password ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>

            {serverError && (
              <div className={css.serverError}>{serverError}</div>
            )}

            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                Зареєструватись
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
