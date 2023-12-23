import { Poppins } from "next/font/google";
import s from "@/styles/print-layout.module.scss";
import React from "react";
import classNames from "classnames";
import "@/app/globals.scss";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const PrintLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classNames(poppins.className, s.printLayout)}>
      {children}
    </div>
  );
};

export default PrintLayout;
