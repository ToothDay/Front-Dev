import type { Metadata } from "next";
import "@/app/globals.scss";
import styles from "@/app/layout.module.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "투스데이",
  description: "내 손안의 치아 건강 지킴이, 투스데이"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={styles.root}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
        >
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
