# Farmer's Direct — Full-Stack Agricultural Marketplace

> A farm-to-consumer marketplace with AI pricing, JWT authentication, and MongoDB Atlas cloud database.
> Built for Jain University TD-PCL 2024–25.

---

## How to Run

```bash
cd backend
npm install
node server.js
```

Open **http://localhost:5000** in your browser.

---

## Login Credentials

| Role     | Email                  | Password    |
|----------|------------------------|-------------|
| Admin    | admin@farmersdirect.in | admin123    |
| Farmer   | ravi@farmer.in         | farmer123   |
| Farmer   | lakshmi@farmer.in      | farmer123   |
| Consumer | priya@consumer.in      | consumer123 |

---

## Tech Stack

| Layer      | Technology                  | Purpose                              |
|------------|----------------------------|--------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JS    | UI pages and interactivity           |
| Backend    | Node.js + Express.js       | REST API server                      |
| Database   | MongoDB Atlas (Cloud)      | Persistent data storage              |
| Auth       | JWT + bcrypt               | Secure login and password hashing    |
| AI         | Groq API (Llama 3.3 70B)  | Real-time crop price prediction      |
| Security   | Helmet + CORS + Rate Limit | HTTP headers, cross-origin, throttle |
| Logging    | Morgan                     | HTTP request logging                 |

---

## Project Structure

```
farmers_direct/
│
├── index.html                 ← Landing page (hero, features, products)
├── consumer.html              ← Marketplace (browse, filter, buy)
├── farmer.html                ← Farmer dashboard (add products, view earnings)
├── admin-login.html           ← Login page (Admin / Farmer / Consumer tabs)
├── admin.html                 ← Admin dashboard (manage users, orders)
├── ai-pricing.html            ← AI Price Prediction tool
├── about.html                 ← About the project and team
│
├── css/
│   ├── base.css               ← CSS variables, reset, typography (Inter + Playfair)
│   ├── layout.css             ← Navbar, footer, page grid systems
│   ├── components.css         ← Buttons, cards, badges, forms, modals
│   └── animations.css         ← Scroll reveal, hover effects, transitions
│
├── js/
│   ├── api.js                 ← API client (Auth, Products, Orders, AI wrappers)
│   ├── main.js                ← Navigation, scroll effects, intersection observer
│   ├── ai-pricing.js          ← AI pricing page logic and chart rendering
│   └── mockdata.js            ← Static product data for landing page preview
│
├── backend/
│   ├── .env                   ← Environment secrets (DB URI, JWT key, API key)
│   ├── server.js              ← Express app entry point, middleware, routes
│   ├── seed-data.js           ← Auto-seed script (runs if DB is empty)
│   ├── package.json           ← Node dependencies and scripts
│   │
│   ├── config/
│   │   └── db.js              ← MongoDB Atlas connection logic
│   │
│   ├── middleware/
│   │   └── auth.js            ← JWT verification + role-based access control
│   │
│   ├── models/
│   │   ├── User.js            ← User schema (name, email, role, farm info)
│   │   ├── Product.js         ← Product schema (price, category, trace log)
│   │   └── Order.js           ← Order schema (items, payment, delivery)
│   │
│   └── routes/
│       ├── auth.js            ← POST /register, POST /login, GET /me
│       ├── products.js        ← GET/POST/PUT/DELETE products (role-based)
│       ├── orders.js          ← POST order, GET my orders, update status
│       └── ai.js              ← POST /predict (Groq LLM integration)
│
├── .gitignore                 ← Hides .env and node_modules from git
└── README.md                  ← This file
```

---

## How the App Works

### Frontend → Backend → Database Flow

```
Browser (HTML/JS)
    ↓  fetch('/api/...')
Express Server (server.js)
    ↓  routes → middleware → models
MongoDB Atlas (Cloud Database)
    ↓  returns data
Express Server
    ↓  JSON response
Browser (renders data)
```

### Step-by-Step Flow Example: User Login

1. User enters email + password on `admin-login.html`
2. Frontend JS calls `POST /api/auth/login` with `{email, password}`
3. Express route (`routes/auth.js`) receives the request
4. It queries MongoDB for the user by email
5. bcrypt compares the entered password with the hashed password in DB
6. If valid → generates a JWT token (valid for 7 days)
7. Returns `{token, user}` to the frontend
8. Frontend stores token in `localStorage` and redirects to dashboard

### Step-by-Step Flow Example: AI Price Prediction

1. Farmer enters crop name, location, quantity on `ai-pricing.html`
2. Frontend JS calls `POST /api/ai/predict` with JWT token in header
3. Express route (`routes/ai.js`) verifies the JWT token
4. Backend constructs a prompt and sends it to Groq API (Llama 3.3 70B)
5. Groq returns a structured JSON with predicted prices
6. Backend parses the response and sends clean JSON to frontend
7. Frontend renders the prediction with price ranges and market analysis

---

## API Reference

### Authentication

