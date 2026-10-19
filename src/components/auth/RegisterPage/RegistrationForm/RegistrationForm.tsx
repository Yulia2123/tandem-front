'use client';

import * as Yup from 'yup';
import css from '@/components/auth/RegisterPage/RegistrationForm/RegistrationForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface UserFormProps {
  onClose: () => void;
}

// const INITIAL_VALUES:  = {
//   name: '',
//   email: '',
//   password: '',
// };

// const CreateUserFormSchema = Yup.object({

// });

function RegistrationForm({ onClose }: UserFormProps) {
  const fieldId = useId();

  const handleSubmit = () => {};
  return (
    <div className={css.container}>
      <div className={css.title}>
        <h2 className={css.subtitle}>Реєстрація</h2>
        <p className={css.text}>Раді вас бачити у спільноті мандрівників!</p>
      </div>

      <Formik initialValues={{}} validationSchema={{}} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-name`}>Ім&lsquo;я та прізвище*</label>
            <Field
              id={`${fieldId}-name`}
              type="text"
              name="name"
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
              className={css.input}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-password`}>Пароль*</label>
            <Field
              id={`${fieldId}-password`}
              type="password"
              name="password"
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
