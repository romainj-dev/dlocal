import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Payments MFE</title>
        <meta name="description" content="Payments micro-frontend." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
