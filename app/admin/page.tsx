'use client'

import { useEffect, useState } from 'react'
import { Order } from '@/lib/types'
import { RefreshCw, Clock, CheckCircle } from 'lucide-react'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-purple-100 text-purple-700',
  ready: 'bg-green-100 text-green-700',
  delivered: 'bg-gray-100 text-gray-600',
}

const nextStatus: Record<string, string> = {
  pending: 'confirmed',
  confirmed: 'preparing',
  preparing: 'ready',
  ready: 'delivered',
}

const nextLabel: Record<string, string> = {
  pending: 'Confirm',
  confirmed: 'Start Preparing',
  preparing: 'Mark Ready',
  ready: 'Mark Delivered',
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    const res = await fetch('/api/orders')
    const data = await res.json()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [])

  const advance = async (id: string, status: string) => {
    setUpdating(id)
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await fetchOrders()
    setUpdating(null)
  }

  const active = orders.filter(o => o.status !== 'delivered')
  const done = orders.filter(o => o.status === 'delivered')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
          <p className="text-gray-500 text-sm">The Good Fork · Admin</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm transition-colors"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Active orders */}
      <div className="mb-8">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={18} className="text-orange-500" /> Active Orders ({active.length})
        </h2>

        {active.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12 bg-white rounded-2xl border border-gray-100">
            No active orders
          </div>
        )}

        <div className="grid gap-4">
          {active.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-bold text-gray-900">{order.customer_name}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.order_type === 'pickup' ? '📍 Pickup' : `🚗 Delivery: ${order.address}`}
                  </p>
                  {order.notes && (
                    <p className="text-sm bg-yellow-50 text-yellow-800 px-2 py-1 rounded mt-2">
                      📝 {order.notes}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="font-bold text-orange-500 mt-2">${Number(order.total).toFixed(2)}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3 mb-4">
                {(order.items as { name: string; quantity: number; price: number }[]).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-gray-700">
                    <span>{item.quantity}× {item.name}</span>
                    <span className="text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {nextStatus[order.status] && (
                <button
                  onClick={() => advance(order.id!, nextStatus[order.status])}
                  disabled={updating === order.id}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-2.5 rounded-xl font-semibold transition-colors"
                >
                  {updating === order.id ? 'Updating...' : nextLabel[order.status]}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completed orders */}
      {done.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-500" /> Completed Today ({done.length})
          </h2>
          <div className="space-y-2">
            {done.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex justify-between items-center text-sm text-gray-500">
                <span className="font-medium text-gray-700">{order.customer_name}</span>
                <span>${Number(order.total).toFixed(2)}</span>
                <span className="text-xs">{new Date(order.created_at!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
