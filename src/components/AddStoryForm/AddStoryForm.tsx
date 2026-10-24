
'use client';

import { useState, type ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCategories } from '@/lib/hooks/useCategories';
import styles from './AddStoryForm.module.css';

type Category = {
  _id: string;
  category: string;
};

type FormValues = {
  image: File | null;
  title: string;
  category: string;
  article: string;
};

const initialValues: FormValues = {
  image: null,
  title: '',
  category: '',
  article: '',
};

const validationSchema = Yup.object({
  image: Yup.mixed<File>()
    .required('Завантажте обкладинку історії')
    .test(
      'fileType',
      'Оберіть файл зображення',
      (file) => !file || file.type.startsWith('image/')
    )
    .test(
      'fileSize',
      'Розмір зображення не повинен перевищувати 1 МБ',
      (file) => !file || file.size <= 1024 * 1024
    ),

  title: Yup.string()
    .trim()
    .required('Введіть заголовок історії')
    .min(2, 'Заголовок має містити щонайменше 2 символи')
    .max(40, 'Заголовок не може перевищувати 40 символів'),

  category: Yup.string()
    .required('Оберіть категорію'),

  article: Yup.string()
    .trim()
    .required('Введіть текст історії')
    .min(12, 'Текст історії має містити щонайменше 12 символів')
    .max(3000, 'Текст історії не може перевищувати 3000 символів'),
});

export default function AddStoryForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(
    null
  );

  const { data: categories, isLoading: categoriesLoading } =
    useCategories();

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Підключення до Backend додамо пізніше.
      console.log('Форма пройшла перевірку:', {
        title: values.title,
        category: values.category,
        article: values.article,
        imageName: values.image?.name,
      });
    },
  });

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    formik.setFieldValue('image', file);
    formik.setFieldTouched('image', true, false);

    if (!file || !file.type.startsWith('image/')) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    formik.resetForm();
    setImagePreview(null);
  };

  const isSaveDisabled =
    !formik.isValid ||
    !formik.dirty ||
    !formik.values.image ||
    !formik.values.image.type.startsWith('image/') ||
    formik.isSubmitting;

  return (
    <form
      className={styles.form}
      onSubmit={formik.handleSubmit}
      noValidate
    >
      {/* Обкладинка статті */}
      <div className={styles.field}>
        <label htmlFor="story-image">
          Обкладинка статті
        </label>

        <div className={styles.imagePlaceholder}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Попередній перегляд обкладинки"
              className={styles.previewImage}
            />
          ) : (
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              <rect
                width="80"
                height="80"
                rx="10"
                fill="#BDBDBD"
              />
              <circle
                cx="29"
                cy="25"
                r="7"
                fill="#E0E0E0"
              />
              <path
                d="M13 61L30 42L41 51L53 35L68 61H13Z"
                fill="#E0E0E0"
              />
            </svg>
          )}
        </div>

        <label
          htmlFor="story-image"
          className={styles.uploadButton}
        >
          Завантажити фото
        </label>

        <input
          id="story-image"
          name="image"
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleImageChange}
        />

        {formik.touched.image && formik.errors.image && (
          <p className={styles.error} role="alert">
            {formik.errors.image}
          </p>
        )}
      </div>

      {/* Заголовок */}
      <div className={styles.field}>
        <label htmlFor="story-title">
          Заголовок
        </label>

        <input
          id="story-title"
          name="title"
          type="text"
          placeholder="Введіть заголовок історії"
          className={styles.input}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.title && formik.errors.title && (
          <p className={styles.error} role="alert">
            {formik.errors.title}
          </p>
        )}
      </div>

      {/* Категорія */}
      <div className={styles.field}>
        <label htmlFor="story-category">
          Категорія
        </label>

        <select
          id="story-category"
          name="category"
          className={styles.select}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={categoriesLoading}
        >
          <option value="" disabled>
            {categoriesLoading
              ? 'Завантаження категорій...'
              : 'Категорія'}
          </option>

          {Array.isArray(categories) &&
            (categories as Category[]).map((item) => (
              <option key={item._id} value={item._id}>
                {item.category}
              </option>
            ))}
        </select>

        {formik.touched.category && formik.errors.category && (
          <p className={styles.error} role="alert">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Текст історії */}
      <div className={styles.field}>
        <label htmlFor="story-article">
          Текст історії
        </label>

        <textarea
          id="story-article"
          name="article"
          placeholder="Ваша історія тут"
          className={styles.textarea}
          value={formik.values.article}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.article && formik.errors.article && (
          <p className={styles.error} role="alert">
            {formik.errors.article}
          </p>
        )}
      </div>

      {/* Кнопки */}
      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={isSaveDisabled}
        >
          Зберегти
        </button>

        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Відмінити
        </button>
      </div>
    </form>
  );
}
