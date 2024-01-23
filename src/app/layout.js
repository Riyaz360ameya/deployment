import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Providers from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ameya360',
  description: 'Ameya360 Project Management Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={inter.className}>
        <div key="root">
          <Providers>
            {children}
            <ToastContainer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
