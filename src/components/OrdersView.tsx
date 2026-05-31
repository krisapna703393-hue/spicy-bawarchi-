import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Utensils, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  TrendingUp,
  Flame,
  UserCheck,
  RotateCcw,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Order, CartItem } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onAdvanceStatus?: (orderId: string) => void;
  setActiveTab: (tab: 'home' | 'menu' | 'orders' | 'profile') => void;
  onReorder: (items: any[]) => void;
}

const STATUS_STAGES = [
  { key: 'pending', label: 'Order Logged', desc: 'Validating with master kitchen catalog', color: 'text-amber-500 bg-amber-500/10' },
  { key: 'preparing', label: 'Spices Arranged', desc: 'Prepping fresh herbs, vegetables & cheese', color: 'text-blue-500 bg-blue-500/10' },
  { key: 'cooking', label: 'Tandoor Simmer', desc: 'Skewers placed in 18-hour clay coal vents', color: 'text-orange-500 bg-orange-500/10' },
  { key: 'ready', label: 'Plated Hot', desc: 'Freshly plated, heading with staff to your table', color: 'text-green-500 bg-green-500/10' },
  { key: 'completed', label: 'Served', desc: 'Dining feast currently enjoyed', color: 'text-emerald-400 bg-emerald-500/10' },
];

