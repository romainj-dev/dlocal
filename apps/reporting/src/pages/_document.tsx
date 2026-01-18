import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Reporting MFE</title>
        <meta name="description" content="Reporting micro-frontend." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
