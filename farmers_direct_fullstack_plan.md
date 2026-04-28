# Farmer's Direct — Full-Stack Production Plan

> **Goal:** Transform the current static HTML/CSS/JS prototype into a fully functional, production-ready marketplace with real authentication, database, payments, blockchain traceability, and AI integration.

---

## 🏗️ Recommended Tech Stack

| Layer | Technology | Why? |
|:---|:---|:---|
| **Frontend** | Next.js 14 (React) | SEO-friendly, SSR, fast performance |
| **Backend** | Node.js + Express.js | JavaScript everywhere, huge ecosystem |
| **Database** | MongoDB Atlas (free tier) | Flexible schemas for products, users, orders |
| **Auth** | JWT + bcrypt | Secure, industry standard |
| **Payments** | Razorpay Route API | Split payments to farmers, UPI support, Indian market |
| **File Storage** | Cloudinary (free tier) | Product image uploads with CDN |
| **AI** | Groq API (already done ✅) | Market price predictions |
| **Blockchain** | Ethereum Sepolia Testnet + Solidity | Product traceability smart contract |
| **Deployment** | Vercel (frontend) + Railway (backend) | Free tiers, easy CI/CD |

---

## 📁 New Project Structure

```
farmers-direct/
├── frontend/                 # Next.js App
│   ├── app/
│   │   ├── page.js          # Landing page
│   │   ├── marketplace/     # Consumer marketplace
│   │   ├── farmer/          # Farmer dashboard
│   │   ├── admin/           # Admin panel
│   │   ├── ai-pricing/      # AI price prediction
│   │   └── auth/            # Login/Register pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # API client, utils
│   └── public/              # Static assets
│
├── backend/                  # Express.js API
│   ├── server.js            # Entry point
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   ├── User.js          # Farmer/Consumer/Admin
│   │   ├── Product.js       # Crop listings
│   │   ├── Order.js         # Transactions
│   │   └── Review.js        # Product reviews
│   ├── routes/
│   │   ├── auth.js          # Register, Login, JWT
│   │   ├── products.js      # CRUD products
│   │   ├── orders.js        # Place/track orders
│   │   ├── payments.js      # Razorpay integration
│   │   └── ai.js            # Groq AI proxy
│   ├── middleware/
│   │   ├── auth.js          # JWT verification
│   │   └── upload.js        # Multer + Cloudinary
│   └── utils/
│       └── blockchain.js    # Web3 + Smart Contract
│
├── contracts/                # Solidity Smart Contracts
│   └── ProductTrace.sol     # Traceability contract
│
└── .env                     # API keys (never commit)
```

---

## 🔧 What You Need to Build (Phase by Phase)

### Phase 1: Backend Foundation (Week 1)
| Task | Details |
|:---|:---|
| Set up Express server | `npm init`, install express, cors, dotenv |
| MongoDB connection | Use Mongoose ORM, connect to MongoDB Atlas |
| User model & auth | Register/Login with bcrypt + JWT tokens |
| Role-based access | 3 roles: `farmer`, `consumer`, `admin` |
| API middleware | JWT auth middleware, error handler |

