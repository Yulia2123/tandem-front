'use client';

import * as Yup from 'yup';
import css from '@/components/auth/LoginPage/LoginForm/LoginForm.module.css';
import toast from 'react-hot-toast';
import { useId, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { loginUser, LoginData } from '@/lib/api/auth';
import { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

const INITIAL_VALUES: LoginData = {
  email: '',
  password: '',
};

const LoginUserFormSchema = Yup.object({
  email: Yup.string()
    .max(64, 'Пошта не повинна перевищувати 64 символи')
    .email('Пошта введена не корректно, приклад: example@mail.com')
    .required("Пошта обов'язкова"),
  password: Yup.string()
    .min(8, 'Пароль повинен бути більше ніж 8 символів')
    .max(128, 'Пароль не повинен перевищувати 128 символів')
    .required("Пароль обов'язковий"),
});

function LoginForm() {
  const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: LoginData) => {
    try {
      const user = await loginUser(values);

      if (user) {
        setUser(user);
        toast.success(`Ви успішно увійшли!`)
        router.push('/');
        router.refresh();
      } else {
        toast.error('Помилка логіну: неправильно введені дані користувача');
      }
    } catch (error) {
      toast.error('Помилка сервера: спробуйте залогінитись пізніше');
    }
  };

  return (
    <div className={css.container}>
      <div className={css.title}>
        <h2 className={css.subtitle}>Вхід</h2>
        <p className={css.text}>Вітаємо знову у спільноту мандрівників!</p>
      </div>

      <Formik<LoginData>
        initialValues={INITIAL_VALUES}
        validationSchema={LoginUserFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
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

            <div className={css.actions}>
              <button type="submit" className={css.submitButton}>
                Увійти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
