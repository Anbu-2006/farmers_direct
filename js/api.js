// === API.JS — Frontend API Client for Farmer's Direct ===

const API_BASE = '/api';

// Token management
const Auth = {
  getToken: () => localStorage.getItem('fd_token'),
  getUser: () => JSON.parse(localStorage.getItem('fd_user') || 'null'),
  setAuth: (token, user) => {
    localStorage.setItem('fd_token', token);
    localStorage.setItem('fd_user', JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem('fd_token');
    localStorage.removeItem('fd_user');
  },
  isLoggedIn: () => !!localStorage.getItem('fd_token'),
  isRole: (role) => {
    const user = Auth.getUser();
    return user && user.role === role;
  }
};

// Generic fetch wrapper
async function apiFetch(endpoint, options = {}) {
  const token = Auth.getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) { Auth.clear(); }
    throw new Error(data.error || `API Error ${res.status}`);
  }
  return data;
}

// Auth API
const AuthAPI = {
  login: (email, password) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => apiFetch('/auth/me')
};

// Products API
const ProductsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/products${qs ? '?' + qs : ''}`);
  },
  getOne: (id) => apiFetch(`/products/${id}`),
  create: (data) => apiFetch('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/products/${id}`, { method: 'DELETE' }),
  mine: () => apiFetch('/products/farmer/mine')
};

// Orders API
const OrdersAPI = {
  place: (data) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
  mine: () => apiFetch('/orders/mine'),
  updateStatus: (id, status) => apiFetch(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  all: () => apiFetch('/orders/all')
};

// AI API
const AiAPI = {
  predict: (data) => apiFetch('/ai/predict', { method: 'POST', body: JSON.stringify(data) })
};

// Stats API
const StatsAPI = {
  get: () => apiFetch('/stats')
};
