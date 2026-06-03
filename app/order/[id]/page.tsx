import Link from 'next/link'
import { CheckCircle, Clock, Phone } from 'lucide-react'
import { Order } from '@/lib/types'

async function getOrder(id: string): Promise<Order | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/orders/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

const statusSteps = ['pending', 'confirmed', 'preparing', 'ready', 'delivered']
const statusLabels: Record<string, string> = {
  pending: 'Order Received',
  confirmed: 'Confirmed',
  preparing: 'Being Prepared',
  ready: 'Ready for Pickup / Out for Delivery',
  delivered: 'Delivered',
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Order not found.</p>
        <Link href="/" className="text-orange-500 font-medium hover:underline">← Back to menu</Link>
      </div>
    )
  }

  const currentStep = statusSteps.indexOf(order.status)

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center mb-6">
        <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
        <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
        <p className="text-gray-500 mt-1">Thanks, {order.customer_name}. We have your order.</p>
        <div className="mt-4 bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Order ID</p>
          <p className="font-mono font-bold text-gray-800 text-sm">{id}</p>
        </div>
      </div>

      {/* Status tracker */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={18} /> Order Status
        </h2>
        <div className="space-y-3">
          {statusSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                i < currentStep ? 'bg-green-500' :
                i === currentStep ? 'bg-orange-500 ring-4 ring-orange-100' :
                'bg-gray-200'
              }`} />
              <span className={`text-sm ${
                i === currentStep ? 'font-bold text-orange-600' :
                i < currentStep ? 'text-gray-500 line-through' :
                'text-gray-400'
              }`}>
                {statusLabels[step]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Refresh this page to see status updates</p>
      </div>

      {/* Order details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">What You Ordered</h2>
        <div className="space-y-2">
          {(order.items as { name: string; price: number; quantity: number }[]).map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-gray-700">
              <span>{item.quantity}× {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-orange-500">${Number(order.total).toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">💵 Pay in person · {order.order_type === 'pickup' ? '📍 Pickup' : '🚗 Delivery'}</p>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-start gap-3 mb-6">
        <Phone className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
        <div>
          <p className="font-medium text-gray-900 text-sm">We'll call you if there are any questions</p>
          <p className="text-gray-500 text-sm">{order.phone}</p>
        </div>
      </div>

      <Link
        href="/"
        className="block text-center text-orange-500 font-medium hover:underline"
      >
        ← Order more items
      </Link>
    </div>
  )
}
