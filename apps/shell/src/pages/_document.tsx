import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>dLocal Operations Console</title>
        <meta
          name="description"
          content="Unified workspace for payments, risk, merchant portal, and reporting."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
