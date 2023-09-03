import { ThemeProvider } from '@/components/themes/theme-provider'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topbar from '@/components/shared/topbar'
import LeftSidebar from '@/components/shared/leftsidebar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LilNait Dashboard | Main',
  description: 'Created by Lilnait web developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Toaster />
          <Topbar />
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
