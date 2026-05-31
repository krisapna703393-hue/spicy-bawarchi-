import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  UtensilsCrossed, 
  BellRing,
  Sparkles
} from 'lucide-react';
import { MenuItem, CartItem, Order, PartyBooking, SpecialOffer } from './types';
import { INITIAL_MENU_ITEMS, SPECIAL_OFFERS } from './data';

import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import OrdersView from './components/OrdersView';
import RestaurantInfoView from './components/RestaurantInfoView';
import PartyBookingView from './components/PartyBookingView';
import BottomNav from './components/BottomNav';

export default function App() {
  // Page Routing (Home, Menu, Book Event, Contact, Orders)
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'book-event' | 'contact' | 'orders'>('home');

  // Core Database Collections (Hydrated from localStorage or Default mock list)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [partyBookings, setPartyBookings] = useState<PartyBooking[]>([]);

  // Customer state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  
  // Real-time notification sound trigger simulation
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize DB and state collections securely on load
  useEffect(() => {
    // Menu items
    const savedMenu = localStorage.getItem('sb_menu_items');
    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu));
      } catch (err) {
        setMenuItems(INITIAL_MENU_ITEMS);
      }
    } else {
      setMenuItems(INITIAL_MENU_ITEMS);
    }

    // Offers
    const savedOffers = localStorage.getItem('sb_special_offers');
    if (savedOffers) {
      try {
        setOffers(JSON.parse(savedOffers));
      } catch (err) {
        setOffers(SPECIAL_OFFERS);
      }
    } else {
      setOffers(SPECIAL_OFFERS);
    }

    // Orders
    const savedOrders = localStorage.getItem('sb_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (err) {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }

    // Party Bookings
    const savedBookings = localStorage.getItem('sb_bookings');
    if (savedBookings) {
      try {
        setPartyBookings(JSON.parse(savedBookings));
      } catch (err) {
        setPartyBookings([]);
      }
    } else {
      setPartyBookings([]);
    }

    // Cart
    const savedCart = localStorage.getItem('sb_customer_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch(e){}
    }

    // Favorites
    const savedFavs = localStorage.getItem('sb_customer_favs');
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch(e){}
    }
  }, []);

  const setMenuItemsInLocal = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem('sb_menu_items', JSON.stringify(items));
  };

  const setOrdersInLocal = (items: Order[]) => {
    setOrders(items);
    localStorage.setItem('sb_orders', JSON.stringify(items));
  };

  const setBookingsInLocal = (items: PartyBooking[]) => {
    setPartyBookings(items);
    localStorage.setItem('sb_bookings', JSON.stringify(items));
  };

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // TRIGGER NOTIFICATIONS FOR PREMIUM FEEDBACK
  const triggerNotificationMessage = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, []);

  // -------------------------------------------------------------
  // CART OPERATIONS HANDLERS
  // -------------------------------------------------------------
  const addToCart = useCallback((item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.menuItem.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = prevCart.map((c) =>
          c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        updated = [...prevCart, { menuItem: item, quantity: 1 }];
      }
      localStorage.setItem('sb_customer_cart', JSON.stringify(updated));
      return updated;
    });
    triggerNotificationMessage(`✓ Added ${item.name} to sitting plate!`);
  }, [triggerNotificationMessage]);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((c) => c.menuItem.id !== itemId);
      localStorage.setItem('sb_customer_cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) => {
      const updated = prevCart.map((c) =>
        c.menuItem.id === itemId ? { ...c, quantity: qty } : c
      );
      localStorage.setItem('sb_customer_cart', JSON.stringify(updated));
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('sb_customer_cart');
  }, []);

  // -------------------------------------------------------------
  // GUEST FAVORITES AND VIEW SESSIONS HANDLERS
  // -------------------------------------------------------------
  const toggleFavorite = useCallback((itemId: string) => {
    setFavorites((prevFavs) => {
      const isAlready = prevFavs.includes(itemId);
      let updated: string[];
      if (isAlready) {
        updated = prevFavs.filter((id) => id !== itemId);
        triggerNotificationMessage("Removed recipe from Liked Foods.");
      } else {
        updated = [...prevFavs, itemId];
        triggerNotificationMessage("❤️ Added to favorite delicacies!");
      }
      localStorage.setItem('sb_customer_favs', JSON.stringify(updated));
      return updated;
    });
  }, [triggerNotificationMessage]);

  const isFavorite = useCallback((itemId: string) => {
    return favorites.includes(itemId);
  }, [favorites]);

  const trackRecentView = useCallback((itemId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== itemId);
      return [itemId, ...filtered].slice(0, 8);
    });
  }, []);

  // -------------------------------------------------------------
  // SIMULATOR ADVANCE ORDERS FEEDBACK
  // -------------------------------------------------------------
  const advanceOrderStatus = useCallback((orderId: string) => {
    setOrders((prevOrders) => {
      const updated = prevOrders.map((o) => {
        if (o.id !== orderId) return o;
        
        let newStatus = o.status;
        if (o.status === 'pending') newStatus = 'preparing';
        else if (o.status === 'preparing') newStatus = 'cooking';
        else if (o.status === 'cooking') newStatus = 'ready';
        else if (o.status === 'ready') newStatus = 'completed';

        return { ...o, status: newStatus as any };
      });
      localStorage.setItem('sb_orders', JSON.stringify(updated));
      return updated;
    });
    triggerNotificationMessage("🧪 Sim-Kitchen advanced cooking status!");
  }, [triggerNotificationMessage]);

  // One click reorder past orders
  const handleReorderCuisineList = useCallback((itemsList: CartItem[]) => {
    // Clear normal cart
    clearCart();
    
    // Add all items in list
    itemsList.forEach((ci) => {
      const currentItem = menuItems.find(m => m.id === ci.menuItem.id) || ci.menuItem;
      setCart((prevCart) => {
        const updated = [...prevCart, { menuItem: currentItem, quantity: ci.quantity }];
        localStorage.setItem('sb_customer_cart', JSON.stringify(updated));
        return updated;
      });
    });

    triggerNotificationMessage("✓ One-Click Reorder Hydrated!");
    setSelectedCategory("ALL");
    setActiveTab("menu");
  }, [clearCart, menuItems, triggerNotificationMessage]);

  // -------------------------------------------------------------
  // FLOATING REDIRECTS TRIGGER
  // -------------------------------------------------------------
  const launchCallDirectly = () => {
    window.location.href = "tel:07643097915";
  };

  const launchWhatsAppConversation = () => {
    const text = encodeURIComponent("Hello SPICY BAWARCHI, I am at the table flyover branch, looking forward to details about my order.");
    window.open(`https://wa.me/917643097915?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#FF6B00] selection:text-black font-sans">
      
      {/* 1. TOP PREMIUM LUXURY HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#070707]/80 backdrop-blur-md border-b border-white/5 py-3.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Name */}
          <div 
            onClick={() => {
              setActiveTab('home');
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            id="brand-logo-trigger"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FFC857] flex items-center justify-center border border-white/10 group-hover:rotate-12 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-black font-black" />
            </div>
            <div className="text-left">
              <span className="font-display font-black tracking-tight text-sm md:text-base text-white block leading-none">
                SPICY <span className="text-[#FF6B00]">BAWARCHI</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#FFC857] uppercase block mt-1 leading-none">Forbesganj, Bihar</span>
            </div>
          </div>

          {/* Table sitting Indicator / Live order trigger details */}
          <div className="flex items-center gap-3">
            
            <div className="hidden md:flex items-center gap-1.5 bg-neutral-900 border border-white/5 px-4 py-1.5 rounded-full text-[10px] font-mono text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Flyover Branch sitting</span>
            </div>

            {orders.length > 0 && (
              <button 
                onClick={() => setActiveTab('orders')}
                className="bg-[#FF6B00]/10 text-[#FFC857] border border-[#FF6B00]/25 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#FF6B00]/20 transition-colors cursor-pointer"
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                <span>View Orders ({orders.length})</span>
              </button>
            )}

          </div>

        </div>
      </header>
 
      {/* 2. MAIN ACTIVE ROUTER FRAME */}
      <main className="pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <HomeView 
                menuItems={menuItems}
                setActiveTab={(tab) => {
                  if (tab === 'book-event') setActiveTab('book-event');
                  else setActiveTab(tab as any);
                }}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                openPartyBooking={() => setActiveTab('book-event')}
                onQuickReorder={handleReorderCuisineList}
              />
            )}

            {activeTab === 'menu' && (
              <MenuView 
                menuItems={menuItems}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onCreateOrder={(order) => {
                  setOrdersInLocal([order, ...orders]);
                }}
                recentlyViewed={recentlyViewed}
                trackView={trackRecentView}
                setActiveTab={(tab) => setActiveTab(tab as any)}
              />
            )}

            {activeTab === 'book-event' && (
              <PartyBookingView 
                onSubmitBooking={(booking) => {
                  setBookingsInLocal([booking, ...partyBookings]);
                }}
              />
            )}

            {activeTab === 'contact' && (
              <RestaurantInfoView 
                onOpenBooking={() => setActiveTab('book-event')}
              />
            )}

            {activeTab === 'orders' && (
              <OrdersView 
                orders={orders}
                onAdvanceStatus={advanceOrderStatus}
                setActiveTab={(tab) => {
                  if (tab === 'menu') setActiveTab('menu');
                  else setActiveTab('home');
                }}
                onReorder={handleReorderCuisineList}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. FLOATING ACTION PANEL (Call & WhatsApp helper shortcuts) */}
      <div className="fixed right-4 bottom-28 z-40 flex flex-col gap-3 pointer-events-none">
        
        {/* Call button */}
        <button
          onClick={launchCallDirectly}
          className="w-11 h-11 rounded-full bg-neutral-900 border border-white/10 text-white hover:text-[#FF6B00] shadow-2xl flex items-center justify-center pointer-events-auto hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="Direct Call Hotline"
        >
          <Phone className="w-5 h-5 text-[#FF6B00]" />
        </button>

        {/* Whatsapp chat */}
        <button
          onClick={launchWhatsAppConversation}
          className="w-11 h-11 rounded-full bg-neutral-900 border border-[#FF6B00]/25 text-[#FFC857] shadow-xl flex items-center justify-center pointer-events-auto hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="Instant WhatsApp Support"
        >
          <MessageSquare className="w-5 h-5 text-[#FFC857]" />
        </button>

      </div>

      {/* 4. STATIC CAPULE MOBILE NAV BAR */}
      <BottomNav 
        activeTab={activeTab === 'orders' ? 'home' : (activeTab as any)}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((qty, cur) => qty + cur.quantity, 0)}
      />

      {/* 5. GUEST NOTIFICATIONS BAND */}
      <AnimatePresence>
        {notification && (
          <div className="fixed top-20 inset-x-4 z-50 pointer-events-none flex justify-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-neutral-900/95 text-xs text-[#FFC857] font-bold border border-orange-500/30 py-3 px-6 rounded-2xl shadow-[0_10px_30px_rgba(255,107,0,0.2)] flex items-center gap-2 pointer-events-auto backdrop-blur-md font-mono"
            >
              <BellRing className="w-4 h-4 text-[#FF6B00] animate-bounce" />
              <span>{notification}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
