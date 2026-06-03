'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Store } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    order_type: 'pickup' as 'pickup' | 'delivery',
    address: '',
    notes: '',
  })

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    try {
      const orderItems = items.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: orderItems, total }),
      })

      if (!res.ok) throw new Error('Failed to place order')
      const { id } = await res.json()
      clearCart()
      router.push(`/order/${id}`)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <Link href="/" className="text-orange-500 font-medium hover:underline">
          ← Back to menu
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-6 text-sm">
        <ArrowLeft size={16} /> Back to menu
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Order</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-900">Contact Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              required
              type="text"
              value={form.customer_name}
              onChange={e => update('customer_name', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Order type */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
          <h2 className="font-semibold text-gray-900">Order Type</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => update('order_type', 'pickup')}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 font-medium transition-colors ${
                form.order_type === 'pickup'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <Store size={20} /> Pickup
            </button>
            <button
              type="button"
              onClick={() => update('order_type', 'delivery')}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 font-medium transition-colors ${
                form.order_type === 'delivery'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <MapPin size={20} /> Delivery
            </button>
          </div>

          {form.order_type === 'delivery' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
              <textarea
                required
                value={form.address}
                onChange={e => update('address', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>
          )}

          {form.order_type === 'pickup' && (
            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
              📍 Pick up at: <strong>123 Restaurant St, Your City</strong>
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (optional)</label>
          <textarea
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Allergies, extra sauce, no onions..."
          />
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-700">
                <span>{item.quantity}× {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-orange-500">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">💵 Payment collected in person</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-lg transition-colors"
        >
          {loading ? 'Placing Order...' : `Confirm Order · $${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}
