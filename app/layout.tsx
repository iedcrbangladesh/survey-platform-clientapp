import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/app/context/auth-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Survey App',
  description: 'Generated by Mostofa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className+' dark'}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
      </body>
    </html>
  )
}
