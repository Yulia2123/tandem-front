'use client';

import * as Yup from 'yup';
import css from '@/components/auth/RegisterPage/RegisterForm/RegisterForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { registerUser, RegisterData } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/lib/api/api';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader/Loader';

const INITIAL_VALUES: RegisterData = {
  name: '',
  email: '',
  password: '',
};

const CreateUserFormSchema = Yup.object({
  name: Yup.string()
    .max(32, "Ім'я та прізвище не повинні перевищувати 32 символи")
    .required("Ім'я та прізвище обов'язкові"),
  email: Yup.string()
    .max(64, 'Пошта не повинна перевищувати 64 символи')
    .email('Пошта введена не корректно, приклад: example@mail.com')
    .required("Пошта обов'язкова"),
  password: Yup.string()
    .min(8, 'Пароль повинен бути більше ніж 8 символів')
    .max(128, 'Пароль не повинен перевищувати 128 символів')
    .required("Пароль обов'язковий"),
});

function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: RegisterData) => {
    try {
      const user = await registerUser(values);

      if (user) {
        setUser(user);
        toast.success(`Ви успішно зареєструвались!`);
        router.push('/');
        router.refresh();
        return;
      }

      toast.error(`Помилка реєстрації: перевірте правильність заповнених полів`);
    } catch (error) {
      const apiError = error as ApiError;
      const status = apiError?.response?.status;

      if (status === 400) {
        toast.error(
          `Помилка реєстрації: перевірте правильність заповнених полів`,
        );
      } else if (status === 401) {
        toast.error(`Помилка реєстрації: неправильна пошта або пароль`);
      } else if (status === 409) {
        toast.error(`Помилка реєстрації: така пошта вже існує`);
      } else {
        toast.error(`Помилка сервера: спробуйте зареєструватись пізніше`);
      }
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
        {({ errors, touched, isSubmitting }) => (
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

            <div className={css.actions}>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? <Loader size="small" /> : 'Зареєструватись'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
