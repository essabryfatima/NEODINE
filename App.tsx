import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ChefGrid from './components/CategoryGrid';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import ChefProfileModal from './components/ChefProfileModal';
import CookieConsent from './components/CookieConsent';
import LegalPage from './components/LegalPages';
import Toast from './components/Toast';
import { DISHES } from './constants';
import { Dish, CartItem, Order, Chef, ToastMessage } from './types';
import { Truck, MapPin, Clock, Phone, User } from 'lucide-react';

const App: React.FC = () => {
  // -- MOCK BACKEND STATE --
  const [activeTab, setActiveTab] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Booking State
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; type: 'table' | 'chef'; chefId?: number }>({ isOpen: false, type: 'table' });
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  
  // Profile & UX State
  const [selectedChefProfile, setSelectedChefProfile] = useState<Chef | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // -- TOAST SYSTEM --
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // -- HANDLERS --

  const handleAddToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    showToast(`Added ${dish.name} to cart`, 'success');
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = (details: { name: string; address: string; phone: string; method: 'drone' | 'partner' }) => {
    setIsCartOpen(false);
    
    // Delivery Fee calculation
    const fee = details.method === 'drone' ? 5.00 : 2.50;
    const cartTotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);

    // Create Order with Real Delivery Details
    const newOrder: Order = {
      id: `#${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: cartTotal + fee,
      status: 'preparing',
      timestamp: Date.now(),
      deliveryMethod: details.method,
      deliveryAddress: details.address,
      contactPhone: details.phone,
      customerName: details.name
    };
    
    setActiveOrder(newOrder);
    setCart([]);
    showToast('Order placed successfully!', 'success');
    
    // Switch to "Track Order" view
    setActiveTab('Track Order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingComplete = () => {
    // Logic to run when a reservation + food pre-order is paid for
    if (cart.length > 0) {
        setCart([]); // Clear the cart as the items are now part of the paid reservation
    }
    showToast('Reservation Confirmed & Paid', 'success');
    // Note: We keep the modal open on step 5 (Success Screen) so the user can read the confirmation
  };

  const handleLegalClick = (page: 'privacy' | 'terms' | 'cookies') => {
    setActiveTab(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -- SIMULATED REAL-TIME SOCKET --
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'delivered') {
      const statuses: Order['status'][] = ['preparing', 'cooking', 'ready', 'delivering', 'delivered'];
      const currentIndex = statuses.indexOf(activeOrder.status);
      
      if (currentIndex < statuses.length - 1) {
        const timer = setTimeout(() => {
          setActiveOrder(prev => {
             if (!prev) return null;
             const nextStatus = statuses[currentIndex + 1];
             if (nextStatus === 'delivering') showToast('Your order is on the way!', 'info');
             if (nextStatus === 'delivered') showToast('Order delivered. Bon appétit!', 'success');
             return { ...prev, status: nextStatus };
          });
        }, 8000); // Slower updates for realism
        return () => clearTimeout(timer);
      }
    }
  }, [activeOrder]);


  // -- RENDER CONTENT BASED ON TAB --
  const renderInnerContent = () => {
    if (activeTab === 'privacy') return <LegalPage type="privacy" />;
    if (activeTab === 'terms') return <LegalPage type="terms" />;
    if (activeTab === 'cookies') return <LegalPage type="cookies" />;

    if (activeTab === 'Track Order') {
        if (!activeOrder) return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-32">
                <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-white/10">
                    <Truck className="w-10 h-10 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No Active Orders</h2>
                <p className="text-gray-400 mb-8">Hungry? Explore our futuristic menu.</p>
                <button onClick={() => setActiveTab('Menu')} className="bg-neon-blue text-black px-6 py-3 rounded font-bold hover:bg-white transition-colors">
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
                            <p className="text-2xl font-bold text-white">
                                {activeOrder.deliveryMethod === 'drone' ? '15 MIN' : '35 MIN'}
                            </p>
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
                                <p className="text-xs text-neon-green font-bold tracking-wider animate-pulse uppercase">
                                    LIVE {activeOrder.deliveryMethod === 'drone' ? 'DRONE' : 'PARTNER'} TRACKING ACTIVE
                                </p>
                            </div>
                        </div>
                        {/* Drone Icon Animation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-red rounded-full shadow-[0_0_20px_#ff003c] animate-ping"></div>
                    </div>

                    {/* Digital Receipt / Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm bg-black/20 p-4 rounded-lg border border-white/5">
                        <div className="space-y-2">
                            <p className="text-gray-500 flex items-center gap-2"><Clock size={12} /> Time Placed</p>
                            <p className="text-white font-mono">{new Date(activeOrder.timestamp).toLocaleTimeString()}</p>
                            
                            <p className="text-gray-500 flex items-center gap-2 mt-2"><User size={12} /> Customer</p>
                            <p className="text-white font-mono">{activeOrder.customerName}</p>
                        </div>
                        <div className="text-right space-y-2">
                             <p className="text-gray-500 flex items-center justify-end gap-2">Delivery Location <MapPin size={12} /></p>
                             <p className="text-white max-w-[200px] ml-auto break-words">{activeOrder.deliveryAddress}</p>

                             <p className="text-gray-500 flex items-center justify-end gap-2 mt-2">Contact <Phone size={12} /></p>
                             <p className="text-white">{activeOrder.contactPhone}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-white border-b border-white/10 pb-2">Order Summary</h3>
                        {activeOrder.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-300">
                                <span>{item.quantity}x {item.name}</span>
                                <span>{(item.price * item.quantity).toFixed(2)} $</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-lg font-bold text-white pt-2">
                            <span>Total Paid</span>
                            <span className="text-neon-green">{activeOrder.total.toFixed(2)} $</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (activeTab === 'Menu') {
        return (
            <div className="pt-32 pb-20 space-y-4 bg-slate-950">
                <MenuSection 
                    title="Sunrise Protocol (Breakfast)" 
                    dishes={DISHES.filter(d => d.category === 'breakfast')} 
                    onAddToCart={handleAddToCart} 
                />
                <MenuSection 
                    title="Sweet & Sips" 
                    dishes={DISHES.filter(d => d.category === 'dessert' || d.category === 'drinks')} 
                    onAddToCart={handleAddToCart} 
                />
                <MenuSection 
                    title="Chef's Signature" 
                    dishes={DISHES.filter(d => d.category === 'main' || d.category === 'starter')} 
                    onAddToCart={handleAddToCart} 
                />
            </div>
        );
    }

    if (activeTab === 'Chefs') {
        return (
            <div className="pt-32 pb-20">
                <ChefGrid 
                    onBookChef={(id) => setBookingModal({ isOpen: true, type: 'chef', chefId: id })} 
                    onViewProfile={(chef) => setSelectedChefProfile(chef)}
                />
            </div>
        );
    }

    if (activeTab === 'Reservations') {
        return (
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
        );
    }

    // Default to Home/Hero
    return (
        <>
            <Hero 
                onBookTable={() => setBookingModal({ isOpen: true, type: 'table' })} 
                onViewMenu={() => { setActiveTab('Menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
            <ChefGrid 
                limit={2}
                onBookChef={(id) => setBookingModal({ isOpen: true, type: 'chef', chefId: id })} 
                onViewProfile={(chef) => setSelectedChefProfile(chef)}
                onViewAll={() => { setActiveTab('Chefs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
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
        {renderInnerContent()}
      </main>

      <Footer 
        onLegalClick={handleLegalClick} 
        onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />

      {/* Global Toast Container */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Modals & Drawers */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        updateQuantity={updateQuantity}
        onClearCart={() => setCart([])}
        onCheckout={handleCheckout}
      />

      <BookingModal 
        isOpen={bookingModal.isOpen}
        type={bookingModal.type}
        initialChefId={bookingModal.chefId}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false, chefId: undefined })}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateQuantity}
        onBookingComplete={handleBookingComplete}
      />

      <ChefProfileModal 
        chef={selectedChefProfile} 
        onClose={() => setSelectedChefProfile(null)}
        onBook={() => {
            const id = selectedChefProfile?.id;
            setSelectedChefProfile(null);
            setBookingModal({ isOpen: true, type: 'chef', chefId: id });
        }}
      />

      <CookieConsent onViewPolicy={() => { setActiveTab('cookies'); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
    </div>
  );
};

export default App;