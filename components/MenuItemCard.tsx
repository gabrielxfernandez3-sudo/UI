'use client'

import { Plus, Minus } from 'lucide-react'
import { MenuItem } from '@/lib/types'
import { useCart } from '@/context/CartContext'

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { items, addItem, updateQty } = useCart()
  const cartItem = items.find(i => i.id === item.id)
  const qty = cartItem?.quantity ?? 0

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex justify-between items-start gap-3 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
        <p className="font-bold text-orange-500 mt-2">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex-shrink-0">
        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-medium text-sm transition-colors"
          >
            <Plus size={16} />
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg p-1">
            <button
              onClick={() => updateQty(item.id, qty - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center font-bold text-gray-900 text-sm">{qty}</span>
            <button
              onClick={() => addItem(item)}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
