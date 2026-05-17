import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';

import Model from "@/components/Model";
import LoginModel from "@/components/models/LoginModel";
import RegisterModel from "@/components/models/RegisterModel";
import EditModel from "@/components/models/EditModel";
import PWARegister from "@/components/PWARegister";
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PWARegister />
      <Model />
      <Toaster/>
      <EditModel/>
      <RegisterModel/>
      <LoginModel/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
