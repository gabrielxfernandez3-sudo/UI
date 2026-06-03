'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function Header() {
  const { itemCount, toggleCart } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🍔</span>
          <div>
            <h1 className="font-bold text-lg leading-tight text-gray-900">The Good Fork</h1>
            <p className="text-xs text-gray-500 leading-none">Order Online</p>
          </div>
        </Link>

        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
