'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { useCategories } from '@/lib/hooks/useCategories';
import api from '@/lib/api/api';

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

type CreateStoryResponse = {
  data?: {
    _id?: string;
  };
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const DB_NAME = 'tandem-story-drafts';
const STORE_NAME = 'drafts';
const DRAFT_KEY = 'new-story';

type StoryDraft = {
  title: string;
  category: string;
  article: string;
  image: File | null;
};

function openDraftDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveDraft(draft: StoryDraft): Promise<void> {
  const db = await openDraftDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');

    transaction.objectStore(STORE_NAME).put(draft, DRAFT_KEY);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      const error = transaction.error;
      db.close();
      reject(error);
    };

    transaction.onabort = () => {
      const error = transaction.error;
      db.close();
      reject(error);
    };
  });
}

async function getDraft(): Promise<StoryDraft | undefined> {
  const db = await openDraftDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).get(DRAFT_KEY);

    request.onsuccess = () => resolve(request.result as StoryDraft | undefined);
    request.onerror = () => reject(request.error);

    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function deleteDraft(): Promise<void> {
  const db = await openDraftDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');

    transaction.objectStore(STORE_NAME).delete(DRAFT_KEY);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      const error = transaction.error;
      db.close();
      reject(error);
    };

    transaction.onabort = () => {
      const error = transaction.error;
      db.close();
      reject(error);
    };
  });
}

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
      (file) => !file || file.type.startsWith('image/'),
    )
    .test(
      'fileSize',
      'Розмір зображення не повинен перевищувати 5 МБ',
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
    ),

  title: Yup.string()
    .trim()
    .required('Введіть заголовок історії')
    .min(2, 'Заголовок має містити щонайменше 2 символи')
    .max(40, 'Заголовок не може перевищувати 40 символів'),

  category: Yup.string().required('Оберіть категорію'),

  article: Yup.string()
    .trim()
    .required('Введіть текст історії')
    .min(12, 'Текст історії має містити щонайменше 12 символів')
    .max(3000, 'Текст історії не може перевищувати 3000 символів'),
});

export default function AddStoryForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draftLoaded = useRef(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    data,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const categories: Category[] = Array.isArray(data?.categories)
    ? data.categories
    : [];

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,

    onSubmit: async (values) => {
      if (!values.image) return;

      const formData = new FormData();

      formData.append('img', values.image);
      formData.append('title', values.title.trim());
      formData.append('category', values.category);
      formData.append('article', values.article.trim());
      formData.append('date', new Date().toISOString());

      try {
        const response = await api.post<CreateStoryResponse>(
          '/stories',
          formData,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //   },
          // },
        );

        const storyId = response.data?.data?._id;

        if (!storyId) {
          throw new Error('Backend не повернув ID створеної історії');
        }
        await deleteDraft();
        router.push(`/stories/${storyId}`);
      } catch {
        toast.error(
          'Не вдалося зберегти історію. Перевірте дані та спробуйте ще раз.',
        );
      }
    },
  });

  // Восстановление черновика после перезагрузки
  useEffect(() => {
    let cancelled = false;

    const restoreDraft = async () => {
      try {
        const draft = await getDraft();

        if (cancelled) return;

        if (draft) {
          await formik.setValues({
            title: draft.title ?? '',
            category: draft.category ?? '',
            article: draft.article ?? '',
            image: draft.image ?? null,
          });

          if (draft.image) {
            setImagePreview(URL.createObjectURL(draft.image));
          }
        }
      } catch {
        toast.error('Не вдалося відновити чернетку.');
      } finally {
        if (!cancelled) {
          draftLoaded.current = true;
        }
      }
    };

    void restoreDraft();

    return () => {
      cancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Автоматическое сохранение изменений
  useEffect(() => {
    if (!draftLoaded.current) return;

    void saveDraft({
      title: formik.values.title,
      category: formik.values.category,
      article: formik.values.article,
      image: formik.values.image,
    }).catch(() => {
      toast.error('Не вдалося зберегти чернетку.');
    });
  }, [
    formik.values.title,
    formik.values.category,
    formik.values.article,
    formik.values.image,
  ]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setImagePreview(null);

    if (!file) {
      void formik.setFieldValue('image', null);
      void formik.setFieldTouched('image', true, false);
      return;
    }

    const isValidType = file.type.startsWith('image/');
    const isValidSize = file.size <= MAX_IMAGE_SIZE;

    if (!isValidType || !isValidSize) {
      void formik.setFieldValue('image', null);
      void formik.setFieldTouched('image', true, false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.error(
        !isValidType
          ? 'Оберіть файл зображення'
          : 'Розмір зображення не повинен перевищувати 5 МБ',
      );

      return;
    }

    void formik.setFieldValue('image', file);
    void formik.setFieldTouched('image', true, false);

    setImagePreview(URL.createObjectURL(file));
  };

  const handleCancel = async () => {
    formik.resetForm();
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    try {
      await deleteDraft();
    } catch {
      toast.error('Не вдалося видалити чернетку.');
    }
  };

  const isSaveDisabled =
    !formik.dirty ||
    !formik.isValid ||
    !formik.values.image ||
    !formik.values.image.type.startsWith('image/') ||
    formik.isSubmitting ||
    categoriesLoading ||
    categories.length === 0;

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
      {/* Обкладинка історії */}
      <div className={styles.field}>
        <label htmlFor="story-image">Обкладинка статті</label>

        <div className={styles.imagePlaceholder}>
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Попередній перегляд обкладинки"
              width={800}
              height={480}
              unoptimized
              className={styles.previewImage}
            />
          ) : (
            <svg
              width="168"
              height="168"
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              <rect width="80" height="80" rx="10" fill="#BDBDBD" />
              <circle cx="29" cy="25" r="7" fill="#E0E0E0" />
              <path d="M13 61L30 42L41 51L53 35L68 61H13Z" fill="#E0E0E0" />
            </svg>
          )}
        </div>

        <label htmlFor="story-image" className={styles.uploadButton}>
          Завантажити фото
        </label>

        <input
          ref={fileInputRef}
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
        <label htmlFor="story-title">Заголовок</label>

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
        <label htmlFor="story-category">Категорія</label>

        <select
          id="story-category"
          name="category"
          className={styles.select}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={
            categoriesLoading || categories.length === 0 || formik.isSubmitting
          }
        >
          <option value="" disabled>
            {categoriesLoading
              ? 'Завантаження категорій...'
              : categories.length === 0
                ? 'Категорії недоступні'
                : 'Категорія'}
          </option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.category}
            </option>
          ))}
        </select>

        {categoriesError && (
          <p className={styles.error} role="alert">
            Не вдалося завантажити категорії.
          </p>
        )}

        {formik.touched.category && formik.errors.category && (
          <p className={styles.error} role="alert">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Текст історії */}
      <div className={styles.field}>
        <label htmlFor="story-article">Текст історії</label>

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
          aria-busy={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
        </button>

        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={formik.isSubmitting}
        >
          Відмінити
        </button>
      </div>
    </form>
  );
}