**You need:**
- Free MongoDB Atlas account → [mongodb.com/atlas](https://mongodb.com/atlas)
- `.env` file with `MONGO_URI`, `JWT_SECRET`

---

### Phase 2: Product & Order APIs (Week 2)
| Task | Details |
|:---|:---|
| Product CRUD | Create/Read/Update/Delete listings (farmer only) |
| Image upload | Multer → Cloudinary upload pipeline |
| Order system | Consumer places order, farmer confirms |
| Order status | Pending → Confirmed → Shipped → Delivered |
| Search & filter | Category, price range, location, rating |

**You need:**
- Free Cloudinary account → [cloudinary.com](https://cloudinary.com)
- `.env` additions: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET`

---

### Phase 3: Payment Integration (Week 3)
| Task | Details |
|:---|:---|
| Razorpay setup | Create Razorpay business account |
| Payment flow | Consumer pays → money held → farmer gets paid on delivery |
| Razorpay Route | Split payments: 95% farmer, 5% platform |
| UPI support | Enable UPI, cards, netbanking |
| Webhooks | Handle payment success/failure events |

**You need:**
- Razorpay Test Account → [razorpay.com](https://razorpay.com)
- `.env` additions: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

---

### Phase 4: Blockchain Traceability (Week 4)
| Task | Details |
|:---|:---|
| Solidity contract | Store: crop name, farmer, timestamp, location, quality |
| Deploy to testnet | Use Sepolia testnet (free ETH from faucets) |
| Web3 integration | Backend writes to blockchain on product creation |
| QR code generation | Each product gets a QR → links to blockchain record |
| Verification page | Consumer scans QR → sees full crop journey |

**You need:**
- MetaMask wallet → [metamask.io](https://metamask.io)
- Alchemy/Infura account (free) → [alchemy.com](https://alchemy.com)
- Sepolia test ETH from faucet
- `.env` additions: `ALCHEMY_API_URL`, `WALLET_PRIVATE_KEY`, `CONTRACT_ADDRESS`

---

### Phase 5: Next.js Frontend (Week 5)
| Task | Details |
|:---|:---|
| Migrate design | Port current premium CSS to Next.js components |
| Auth pages | Login/Register with form validation |
| Marketplace | Dynamic product grid with real API data |
| Farmer dashboard | Real stats, real product management |
| Admin panel | User management, order disputes, payouts |
| AI Pricing | Already built, connect to backend proxy |

---

### Phase 6: Polish & Deploy (Week 6)
| Task | Details |
|:---|:---|
| Testing | Test all flows end-to-end |
| Error handling | Graceful error pages, loading states |
| Mobile optimization | Responsive on all devices |
| Deploy frontend | Vercel (free, auto-deploys from GitHub) |
| Deploy backend | Railway or Render (free tier) |
| Deploy database | MongoDB Atlas (free 512MB cluster) |

---

## 🔑 Accounts You Need to Create (All Free)

| Service | Purpose | URL |
|:---|:---|:---|
| MongoDB Atlas | Database | [mongodb.com/atlas](https://mongodb.com/atlas) |
| Cloudinary | Image hosting | [cloudinary.com](https://cloudinary.com) |
| Razorpay | Payments (test mode) | [razorpay.com](https://razorpay.com) |
| Groq | AI predictions | [console.groq.com](https://console.groq.com) ✅ Done |
| Alchemy | Blockchain node | [alchemy.com](https://alchemy.com) |
| MetaMask | Ethereum wallet | [metamask.io](https://metamask.io) |
| Vercel | Frontend hosting | [vercel.com](https://vercel.com) |
| Railway | Backend hosting | [railway.app](https://railway.app) |

---

## 💰 Cost Estimate

| Item | Cost |
|:---|:---|
| MongoDB Atlas (free tier, 512MB) | **₹0** |
| Cloudinary (free tier, 25GB) | **₹0** |
| Razorpay (test mode) | **₹0** |
| Groq API (free tier) | **₹0** |
| Alchemy (free tier) | **₹0** |
| Sepolia testnet ETH | **₹0** |
| Vercel (hobby plan) | **₹0** |
| Railway (free 500 hrs/mo) | **₹0** |
| **Total** | **₹0** |

> [!TIP]
> Everything runs on free tiers. You only start paying when you go to production scale with real users.

---

## ⚡ Quick Decision: Do You Want to Start?

To begin building, I need you to confirm:

1. **Are you comfortable with Node.js?** (If not, I can use Python Flask instead)
2. **Do you want Next.js frontend?** (Or keep the current static HTML and just add a backend API?)
3. **Do you want real blockchain?** (Or a simulated blockchain log stored in MongoDB?)
4. **Do you want real Razorpay payments?** (Or just a simulated checkout flow?)

Once you confirm, I'll start building Phase 1 immediately.
