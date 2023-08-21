import './globals.css'
import { Inter } from 'next/font/google'
import StateProvider from './state-provider'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tapple Online',
  description: 'Online multiplayer game of Tapple',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider> { children } </StateProvider>
        <Analytics mode={'production'} />;
      </body>
    </html>
  )
}