| Method | Endpoint            | Auth   | Body                            | Response           |
|--------|---------------------|--------|----------------------------------|--------------------|
| POST   | `/api/auth/register`| Public | `{name, email, password, role}` | `{token, user}`    |
| POST   | `/api/auth/login`   | Public | `{email, password}`             | `{token, user}`    |
| GET    | `/api/auth/me`      | Token  | —                                | `{user}`           |

### Products

| Method | Endpoint                 | Auth        | Description              |
|--------|--------------------------|-------------|--------------------------|
| GET    | `/api/products`          | Public      | Browse all active products|
| GET    | `/api/products/:id`      | Public      | Get single product detail|
| POST   | `/api/products`          | Farmer only | Create new listing       |
| PUT    | `/api/products/:id`      | Farmer only | Update own listing       |
| DELETE | `/api/products/:id`      | Farmer/Admin| Remove listing           |
| GET    | `/api/products/farmer/mine`| Farmer    | Get my listings          |

**Query Filters:** `?category=Vegetables&minPrice=50&maxPrice=200&sort=price_asc&search=tomato`

### Orders

| Method | Endpoint                  | Auth        | Description              |
|--------|---------------------------|-------------|--------------------------|
| POST   | `/api/orders`             | Consumer    | Place a new order        |
| GET    | `/api/orders/mine`        | Auth        | Get my orders            |
| PUT    | `/api/orders/:id/status`  | Farmer/Admin| Update order status      |
| GET    | `/api/orders/all`         | Admin only  | View all platform orders |

### AI & Stats

| Method | Endpoint            | Auth  | Description                     |
|--------|---------------------|-------|---------------------------------|
| POST   | `/api/ai/predict`   | Token | Get AI crop price prediction    |
| GET    | `/api/stats`        | Public| Platform stats (counts, revenue)|
| GET    | `/api/health`       | Public| Server health check             |

---

## Database Schema

### Users Collection

| Field      | Type    | Description                          |
|------------|---------|--------------------------------------|
| name       | String  | Full name                            |
| email      | String  | Unique email (lowercase)             |
| password   | String  | bcrypt hashed (12 rounds)            |
| role       | Enum    | `farmer` / `consumer` / `admin`      |
| phone      | String  | Phone number                         |
| farmName   | String  | Farm name (farmers only)             |
| location   | String  | City/district                        |
| isVerified | Boolean | Admin-verified farmer status         |

### Products Collection

| Field           | Type     | Description                        |
|-----------------|----------|------------------------------------|
| name            | String   | Product name                       |
| category        | Enum     | Vegetables/Fruits/Greens/Spices/Poultry/Dairy/Grains |
| price           | Number   | Price per unit (₹)                 |
| unit            | String   | kg / dozen / bunch / litre / piece |
| quantity        | Number   | Available stock                    |
| quality         | Enum     | A-Grade / B-Grade / C-Grade / Organic |
| isOrganic       | Boolean  | Organic certification flag         |
| farmer          | ObjectId | Reference to User (farmer)         |
| traceLog        | Array    | Supply chain tracking events       |
| aiSuggestedPrice| Number   | AI-recommended market price        |
| rating          | Number   | Average rating (0-5)               |
| sold            | Number   | Total units sold                   |

### Orders Collection

| Field          | Type     | Description                          |
|----------------|----------|--------------------------------------|
| consumer       | ObjectId | Reference to buyer (User)            |
| farmer         | ObjectId | Reference to seller (User)           |
| items          | Array    | Products with quantity and price      |
| totalAmount    | Number   | Order total (₹)                      |
| platformFee    | Number   | 5% platform commission               |
| farmerPayout   | Number   | Amount farmer receives               |
| status         | Enum     | pending/confirmed/shipped/delivered/cancelled |
| paymentStatus  | Enum     | unpaid/paid/refunded/held            |
| paymentId      | String   | Simulated payment reference          |

---

## Security Features

| Feature                | Implementation                                |
|------------------------|-----------------------------------------------|
| Password Hashing       | bcrypt with 12 salt rounds                    |
| Token Authentication   | JWT with 7-day expiry                         |
| Role-Based Access      | Middleware checks `farmer`/`consumer`/`admin`  |
| HTTP Security Headers  | Helmet.js (XSS, clickjacking protection)       |
| Cross-Origin Policy    | CORS enabled for all origins                   |
| Rate Limiting          | Express-rate-limit (prevents brute force)      |
| Secret Management      | `.env` file excluded from Git via `.gitignore` |
| API Key Protection     | Groq API key stored only on backend            |

---

## View Database in MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and log in
2. Click **"Database"** in the left sidebar
3. Find **Cluster0** → Click **"Browse Collections"**
4. Select **`farmers_direct`** database
5. Click any collection: `users`, `products`, or `orders`
6. Use the filter bar to search (e.g. `{role: "farmer"}`)

---

## Current Database Contents

| Collection | Documents | Examples                               |
|------------|-----------|----------------------------------------|
| users      | 11        | 1 Admin, 5 Farmers, 5 Consumers       |
| products   | 16        | Tomatoes, Mangoes, Saffron, Cardamom   |
| orders     | 8         | Delivered, shipped, confirmed orders   |
| Revenue    | ₹5,130    | Total from paid orders                 |
