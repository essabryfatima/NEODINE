export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  calories: number;
  isSpicy?: boolean;
  isVegan?: boolean;
  videoUrl?: string; // For hover effects
}

export interface Chef {
  id: number;
  name: string;
  specialty: string;
  image: string;
  availability: string;
  rating: number;
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  tableId: number;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'cooking' | 'ready' | 'delivering' | 'delivered';
  timestamp: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}