import { Poppins } from "next/font/google";
import s from "@/styles/layout.module.scss";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import classNames from "classnames";
import "./globals.scss";
import localFont from "next/dist/compiled/@next/font/dist/local";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classNames(poppins.className, s.outerApp)}>
      <div className={s.app}>
        <Header />
        <main className={s.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
