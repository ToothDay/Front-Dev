import type { Metadata } from "next";
import "@/app/globals.scss";
import styles from "@/app/layout.module.scss";
import Providers from "@/components/Providers";
import UserProfileProvider from "@/components/UserProfileProvider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "ToothDay",
  description: "내 손안의 치아 건강 지킴이, 투스데이"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={styles.body}>
      <Head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <meta property="og:title" content={String(metadata.title)} />
        <meta
          property="og:description"
          content={String(metadata.description)}
        />
        <script
          defer
          src="https://cdn.swygbro.com/public/widget/swyg-widget.js"
        ></script>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://toothday.swygbro.com" />
        <meta property="og:image" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="author" content="스위프 3팀" />
        <meta name="keywords" content="치아, 건강, 투스데이, 치아 관리" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png" />
        <link rel="apple-touch-icon" sizes="any" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/favicon-512.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
      </Head>
      <body className={styles.root}>
        <Providers>
          <UserProfileProvider>{children}</UserProfileProvider>
        </Providers>
      </body>
    </html>
  );
}
