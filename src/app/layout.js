import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster, toast } from 'sonner';
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
            <Toaster richColors position='top-right' />
          </Providers>
        </div>
      </body>
    </html>
  )
}
