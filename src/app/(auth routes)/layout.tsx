import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Link href="/">
          Природні мандри<svg></svg>
        </Link>
      </header>
      {children}
      <footer>
        <p>
          {'\u00A9'} {new Date().getFullYear()} Подорожники
        </p>
      </footer>
    </>
  );
}
