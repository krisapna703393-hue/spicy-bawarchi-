import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  HelpCircle, 
  Heart, 
  ShoppingCart, 
  Trash2, 
  User, 
  Hash, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  MessageCircle,
  Clock,
  Navigation,
  ArrowRight,
  Star
} from 'lucide-react';
import { MenuItem, CartItem, Order } from '../types';
import { QUICK_CATEGORIES } from '../data';

interface MenuViewProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onCreateOrder: (order: Order) => void;
  recentlyViewed: string[];
  trackView: (itemId: string) => void;
  setActiveTab: (tab: 'home' | 'menu' | 'orders' | 'profile') => void;
}

export default function MenuView({
  menuItems,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleFavorite,
  isFavorite,
  selectedCategory,
  setSelectedCategory,
  onCreateOrder,
  recentlyViewed,
  trackView,
  setActiveTab
}: MenuViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  
  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [directCheckoutItem, setDirectCheckoutItem] = useState<MenuItem | null>(null);
  const [isOrderPlacedPending, setIsOrderPlacedPending] = useState(false);
  const [placedOrderSummary, setPlacedOrderSummary] = useState<Order | null>(null);

  // Filter and Sort calculation
  const categoriesList = ["ALL", ...QUICK_CATEGORIES.map(c => c.name)];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesVeg = !isVegOnly || item.isVeg;

    return matchesSearch && matchesCategory && matchesVeg;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.isBestSeller ? 1 : -1; // featured
  });

  // Calculate cart metrics
  const cartTotal = cart.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Quick select category from navigation
  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
  };

  // Direct checkout action (Buy Now)
  const handleBuyNow = (item: MenuItem) => {
    setDirectCheckoutItem(item);
    setIsCheckoutOpen(true);
  };

  // Submit Order process
  const handleConfirmOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !tableNumber.trim()) {
      alert("Please provide absolute Name and Table Number to place order.");
      return;
    }

    // Prepare items list depending on normal checkout or "Buy Now" checkout
    let finalItems: CartItem[] = [];
    if (directCheckoutItem) {
      finalItems = [{ menuItem: directCheckoutItem, quantity: 1 }];
    } else {
      finalItems = [...cart];
    }

    if (finalItems.length === 0) {
      alert("No dishes selected.");
      return;
    }

    const totalCalculated = finalItems.reduce((acc, current) => acc + (current.menuItem.price * current.quantity), 0);

    const newOrder: Order = {
      id: "SB-" + Math.floor(100000 + Math.random() * 900000),
      customerName,
      tableNumber,
      items: finalItems,
      totalAmount: totalCalculated,
      status: 'pending',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: Date.now()
    };

    // Save details to profile inside localStorage (automatically syncs)
    localStorage.setItem('sb_saved_customer_name', customerName);
    localStorage.setItem('sb_saved_table_number', tableNumber);

    // Save to global orders array
    onCreateOrder(newOrder);

    // Empty normal cart if normal checkout
    if (!directCheckoutItem) {
      clearCart();
    }

    // Set order placed summaries and show custom luxurious confirmation screen
    setPlacedOrderSummary(newOrder);
    setIsOrderPlacedPending(true);
    setIsCheckoutOpen(false);
    setDirectCheckoutItem(null);
  };

  // Clean form values on initiation
  useEffect(() => {
    const savedName = localStorage.getItem('sb_saved_customer_name') || '';
    const savedTable = localStorage.getItem('sb_saved_table_number') || '';
    if (savedName) setCustomerName(savedName);
    if (savedTable) setTableNumber(savedTable);
  }, [isCheckoutOpen]);

  // Complete redirect to WhatsApp
  const proceedToWhatsappRedirect = () => {
    if (!placedOrderSummary) return;

    const summaryItemsText = placedOrderSummary.items.map(item => {
      return `• ${item.menuItem.name} [x${item.quantity}] - ₹${item.menuItem.price * item.quantity}`;
    }).join("\n");

    const message = `Hello SPICY BAWARCHI,\n\nNew Table Order\n\nCustomer Name:\n${placedOrderSummary.customerName}\n\nTable Number:\n${placedOrderSummary.tableNumber}\n\nOrdered Items:\n${summaryItemsText}\n\nTotal Amount:\n₹${placedOrderSummary.totalAmount}\n\nPlease prepare my order.`;
    
    const prefilledUrl = `https://wa.me/917643097915?text=${encodeURIComponent(message)}`;
    window.open(prefilledUrl, '_blank', 'noopener,noreferrer');
    
    // Close successful dialog
    setIsOrderPlacedPending(false);
    setPlacedOrderSummary(null);
  };

  // Track simple recently viewed
  const itemsMap = new Map(menuItems.map(item => [item.id, item]));
  const trackedItems = recentlyViewed
    .map(id => itemsMap.get(id))
    .filter((item): item is MenuItem => !!item)
    .slice(0, 4);

  return (
    <div className="pb-36 min-h-screen px-4 pt-16 max-w-6xl mx-auto" id="menu-view-root">
      
      {/* Search and Navigation Headers */}
      <div className="mb-8">
        <span className="text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase font-mono">Bawarchi Digital Menu</span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-white mt-1">
          Master Chef Catalog
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Enjoy premium gourmet options cooked live by seasoned Indian bawarchis.
        </p>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="sticky top-0 z-30 pt-2 pb-4 bg-[#0B0B0B]/95 backdrop-blur-md mb-6 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Live Search */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
            <input 
              type="text"
              placeholder="Search dishes (e.g. Butter Naan, Paneer Tikka, Momos...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212]/95 border border-white/15 rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Toggle Veg-Only */}
          <div className="flex items-center justify-between md:col-span-3 bg-[#121212]/95 border border-white/15 px-3.5 py-3 rounded-xl">
            <span className="text-xs font-mono text-gray-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 border border-green-600 bg-green-500/15 rounded-sm flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              </span>
              Veg Only Select
            </span>
            <button 
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer ${isVegOnly ? 'bg-green-600' : 'bg-neutral-800'}`}
            >
              <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${isVegOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          {/* Sort selection drop dropdown */}
          <div className="relative md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#121212]/95 border border-white/15 rounded-xl py-3 px-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] cursor-pointer appearance-none"
            >
              <option value="featured">🔥 Featured & Best Sellers</option>
              <option value="priceAsc">💲 Price: Low to High</option>
              <option value="priceDesc">💹 Price: High to Low</option>
              <option value="rating">⭐ Rated: Top to Bottom</option>
            </select>
          </div>

        </div>

        {/* Categories sliding Pills filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-4">
          {categoriesList.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={index}
                onClick={() => handleCategorySelect(cat)}
                className={`text-[10px] md:text-xs font-bold tracking-wider px-4 py-2 rounded-lg cursor-pointer transition-all uppercase shrink-0 ${
                  isActive 
                    ? 'bg-[#FF6B00] text-black shadow-lg shadow-orange-500/20' 
                    : 'bg-neutral-900 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === "ALL" ? "✨ All Menu" : cat.replace("_", " ")}
              </button>
            );
          })}
        </div>
      </div>

      {/* CATALOG DISPLAY GRID */}
      <h3 className="text-xl font-bold font-display tracking-tight text-white/90 mb-4 flex items-center gap-2">
        <Sparkles className="w-5.5 h-5.5 text-[#FFC857]" />
        <span>
          {selectedCategory === "ALL" ? "Sizzling Gourmet List" : selectedCategory.replace("_", " ")} ({sortedItems.length})
        </span>
      </h3>

      {sortedItems.length === 0 ? (
        <div className="text-center py-20 bg-neutral-950 rounded-2xl border border-white/5 px-6">
          <Trash2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-sm font-bold text-gray-300">No dishes match your specific filters.</p>
          <p className="text-xs text-gray-500 mt-1">Try resetting the veg toggle or searching other words.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setIsVegOnly(false);
            }}
            className="mt-4 bg-[#FF6B00] text-black font-extrabold text-xs px-4 py-2 rounded-lg cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {sortedItems.map((item) => {
            const inCart = cart.find(c => c.menuItem.id === item.id);
            const qty = inCart ? inCart.quantity : 0;

            return (
              <motion.div 
                key={item.id}
                layoutId={`menu-card-${item.id}`}
                onViewportEnter={() => trackView(item.id)}
                className="bg-neutral-900 border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-500/30 hover:shadow-[0_0_25px_rgba(255,107,0,0.12)] transition-all duration-300 lg:hover:-translate-y-1 relative group"
              >
                {/* Badges row top */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5">
                  <span className={`w-3.5 h-3.5 border ${item.isVeg ? 'border-green-600 bg-green-500/10' : 'border-red-600 bg-red-500/10'} flex items-center justify-center rounded-[3px]`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </span>
                  {item.isBestSeller && (
                    <span className="bg-amber-500/20 text-[#FFC857] text-[8px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Heart/Favorite */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-6 right-6 z-10 w-8.5 h-8.5 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:bg-neutral-950 text-white hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Heart className={`w-4.5 h-4.5 ${isFavorite(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                </button>

                {/* Image Section */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative bg-neutral-950">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 border border-white/10 shadow-lg">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-white">{item.rating}</span>
                    <span className="text-[9px] text-gray-400">({item.reviewsCount})</span>
                  </div>

                  {/* Preparation time badge */}
                  <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-mono text-gray-300 border border-white/10">
                    ⏱️ {item.prepTime}
                  </span>
                </div>

                {/* Info Section */}
                <div>
                  <h4 className="text-base font-extrabold text-white group-hover:text-[#FF6B00] transition-colors leading-snug line-clamp-1 mb-1 font-display">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4 line-clamp-2 min-h-[36px]">
                    {item.description}
                  </p>
                </div>

                {/* Price and actions bottom row */}
                <div className="mt-auto border-t border-white/5 pt-3.5">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-gray-500 text-[9px] uppercase font-mono tracking-wider block">Flour/Curry Price</span>
                      <span className="text-base font-extrabold text-[#FFC857]">₹{item.price}</span>
                    </div>
                    
                    {/* Add / Quantity selector */}
                    {qty > 0 ? (
                      <div className="flex items-center gap-2.5 bg-neutral-950 border border-orange-500/20 px-2 py-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#FF6B00] font-black hover:bg-[#1C1C1C] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white font-mono w-4 text-center">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="w-7 h-7 rounded-lg bg-[#FF6B00] text-black font-black flex items-center justify-center hover:bg-orange-500 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(255,107,0,0.15)] select-none"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>ADD DISH</span>
                      </button>
                    )}
                  </div>

                  {/* Buy Now Direct Button */}
                  <button
                    onClick={() => handleBuyNow(item)}
                    className="w-full border border-[#FF6B00]/40 text-xs font-bold tracking-wide py-2 rounded-xl text-[#FFC857] hover:bg-[#FF6B00]/10 hover:border-[#FF6B00] transition-colors cursor-pointer text-center block uppercase"
                  >
                    ⚡ Buy Now (Table Delivery)
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

      {/* RECENTLY VIEWED ITEMS BAND */}
      {trackedItems.length > 0 && (
        <section className="mt-14 pt-8 border-t border-white/5">
          <span className="text-[#FFC857] font-mono text-[10px] tracking-widest uppercase font-extrabold block mb-1">Your Food Journey</span>
          <h3 className="text-lg font-bold font-display text-white mb-4">Recently Viewed Dishes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trackedItems.map(item => (
              <div 
                key={item.id}
                onClick={() => {
                  setSelectedCategory(item.category);
                  setSearchQuery(item.name);
                }}
                className="bg-neutral-900/40 hover:bg-neutral-900 p-3 rounded-xl border border-white/5 flex gap-3 items-center group cursor-pointer transition-colors"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded-lg shrink-0" 
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-[#FF6B00] transition-colors">{item.name}</h4>
                  <span className="text-[10px] font-mono text-[#FFC857]">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STICKY BOTTOM CART DRAWER / PILL */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-24 left-4 right-4 z-40 max-w-md mx-auto pointer-events-none">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-neutral-950 via-gray-900 to-neutral-950 border border-[#FF6B00]/30 shadow-[0_10px_35px_rgba(255,107,0,0.25)] p-4 rounded-2xl flex items-center justify-between pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center border border-[#FF6B00]/25 relative">
                <ShoppingCart className="w-5 h-5 text-[#FF6B00]" />
                <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-black font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider leading-none">Your Selection Total</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-base font-extrabold text-white">₹{cartTotal}</span>
                  <span className="text-gray-500 text-[10px] font-mono">(plus tax free)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCart}
                className="p-2 rounded-xl bg-neutral-800 text-gray-400 hover:text-white border border-white/5 cursor-pointer"
                title="Empty Cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setDirectCheckoutItem(null);
                  setIsCheckoutOpen(true);
                }}
                className="bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer animate-bounce"
              >
                <span>Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* CHECKOUT MODERN BOX MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-md p-6 relative shadow-2xl overflow-y-auto max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              
              <button 
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setDirectCheckoutItem(null);
                }}
                className="absolute top-5 right-5 text-gray-500 hover:text-white p-1 rounded-full cursor-pointer hover:bg-white/5"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-bold font-display text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-5.5 h-5.5 text-[#FFC857]" />
                <span>Gourmet Table Checkout</span>
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-mono">
                Order will be dispatched directly to your physical table numbers.
              </p>

              {/* Order summary listing inside checkout */}
              <div className="bg-neutral-950 border border-white/5 rounded-xl p-4 mb-6">
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2 tracking-widest">Ordered Dishes</span>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {directCheckoutItem ? (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-medium truncate max-w-[200px]">{directCheckoutItem.name} [x1]</span>
                      <span className="text-[#FFC857] font-mono">₹{directCheckoutItem.price}</span>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.menuItem.id} className="flex justify-between items-center text-xs">
                        <span className="text-gray-300 font-medium truncate max-w-[200px]">
                          {item.menuItem.name} <span className="text-gray-500">x{item.quantity}</span>
                        </span>
                        <span className="text-[#FFC857] font-mono">₹{item.menuItem.price * item.quantity}</span>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-white/5 mt-4 pt-3 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-white">Grand Sum Total:</span>
                  <span className="text-lg font-black text-[#FF6B00]">
                    ₹{directCheckoutItem ? directCheckoutItem.price : cartTotal}
                  </span>
                </div>
              </div>

              {/* Form Input Block */}
              <form onSubmit={handleConfirmOrderSubmit} className="space-y-4">
                
                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Aditya Pathak"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-1">
                    Physical Table Number / Sitting Box
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Table 4A or Cabinet C"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                {/* Submitting Button */}
                <button
                  type="submit"
                  className="w-full bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold py-3 rounded-xl transition-all duration-300 text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl mt-6 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Confirm and Place Table Order</span>
                </button>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LUXURY ORDER PLACED SUCCESS OVERLAY (WITH AUTOMATIC WHATSAPP LAUNCHER) */}
      <AnimatePresence>
        {isOrderPlacedPending && placedOrderSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-neutral-900 border border-orange-500/30 rounded-3xl w-full max-w-md p-6 text-center shadow-[0_0_50px_rgba(255,107,0,0.3)]"
            >
              <div className="w-16 h-16 bg-[#FF6B00]/10 border border-[#FF6B00]/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#FF6B00] animate-bounce" />
              </div>

              <h3 className="text-xl md:text-2xl font-black font-display text-white mb-2">Order Structured Successfully!</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                Your order <span className="font-mono text-[#FFC857] font-bold">{placedOrderSummary.id}</span> has been structured inside our system. To legally authorize kitchen preparation, tap below to send validation to Spicy Bawarchi on WhatsApp!
              </p>

              {/* Summary layout */}
              <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 text-left text-xs mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Bill ID:</span>
                  <span className="text-white font-mono font-bold">{placedOrderSummary.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Customer:</span>
                  <span className="text-white font-bold">{placedOrderSummary.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Sitting Table ID:</span>
                  <span className="text-[#FFC857] font-bold">{placedOrderSummary.tableNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-mono">Total sum is:</span>
                  <span className="text-[#FF6B00] font-black">₹{placedOrderSummary.totalAmount}</span>
                </div>
              </div>

              <button
                onClick={proceedToWhatsappRedirect}
                className="w-full bg-[#FF6B00] hover:bg-orange-500 text-black font-black py-3.5 rounded-xl text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_4px_25px_rgba(255,107,0,0.3)] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-black animate-spin" />
                <span>Send WhatsApp Validation</span>
              </button>

              <button 
                onClick={() => {
                  setIsOrderPlacedPending(false);
                  setPlacedOrderSummary(null);
                  setActiveTab("orders");
                }}
                className="text-xs text-gray-500 font-mono hover:text-white mt-4 underline cursor-pointer"
              >
                Track Live Status on App Dashboard
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
