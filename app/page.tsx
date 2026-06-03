'use client'

import { useState } from 'react'
import { menuItems, categories } from '@/lib/menu'
import MenuItemCard from '@/components/MenuItemCard'
import { useCart } from '@/context/CartContext'
import { ShoppingCart } from 'lucide-react'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const { itemCount, total, toggleCart } = useCart()

  const filtered = menuItems.filter(i => i.category === activeCategory && i.available)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-1">Welcome to The Good Fork</h2>
        <p className="text-orange-100 text-lg">Fresh ingredients, bold flavors — order in minutes</p>
        <div className="flex gap-4 mt-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">🕐 Open Now</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">🚗 Pickup & Delivery</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">💵 Pay in Person</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
              activeCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Floating cart button (mobile) */}
      {itemCount > 0 && (
        <button
          onClick={toggleCart}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-lg transition-colors z-30 sm:hidden"
        >
          <ShoppingCart size={22} />
          <span>{itemCount} items</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">${total.toFixed(2)}</span>
        </button>
      )}
    </div>
  )
}
