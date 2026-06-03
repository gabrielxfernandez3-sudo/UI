import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import CartSidebar from '@/components/CartSidebar'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Good Fork — Order Online',
  description: 'Fresh food, fast. Order online for pickup or delivery.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <CartProvider>
          <Header />
          <CartSidebar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