export default function OrdersView({
  orders,
  onAdvanceStatus,
  setActiveTab,
  onReorder
}: OrdersViewProps) {
  const [activeTabSub, setActiveTabSub] = useState<'current' | 'history'>('current');

  const currentOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
  const pastOrders = orders.filter(o => o.status === 'completed' || o.status === 'cancelled');

  // Trigger quick WhatsApp message validation again if needed
  const handlePingWhatsapp = (order: Order) => {
    const summaryItems = order.items.map(i => `• ${i.menuItem.name} [x${i.quantity}]`).join("\n");
    const message = `Hello SPICY BAWARCHI,\n\nStatus Ping for Table Order ${order.id}\n\nCustomer: ${order.customerName}\nTable No: ${order.tableNumber}\nItems:\n${summaryItems}\n\nPlease check status of kitchen prep. Thanks.`;
    window.open(`https://wa.me/917643097915?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getStatusNumber = (status: string) => {
    if (status === 'pending') return 0;
    if (status === 'preparing') return 1;
    if (status === 'cooking') return 2;
    if (status === 'ready') return 3;
    if (status === 'completed') return 4;
    return 0;
  };

  return (
    <div className="pb-36 min-h-screen px-4 pt-16 max-w-4xl mx-auto text-white" id="orders-view-root">
      
      {/* Page Title */}
      <div className="mb-8">
        <span className="text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase font-mono">Bawarchi Tracking Desk</span>
        <h1 className="text-3xl md:text-5xl font-black font-display text-white mt-1">
          Your Table Orders
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Monitor your culinary preparations dynamically in real-time.
        </p>
      </div>

      {/* Internal Tab switcher */}
      <div className="flex border-b border-white/5 mb-6">
        <button
          onClick={() => setActiveTabSub('current')}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 tracking-wide transition-all uppercase cursor-pointer ${
            activeTabSub === 'current' 
              ? 'border-[#FF6B00] text-[#FF6B00]' 
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          ⏱️ Active Orders ({currentOrders.length})
        </button>
        <button
          onClick={() => setActiveTabSub('history')}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 tracking-wide transition-all uppercase cursor-pointer ${
            activeTabSub === 'history' 
              ? 'border-[#FF6B00] text-[#FF6B00]' 
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          📜 Past Dinings ({pastOrders.length})
        </button>
      </div>

      {activeTabSub === 'current' ? (
        
        // ACTIVE RUNNING PROJECTS (CURRENT)
        <div className="space-y-6">
          {currentOrders.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/60 border border-white/5 rounded-2xl px-6">
              <Utensils className="w-12 h-12 text-[#FF6B00]/40 mx-auto mb-4 animate-bounce" />
              <p className="text-base font-bold text-gray-300">No active kitchen orders right now.</p>
              <p className="text-xs text-gray-500 mt-1">Explore our premium tandoori options and configure a table feast!</p>
              <button
                onClick={() => setActiveTab('menu')}
                className="mt-6 bg-[#FF6B00] hover:bg-orange-500 text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all hover:scale-103 cursor-pointer"
              >
                Open Food Menu
              </button>
            </div>
          ) : (
            currentOrders.map((order) => {
              const currentStep = getStatusNumber(order.status);

              return (
                <div 
                  key={order.id}
                  className="bg-neutral-900 border border-white/5 rounded-2xl p-5 md:p-6 relative hover:border-orange-500/25 transition-all duration-300"
                >
                  {/* Glowing ambient indicator light */}
                  <div className="absolute top-0 right-10 w-24 h-1 bg-[#FF6B00] blur-sm"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black font-display text-white">{order.customerName}</span>
                        <span className="bg-orange-500/10 text-[#FFC857] text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-orange-500/10">
                          {order.tableNumber}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-gray-500 mt-1">
                        Order Key: <strong className="text-gray-400">{order.id}</strong> • Placed on {order.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">Total Valued</span>
                        <span className="text-lg font-black text-[#FF6B00]">₹{order.totalAmount}</span>
                      </div>
                      
                      {/* Interactive Manual Simulator (so they can proceed food state instantly) */}
                      {onAdvanceStatus && (
                        <button
                          onClick={() => onAdvanceStatus(order.id)}
                          className="bg-[#1C1C1C] hover:bg-neutral-800 text-[#FFC857] border border-orange-500/25 px-2.5 py-1.5 rounded-xl text-[9px] font-mono font-bold tracking-wider hover:border-[#FF5B00] transition-colors cursor-pointer"
                          title="Simulate advancing cooking process stage"
                        >
                          🧪 Kitchen Simulator (Advance)
                        </button>
                      )}
                    </div>
                  </div>

                  {/* KITCHEN STATUS PROGRESS CHANNELS (STEPPER) */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-2 font-mono">
                      <span>Chef Stage Status</span>
                      <span className="text-orange-500 font-bold uppercase animate-pulse flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        {STATUS_STAGES[currentStep].label} Cooking
                      </span>
                    </div>

                    {/* Progress bars dynamic visual */}
                    <div className="grid grid-cols-5 gap-1.5 h-2 w-full bg-neutral-950 rounded-full overflow-hidden p-0.5 mb-4">
                      {[...Array(5)].map((_, i) => {
                        let fillClass = "bg-[#1C1C1C]";
                        if (i < currentStep) fillClass = "bg-[#FF6B00]";
                        if (i === currentStep) fillClass = "bg-gradient-to-r from-[#FF6B00] to-[#FFC857] animate-pulse";
                        return (
                          <div key={i} className={`h-full rounded-full transition-all duration-700 ${fillClass}`} />
                        );
                      })}
                    </div>

                    {/* Describe active stage details */}
                    <div className="bg-neutral-950 p-3.5 rounded-xl border border-white/5 flex gap-3.5 items-center">
                      <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/15 text-[#FF6B00] shrink-0">
                        {currentStep === 0 && <Clock className="w-5 h-5 animate-spin" />}
                        {currentStep === 1 && <Sparkles className="w-5 h-5 animate-bounce" />}
                        {currentStep === 2 && <Flame className="w-5 h-5 animate-pulse" />}
                        {currentStep === 3 && <Utensils className="w-5 h-5" />}
                        {currentStep === 4 && <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div className="text-left font-sans">
                        <p className="text-xs font-bold text-white leading-tight">
                          {STATUS_STAGES[currentStep].label} Details:
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {STATUS_STAGES[currentStep].desc}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Disclosures and direct item listing inside tracking element */}
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2.5">Feast Contents</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
                      {order.items.map((cartItem, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-[#141414] py-1.5 px-3 rounded-lg border border-white/5">
                          <span className="truncate max-w-[200px]">{cartItem.menuItem.name}</span>
                          <span className="font-mono text-gray-500 font-semibold">Qty: <span className="text-white font-black">{cartItem.quantity}</span></span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-end gap-3">
                      <button
                        onClick={() => handlePingWhatsapp(order)}
                        className="text-[10px] md:text-xs font-bold bg-neutral-950 hover:bg-neutral-800 text-[#FFC857] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Query Server on WhatsApp</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      ) : (

        // PAST COMPLETED/SPOILT DININGS (HISTORY)
        <div className="space-y-4">
          {pastOrders.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/40 border border-white/5 rounded-2xl px-6">
              <CheckCircle2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-sm font-bold text-gray-300">No past dining records found.</p>
              <p className="text-xs text-gray-500 mt-1">Once our staff serves your physical table orders, they reside here.</p>
            </div>
          ) : (
            pastOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-[#121212]/80 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative group hover:border-[#FF6B00]/25 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">{order.id}</span>
                    <span className="text-[10px] text-gray-500">• {order.date}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      order.status === 'completed' ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'
                    }`}>
                      {order.status === 'completed' ? '✓ Served Successfully' : '💀 Cancelled'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-gray-300 mt-2 line-clamp-1">
                    {order.items.map(i => `${i.menuItem.name} (x${i.quantity})`).join(", ")}
                  </p>
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Sitting Station: <strong className="text-gray-400">{order.tableNumber}</strong>
                  </p>
                </div>

                <div className="flex md:flex-col items-baseline md:items-end justify-between w-full md:w-auto border-t md:border-0 border-white/5 pt-3.5 md:pt-0 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-gray-500 text-[9px] uppercase font-mono block">Grand Total Paid</span>
                    <span className="text-base font-black text-[#FFC857]">₹{order.totalAmount}</span>
                  </div>
                  
                  {/* One-click Recur ordering trigger */}
                  <button
                    onClick={() => onReorder(order.items)}
                    className="mt-2.5 bg-neutral-900 border border-orange-500/20 hover:bg-[#FF6B00] hover:text-black hover:border-transparent text-[#FFC857] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>One-Click Reorder</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
