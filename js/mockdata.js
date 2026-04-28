// === MOCKDATA.JS — Static demo data for Farmer's Direct prototype ===

const PRODUCTS = [
  {
    id: 1,
    name: "Organic Cherry Tomatoes",
    farmer: "Ravi Kumar",
    location: "Tumkur, Karnataka",
    price: 80,
    unit: "kg",
    freshness: "Harvested Today",
    rating: 4.8,
    reviews: 124,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Alphonso Mangoes",
    farmer: "Sunita Patil",
    location: "Ratnagiri, Maharashtra",
    price: 320,
    unit: "dozen",
    freshness: "Harvested Yesterday",
    rating: 4.9,
    reviews: 87,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Fresh Spinach Bunch",
    farmer: "Arjun Reddy",
    location: "Kolar, Karnataka",
    price: 35,
    unit: "bunch",
    freshness: "Harvested Today",
    rating: 4.7,
    reviews: 56,
    category: "Greens",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Desi Eggs (Country Hen)",
    farmer: "Meera Devi",
    location: "Mysore, Karnataka",
    price: 120,
    unit: "12 pcs",
    freshness: "Collected This Morning",
    rating: 4.6,
    reviews: 203,
    category: "Poultry",
    image: "https://images.unsplash.com/photo-1569288061783-5f25f4c1ac23?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Raw Turmeric Root",
    farmer: "Karthik Swamy",
    location: "Erode, Tamil Nadu",
    price: 90,
    unit: "kg",
    freshness: "Harvested 2 Days Ago",
    rating: 4.9,
    reviews: 44,
    category: "Spices",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Pomegranate (Bhagwa)",
    farmer: "Vikram Singh",
    location: "Solapur, Maharashtra",
    price: 150,
    unit: "kg",
    freshness: "Harvested Yesterday",
    rating: 4.8,
    reviews: 91,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop"
  }
];

const FARMERS = [
  {
    id: 1,
    name: "Ravi Kumar",
    location: "Tumkur, Karnataka",
    crops: ["Tomatoes", "Brinjal", "Okra"],
    rating: 4.8,
    joined: "Jan 2025",
    earnings: "₹48,000",
    avatar: "👨‍🌾"
  },
  {
    id: 2,
    name: "Sunita Patil",
    location: "Ratnagiri, Maharashtra",
    crops: ["Mangoes", "Cashews", "Kokum"],
    rating: 4.9,
    joined: "Feb 2025",
    earnings: "₹72,000",
    avatar: "👩‍🌾"
  },
  {
    id: 3,
    name: "Arjun Reddy",
    location: "Kolar, Karnataka",
    crops: ["Spinach", "Coriander", "Fenugreek"],
    rating: 4.7,
    joined: "Jan 2025",
    earnings: "₹29,000",
    avatar: "👨‍🌾"
  },
  {
    id: 4,
    name: "Meera Devi",
    location: "Mysore, Karnataka",
    crops: ["Eggs", "Country Chicken"],
    rating: 4.6,
    joined: "Mar 2025",
    earnings: "₹35,000",
    avatar: "👩‍🌾"
  }
];

const STATS = {
  farmersOnboarded: 1240,
  ordersProcessed: 8400,
  citiesCovered: 14,
  avgIncrease: "28%"
};

const CATEGORIES = ["All", "Vegetables", "Fruits", "Greens", "Spices", "Poultry", "Dairy"];

const ADMIN_USERS = [
  { username: "admin", password: "admin123" }
];

const VERIFICATIONS = [
  { id: 1, name: "Krishna Reddy", location: "Bellary, Karnataka", docs: "Aadhar, Land RTC", date: "Today, 09:15 AM", status: "Pending" },
  { id: 2, name: "Priya Sharma", location: "Pune, Maharashtra", docs: "Aadhar, FPO Cert", date: "Yesterday, 14:30 PM", status: "Pending" },
  { id: 3, name: "Murugan M.", location: "Madurai, Tamil Nadu", docs: "Aadhar, Bank Passbook", date: "Yesterday, 09:00 AM", status: "Pending" }
];

const ORDERS = [
  { id: "#ORD-8901", consumer: "Sunil S.", items: "Organic Tomatoes (5kg)", amount: "₹400", status: "In Transit" },
  { id: "#ORD-8902", consumer: "Leela Palace", items: "Mixed Fruits (20kg)", amount: "₹3,200", status: "Processing" },
  { id: "#ORD-8903", consumer: "Kavya N.", items: "Spinach (2 bunch)", amount: "₹70", status: "Delivered" }
];

const DISPUTES = [
  { id: "#ORD-8832", consumer: "Ramesh K.", issue: "Mangoes damaged in transit", escrow: "₹1,200", status: "Action Required" },
  { id: "#ORD-8815", consumer: "Hotel Grand", issue: "Missing 5kg Spinach", escrow: "₹4,500", status: "Action Required" },
  { id: "#ORD-8790", consumer: "Anjali P.", issue: "Delayed delivery by 2 days", escrow: "₹850", status: "Action Required" }
];

const PAYOUTS = [
  { id: "#PAY-101", farmer: "Sunita Patil", amount: "₹12,400", date: "Today", status: "Cleared" },
  { id: "#PAY-102", farmer: "Arjun Reddy", amount: "₹3,200", date: "Today", status: "Pending Bank" },
  { id: "#PAY-103", farmer: "Meera Devi", amount: "₹8,900", date: "Yesterday", status: "Cleared" }
];
