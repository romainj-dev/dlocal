import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Merchant Portal MFE</title>
        <meta name="description" content="Merchant portal micro-frontend." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
