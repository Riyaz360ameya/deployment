import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './redux/provider'
import { Toaster, toast } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ameya360',
  description: 'Ameya360 Project Management Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>{children}
          <Toaster richColors position='top-right' />
        </Providers>
      </body>
    </html>
  )
}
