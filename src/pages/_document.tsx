import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#fefefe" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
