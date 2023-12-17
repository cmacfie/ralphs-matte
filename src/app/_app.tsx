import "antd/dist/antd.css";
import React from "react";
import RootLayout from "@/app/layout";
import { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDivide,
  faMinus,
  faPlus,
  faPrint,
  fas,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

library.add(faDivide, faXmark, faPlus, faMinus, faPrint, fas, fab);
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
