// export default function Home() {
//   return (
//     <main>
//       <h1>Природні мандри</h1>
//       <p>
//         Відкривай нові маршрути, ділися історіями подорожей та знаходь
//         однодумців для мандрів.
//       </p>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/lib/api/api';
import About from '@/components/about/About';

export default function Home() {
  const [result, setResult] = useState('Loadin...');

  useEffect(() => {
    api
      .get('/categories')
      .then((response) => {
        setResult(JSON.stringify(response.data, null, 2));
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setResult(
            error.response
              ? `Помилка ${error.response.status}: ${JSON.stringify(error.response.data)}`
              : `Помилка підключення: ${error.message}`,
          );
        } else {
          setResult('виникла помилка');
        }
      });
  }, []);

  return (
    <main>
      <div style={{ padding: '24px', whiteSpace: 'pre-wrap' }}>
        <h1>Перевірка підключення до API</h1>
        <pre>{result}</pre>
      </div>

      <About />
    </main>
  );
}
