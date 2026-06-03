import { MenuItem } from './types'

export const menuItems: MenuItem[] = [
  // Starters
  { id: 's1', name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs', price: 4.99, category: 'Starters', available: true },
  { id: 's2', name: 'Chicken Wings', description: '8 crispy wings with your choice of sauce', price: 9.99, category: 'Starters', available: true },
  { id: 's3', name: 'Mozzarella Sticks', description: 'Golden fried cheese sticks with marinara', price: 7.99, category: 'Starters', available: true },
  { id: 's4', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, Caesar dressing', price: 8.99, category: 'Starters', available: true },

  // Burgers
  { id: 'b1', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, pickles, ketchup', price: 12.99, category: 'Burgers', available: true },
  { id: 'b2', name: 'BBQ Bacon Burger', description: 'Beef, bacon, BBQ sauce, cheddar, onion rings', price: 15.99, category: 'Burgers', available: true },
  { id: 'b3', name: 'Mushroom Swiss', description: 'Beef, sautéed mushrooms, Swiss cheese, aioli', price: 14.99, category: 'Burgers', available: true },
  { id: 'b4', name: 'Veggie Burger', description: 'Plant-based patty, avocado, sprouts, tomato', price: 13.99, category: 'Burgers', available: true },

  // Mains
  { id: 'm1', name: 'Grilled Chicken', description: 'Herb-marinated chicken with roasted vegetables', price: 16.99, category: 'Mains', available: true },
  { id: 'm2', name: 'Fish & Chips', description: 'Beer-battered cod with chunky fries and tartar sauce', price: 17.99, category: 'Mains', available: true },
  { id: 'm3', name: 'Pasta Carbonara', description: 'Spaghetti, bacon, egg, parmesan, black pepper', price: 14.99, category: 'Mains', available: true },
  { id: 'm4', name: 'BBQ Ribs', description: 'Half rack slow-cooked pork ribs, coleslaw, fries', price: 22.99, category: 'Mains', available: true },

  // Sides
  { id: 'si1', name: 'French Fries', description: 'Crispy golden fries with sea salt', price: 3.99, category: 'Sides', available: true },
  { id: 'si2', name: 'Sweet Potato Fries', description: 'With chipotle dipping sauce', price: 4.99, category: 'Sides', available: true },
  { id: 'si3', name: 'Onion Rings', description: 'Beer-battered onion rings', price: 4.99, category: 'Sides', available: true },
  { id: 'si4', name: 'Coleslaw', description: 'Creamy homemade coleslaw', price: 2.99, category: 'Sides', available: true },

  // Drinks
  { id: 'd1', name: 'Soft Drink', description: 'Cola, Lemonade, Orange, Water', price: 2.49, category: 'Drinks', available: true },
  { id: 'd2', name: 'Milkshake', description: 'Vanilla, Chocolate, or Strawberry', price: 5.99, category: 'Drinks', available: true },
  { id: 'd3', name: 'Fresh Juice', description: 'Orange, Apple, or Mango', price: 4.49, category: 'Drinks', available: true },

  // Desserts
  { id: 'de1', name: 'Chocolate Brownie', description: 'Warm brownie with vanilla ice cream', price: 6.99, category: 'Desserts', available: true },
  { id: 'de2', name: 'Cheesecake', description: 'New York style with berry compote', price: 7.99, category: 'Desserts', available: true },
  { id: 'de3', name: 'Ice Cream', description: '3 scoops - ask for today\'s flavors', price: 5.99, category: 'Desserts', available: true },
]

export const categories = [...new Set(menuItems.map(i => i.category))]
