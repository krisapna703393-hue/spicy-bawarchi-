export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  prepTime: string; // e.g., "15 mins"
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'cooking' | 'ready' | 'completed' | 'cancelled';
  date: string;
  timestamp: number;
}

export interface PartyBooking {
  id: string;
  customerName: string;
  phoneNumber: string;
  eventType: 'Birthday Party' | 'Anniversary Party' | 'Wedding Function' | 'Engagement Party' | 'Corporate Event' | 'Family Gathering';
  date: string;
  guestCount: number;
  specialRequirements: string;
  timestamp: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  discountCode: string;
  discountText: string;
  imageUrl: string;
  bannerColor: string;
}
