
import { Dish, Chef } from './types';

export const NAV_LINKS = ["Home", "Menu", "Reservations", "Chefs", "Track Order"];

export const CATEGORIES = [
  { id: 'starter', name: 'Cyber Starters', gradient: 'from-neon-blue to-blue-900' },
  { id: 'main', name: 'Mainframe Mains', gradient: 'from-purple-600 to-neon-pink' },
  { id: 'dessert', name: 'Digital Desserts', gradient: 'from-emerald-500 to-neon-green' },
  { id: 'drinks', name: 'Neon Elixirs', gradient: 'from-red-600 to-orange-600' },
];

export const DISHES: Dish[] = [
  {
    id: 1,
    name: "Quantum Burger",
    description: "Lab-grown wagyu infused with truffle particles, levitating on a magnetic plate.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
    category: "main",
    rating: 4.9,
    calories: 850
  },
  {
    id: 2,
    name: "Neon Ramen",
    description: "Bioluminescent broth with holographic noodles and nano-spiced pork.",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=60",
    category: "main",
    rating: 4.8,
    calories: 620,
    isSpicy: true
  },
  {
    id: 3,
    name: "Cyber Sushi Set",
    description: "Precision-cut sashmi with edamame puree and liquid nitrogen fog.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
    category: "starter",
    rating: 5.0,
    calories: 400
  },
  {
    id: 7,
    name: "Zero-G Scallops",
    description: "Pan-seared scallops served on a levitating bed of seafoam and coral dust.",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop&q=60",
    category: "starter",
    rating: 4.9,
    calories: 320
  },
  {
    id: 4,
    name: "Plasma Pizza",
    description: "Zero-gravity dough topped with radiant tomatoes and electric basil.",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60",
    category: "main",
    rating: 4.7,
    calories: 900
  },
  {
    id: 8,
    name: "Chrono Steak",
    description: "Aged in a temporal stasis field for perfect tenderness, served with void sauce.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=60",
    category: "main",
    rating: 5.0,
    calories: 950
  },
  {
    id: 5,
    name: "Binary Brownie",
    description: "Dark matter chocolate with a core of molten gold caramel.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=60",
    category: "dessert",
    rating: 4.9,
    calories: 450,
    isVegan: true
  },
  {
    id: 9,
    name: "Holo-Cheesecake",
    description: "Deconstructed cheesecake with holographic sugar shards and berry mist.",
    price: 16.00,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=60",
    category: "dessert",
    rating: 4.7,
    calories: 410
  },
  {
    id: 11,
    name: "Nebula Lava Cake",
    description: "Molten dark chocolate core simulating a black hole event horizon.",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&auto=format&fit=crop&q=60",
    category: "dessert",
    rating: 4.9,
    calories: 520
  },
  {
    id: 6,
    name: "Void Cocktail",
    description: "Color-shifting gin blend that glows under UV light.",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=60",
    category: "drinks",
    rating: 4.8,
    calories: 150
  },
  {
    id: 10,
    name: "Neural Nectar",
    description: "Energizing matcha blend with synaptic-enhancing pearls.",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=60",
    category: "drinks",
    rating: 4.6,
    calories: 120
  },
  {
    id: 12,
    name: "Quantum Quencher",
    description: "Sparkling blue algae infusion that changes flavor frequency as you sip.",
    price: 11.00,
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=60",
    category: "drinks",
    rating: 4.7,
    calories: 90
  }
];

export const CHEFS: Chef[] = [
  {
    id: 101,
    name: "Chef A.I.da",
    specialty: "Molecular Gastronomy",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=60",
    availability: "Tonight",
    rating: 5.0
  },
  {
    id: 102,
    name: "Marcus Void",
    specialty: "Fusion Cybernetics",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop&q=60",
    availability: "Tomorrow",
    rating: 4.9
  }
];
