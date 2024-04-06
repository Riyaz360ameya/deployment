"use client";
import './globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Providers from './providers';
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
        <div key="root"  className="dark:bg-boxdark-2 dark:text-bodydark">
          <Providers>
            {loading ? <Loader /> : children}
            <ToastContainer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
