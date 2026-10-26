# Природні Мандри

Платформа «Природні мандри» — сервіс для публікації історій про подорожі, знайомства з мандрівниками та збереження цікавих історій.
Проєкт дозволяє користувачам реєструватися, входити в акаунт, переглядати історії, знайомитися з іншими мандрівниками, створювати власні публікації та керувати профілем.

[![Next.js](https://img.shields.io/badge/Next.js-16-111111?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)

## Зміст

1. [Посилання](#посилання)
2. [Команда](#команда)
3. [Що на екрані](#що-на-екрані)
4. [Стек](#стек)
5. [Сторінки](#сторінки)
6. [Проксі](#проксі)
7. [Запуск](#запуск)

## Посилання

| Сайт | [vercel.app]() |
| Бекенд-репозиторій | [Yulia2123/tandem-backend](https://github.com/Yulia2123/tandem-backend) |
| Макет | [Figma](https://www.figma.com/design/MtFFBHr6F6WSwD5AnKypTM/%D0%9F%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%BD%D1%96-%D0%BC%D0%B0%D0%BD%D0%B4%D1%80%D0%B8?node-id=6383-168&p=f&t=assOqWcCPreRkvxF-0) |

Бекенд на безкоштовному тарифі Render засинає без запитів, тому перше звернення після паузи може тривати до хвилини.

## Команда

| Учасник | GitHub | Роль |
| --- | --- | --- |
| Юліана Снагустенко | [Yulia2123](https://github.com/Yulia2123) | Тімлід, Backend, Layout, авторизація та реєстрація |
| Анастасія Трофименко | [anastasiia-trofymenko](https://github.com/anastasiia-trofymenko) | Скрам, Перший екран: Hero, Публічний профіль, порожній стан |
| Максим Даценко | [mks-devcode](https://github.com/mks-devcode) | Каталог: фільтри, сітка статті |
| Сергій Чічур | [syper-sys](https://github.com/syper-sys) | Вхід, реєстрація, Популярні статті: карусель і картка |
| Ганна Анікєєва | [annaanikeeva2020-tech](https://github.com/annaanikeeva2020-tech) | Сторінка "Мандрівники", Our Travellers |
| Дарина Бігос | [darina-bigos](https://github.com/darina-bigos) | About, сторінка перегляд істроії |
| Марія Попелянець | [mariia-popelianets](https://github.com/mariia-popelianets) | Loader, Join |
| Максим Шкубяк | [maksym-skubiak](https://github.com/maksym-skubiak) | Сесія: підтвердження виходу |
| Владислава Довбиш | [vlada-dovbysh](https://github.com/vlada-dovbysh) | Сторінка-профіль "Збережені / Мої історії" |
| Савелій Положенцев | [Zeven221](https://github.com/Zeven221) | Сторінка профіль, «Показати ще» |
| Аміна Стаднік | [aminastadnik718-ctrl](https://github.com/aminastadnik718-ctrl) | Сторінка "Створення історії" |


## Що на екрані

| Розділ | Поведінка |
| --- | --- |
| Головна | Hero, інформація, популярні історії, мандріники та заклик приєднатися |
| Каталог | Перегляд публікацій і категорій, картки історій, завантаження наступної порції |
| Сторінка історії | Перегляд публікації, інформації про автора та перехід до профілю |
| Профіль | Інформація про користувача та його історії |
| Вхід і реєстрація | Помилки валідації біля полів, помилка запиту — тост |
| Створення історії | Завантаження обкладинки, вибір категорії, введення заголовка та тексту |
| Збережені історії | Додавання історій до збережених і керування відповідним станом |
| Сесія користувача | Збереження авторизованого стану під час перезавантаження сторінки |

## Стек

| Категорія | Технології |
| --- | --- |
| Каркас | Next.js 16, App Router, React 19, TypeScript, React Compiler |
| Стилі | CSS Modules, `modern-normalize`, шрифт Montserrat |
| Дані | TanStack Query і Axios |
| Сесія в клієнті | Zustand |
| Форми | Formik і Yup |
| Лоадери | `react-spinners` |
| Сповіщення | react-hot-toast |
| Адаптив | mobile first, `min-width`: 375, 768, 1440 |

## Сторінки

Публічні маршрути відкриті всім.

| Шлях | Екран |
| --- | --- |
| `/` | Головна |
| `/stories` | Каталог історій |
| `/stories/[storyId]` | Перегляд окремої історії |
| `/travellers` | Список мандрівників |
| `/travellers/[travellerId]` | Публічний профіль мандрівника |
| `/login` | Вхід |
| `/register` | Реєстрація |
| `/profile` | Профіль поточного користувача |
| `/profile/[id]` | Профіль користувача та його публікації |
| `/new-story` | Вихід із сесії |
| `/logout` | /new-story |

Захист маршрутів і спроба оновити сесію зібрані в `proxy.ts`.

## Проксі

Як працює проксі?

Browser
   ↓
Next.js API Route Handler
   ↓
proxyToBackend()
   ↓
Express Backend
   ↓
MongoDB

Функція proxyToBackend() пересилає запити до Backend, зберігаючи HTTP-метод, query-параметри, тіло запиту та необхідні заголовки.

## Запуск

Потрібні Node.js 20.9+ і запущений бекенд на `http://localhost:4000`.

```bash
git clone https://github.com/Yulia2123/tandem-front.git
cd tandem-front
npm install
cp .env.template .env
npm run dev
```

Сайт відкривається на `http://localhost:3000`.

Файл `.env`:

```env
BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_APP_URL` потрібен для `metadataBase` і Open Graph.

| Команда | Результат |
| --- | --- |
| `npm run dev` | режим розробки |
| `npm run build` | продакшн-збірка |
| `npm start` | запуск зібраного застосунку |
| `npm run lint` | ESLint |

Щоб працювати з прод-API без локального бекенду, у `BACKEND_URL` можна вказати `https://tandem-backend-4bbb.onrender.com/api`.

