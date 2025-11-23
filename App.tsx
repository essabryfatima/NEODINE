import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ChefGrid from './components/CategoryGrid'; // Reusing the file but renamed component internally
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import { DISHES, CHEFS } from './constants';
import { Dish, CartItem, Order } from './types';
import { CheckCircle, Loader, Truck } from 'lucide-react';

const App: React.FC = () => {
  // -- MOCK BACKEND STATE --
  const [activeTab, setActiveTab] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; type: 'table' | 'chef' }>({ isOpen: false, type: 'table' });
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // -- HANDLERS --

  const handleAddToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    
    // Create Order
    const newOrder: Order = {
      id: `#${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: cart.reduce((a, b) => a + b.price * b.quantity, 0),
      status: 'preparing',
      timestamp: Date.now()
    };
    
    setActiveOrder(newOrder);
    setCart([]);
    
    // Switch to "Track Order" view
    setActiveTab('Track Order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderDeliveryClick = () => {
    setActiveTab('Home'); // Ensure we are on the home tab
    // Small delay to allow state update if we weren't on Home, then scroll
    setTimeout(() => {
        const menuElement = document.getElementById('menu');
        if (menuElement) {
            menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  // -- SIMULATED REAL-TIME SOCKET --
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'delivered') {
      const statuses: Order['status'][] = ['preparing', 'cooking', 'ready', 'delivering', 'delivered'];
      const currentIndex = statuses.indexOf(activeOrder.status);
      
      if (currentIndex < statuses.length - 1) {
        const timer = setTimeout(() => {
          setActiveOrder(prev => prev ? { ...prev, status: statuses[currentIndex + 1] } : null);
        }, 4000); // Updates every 4 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [activeOrder]);


  // -- RENDER CONTENT BASED ON TAB --
  const renderContent = () => {
    if (activeTab === 'Track Order') {
        if (!activeOrder) return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-32">
                <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-white/10">
                    <Truck className="w-10 h-10 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No Active Orders</h2>
                <p className="text-gray-400 mb-8">Hungry? Explore our futuristic menu.</p>
                <button onClick={() => setActiveTab('Menu')} className="bg-neon-blue text-black px-6 py-3 rounded font-bold">
                    BROWSE MENU
                </button>
            </div>
        );

        return (
            <div className="min-h-[80vh] pt-32 px-4 max-w-3xl mx-auto">
                <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white mb-2">ORDER TRACKING</h2>
                            <p className="text-neon-blue font-mono">{activeOrder.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-sm">Estimated Arrival</p>
                            <p className="text-2xl font-bold text-white">15 MIN</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-12">
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-neon-green transition-all duration-1000" 
                                style={{ width: activeOrder.status === 'preparing' ? '20%' : activeOrder.status === 'cooking' ? '40%' : activeOrder.status === 'ready' ? '70%' : activeOrder.status === 'delivering' ? '90%' : '100%' }} 
                            />
                        </div>
                        <div className="flex justify-between mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <span className={activeOrder.status === 'preparing' ? 'text-neon-blue animate-pulse' : 'text-white'}>Preparing</span>
                            <span className={activeOrder.status === 'cooking' ? 'text-neon-blue animate-pulse' : activeOrder.status === 'preparing' ? '' : 'text-white'}>Cooking</span>
                            <span className={activeOrder.status === 'delivering' ? 'text-neon-blue animate-pulse' : activeOrder.status === 'delivered' ? 'text-white' : ''}>On Way</span>
                            <span className={activeOrder.status === 'delivered' ? 'text-neon-green' : ''}>Delivered</span>
                        </div>
                    </div>

                    {/* Live Map Simulation */}
                    <div className="bg-black rounded-xl h-48 w-full mb-8 relative overflow-hidden border border-white/10 group">
                        <img 
                            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&auto=format&fit=crop&q=80" 
                            alt="Live Map" 
                            className="w-full h-full object-cover opacity-50 grayscale" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 backdrop-blur px-4 py-2 rounded border border-white/10">
                                <p className="text-xs text-neon-green font-bold tracking-wider animate-pulse">LIVE DRONE TRACKING ACTIVE</p>
                            </div>
                        </div>
                        {/* Drone Icon Animation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-red rounded-full shadow-[0_0_20px_#ff003c] animate-ping"></div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-white border-b border-white/10 pb-2">Order Summary</h3>
                        {activeOrder.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-300">
                                <span>{item.quantity}x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-lg font-bold text-white pt-2">
                            <span>Total Paid</span>
                            <span className="text-neon-green">${activeOrder.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
      <>
        <Hero 
            onBookTable={() => setBookingModal({ isOpen: true, type: 'table' })} 
            onViewMenu={handleOrderDeliveryClick} 
        />
        
        {/* Modified spacing: Removed -mt-20 and added pt-12 to push it down */}
        <div id="menu" className="relative z-10 pt-12 pb-20 space-y-4 bg-gradient-to-b from-transparent via-slate-950 to-slate-950">
          <MenuSection 
            title="Chef's Signature" 
            dishes={DISHES.filter(d => d.category === 'main' || d.category === 'starter')} 
            onAddToCart={handleAddToCart} 
          />
          <MenuSection 
            title="Sweet & Sips" 
            dishes={DISHES.filter(d => d.category === 'dessert' || d.category === 'drinks')} 
            onAddToCart={handleAddToCart} 
          />
          
          <ChefGrid 
            onBookChef={() => setBookingModal({ isOpen: true, type: 'chef' })}
            onViewAll={() => { setActiveTab('Chefs'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
          />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-neon-pink selection:text-white">
      <Navbar 
        cartCount={cart.reduce((a,b) => a + b.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoggedIn(!isLoggedIn)}
        isLoggedIn={isLoggedIn}
        activeTab={activeTab}
        onNavClick={(tab) => { setActiveTab(tab); window.scrollTo({top: 0}); }}
      />
      
      <main className="relative z-0 min-h-screen">
        {activeTab === 'Home' ? renderContent() : (
            activeTab === 'Menu' ? (
                <div className="pt-32 pb-20 space-y-8">
                     <MenuSection 
                        title="Full Menu" 
                        dishes={DISHES} 
                        onAddToCart={handleAddToCart} 
                    />
                </div>
            ) : activeTab === 'Chefs' ? (
                 <div className="pt-32 pb-20">
                    <ChefGrid 
                        onBookChef={() => setBookingModal({ isOpen: true, type: 'chef' })} 
                        onViewAll={() => {}} // Already on view all page
                    />
                 </div>
            ) : activeTab === 'Reservations' ? (
                <div className="pt-40 pb-20 flex flex-col items-center justify-center text-center px-4">
                     <h2 className="text-4xl font-display font-bold mb-6">Make a Reservation</h2>
                     <p className="text-gray-400 max-w-md mb-8">Secure your spot in the dining room of tomorrow.</p>
                     <button 
                        onClick={() => setBookingModal({ isOpen: true, type: 'table' })}
                        className="bg-neon-blue text-black px-8 py-4 rounded-lg font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                     >
                         BOOK TABLE NOW
                     </button>
                </div>
            ) : renderContent()
        )}
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        updateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <BookingModal 
        isOpen={bookingModal.isOpen}
        type={bookingModal.type}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
      />
    </div>
  );
};

export default App;