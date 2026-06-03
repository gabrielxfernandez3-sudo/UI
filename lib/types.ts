export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  available: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id?: string
  customer_name: string
  phone: string
  email?: string
  order_type: 'pickup' | 'delivery'
  address?: string
  notes?: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'
  created_at?: string
}
