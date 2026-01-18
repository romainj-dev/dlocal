import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Risk MFE</title>
        <meta name="description" content="Risk micro-frontend." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
