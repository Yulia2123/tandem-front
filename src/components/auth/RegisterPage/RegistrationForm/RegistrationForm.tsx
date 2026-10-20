'use client';

import * as Yup from 'yup';
import css from '@/components/auth/RegisterPage/RegistrationForm/RegistrationForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, RegisterData } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/api';

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
  const [error, setError] = useState('');

  const handleSubmit = async (values: RegisterData,) => {
    try {
      const res = await registerUser(values);

      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
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

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={CreateUserFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-name`}>Ім&lsquo;я та прізвище*</label>
            <Field
              id={`${fieldId}-name`}
              type="text"
              name="name"
              placeholder="Ваше ім&lsquo;я та прізвище"
              className={css.input}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-email`}>Пошта*</label>
            <Field
              id={`${fieldId}-email`}
              type="email"
              name="email"
              placeholder="hello@podorozhnyky.ua"
              className={`${css.input} ${
              error ? css.inputError : ''
            }`}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-password`}>Пароль*</label>
            <Field
              id={`${fieldId}-password`}
              type="password"
              name="password"
              placeholder="********"
              className={css.input}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton} disabled={false}>
              Зареєструватись
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationForm;
