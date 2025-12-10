
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
  // New Profile Fields
  bio: string;
  education: string;
  experience: string[];
  philosophy: string;
  stats: {
    creativity: number; // 0-100
    precision: number;
    speed: number;
    tech: number;
  };
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
  // Delivery Details
  deliveryMethod: 'drone' | 'partner';
  deliveryAddress: string;
  contactPhone: string;
  customerName: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
