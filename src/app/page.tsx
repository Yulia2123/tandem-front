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
import Hero from '@/components/home/Hero/Hero';
import Footer from '@/components/layout/Footer/Footer';
import Join from '@/components/home/Join/Join';
export default function Home() {
  return (
    <>
      <Header />

      <main>
        <div className="section">
          <Hero />
          <Join />
        </div>
      </main>

      <Footer />
    </>
  );
}
