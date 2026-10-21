'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import api from '@/lib/api/api';

// export default function Home() {
//   const [result, setResult] = useState('Loadin...');

//   useEffect(() => {
//     api
//       .get('/categories')
//       .then((response) => {
//         setResult(JSON.stringify(response.data, null, 2));
//       })
//       .catch((error: unknown) => {
//         if (axios.isAxiosError(error)) {
//           setResult(
//             error.response
//               ? `Помилка ${error.response.status}: ${JSON.stringify(error.response.data)}`
//               : `Помилка підключення: ${error.message}`,
//           );
//         } else {
//           setResult('виникла помилка');
//         }
//       });
//   }, []);

//   return (
//     <main style={{ padding: '24px', whiteSpace: 'pre-wrap' }}>
//       <h1>Перевірка підключення до API</h1>
//       <pre>{result}</pre>
//     </main>
//   );
// }

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PopularStories from '@/components/PopularStories/PopularStories';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <h1>Природні мандри</h1>
        <p>
          Відкривай нові маршрути, ділися історіями подорожей та знаходь
          однодумців для мандрів.
        </p>
        <PopularStories />
      </main>
      <Footer />
    </>
  );
}
