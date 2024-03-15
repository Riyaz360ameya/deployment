"use client";
import './globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Providers from './providers';
import DefaultLayout from './components/Layout/DefaultLayout';
import Loader from './components/common/page';
import { useEffect, useState } from 'react';


export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}>
        <div key="root" >
          <Providers>
            {loading ? <Loader /> : children}
            <ToastContainer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
