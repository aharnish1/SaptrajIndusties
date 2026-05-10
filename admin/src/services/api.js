import axios from 'axios';

// Base API URL - change this to your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
};

// Projects API
export const projectsAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  getIndustries: () => api.get('/projects/industries'),
  getStats: () => Promise.resolve({
    data: {
      total: 6,
      completed: 4,
      inProgress: 2
    }
  }),
};

// Inquiries API
export const inquiriesAPI = {
  getAll: (params = {}) => api.get('/inquiries', { params }),
  getById: (id) => api.get(`/inquiries/${id}`),
  create: (data) => api.post('/inquiries', data),
  updateStatus: (id, status) => api.put(`/inquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/inquiries/${id}`),
  getStats: () => api.get('/inquiries/stats'),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contacts', { params }),
  updateStatus: (id, status) => api.put(`/contacts/${id}/status`, { status }),
  delete: (id) => api.delete(`/contacts/${id}`),
  getStats: () => Promise.resolve({
    data: {
      total: 24,
      new: 5,
      thisMonth: 12
    }
  }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => Promise.all([
    inquiriesAPI.getStats(),
    projectsAPI.getStats(),
    productsAPI.getAll(),
  ]).then(([inquiriesStats, projectsStats, productsResponse]) => ({
    inquiries: inquiriesStats.data,
    projects: projectsStats.data,
    products: {
      total: Array.isArray(productsResponse.data) ? productsResponse.data.length : 0,
      active: Array.isArray(productsResponse.data) ? productsResponse.data.filter(p => p.status === 'Active').length : 0,
    },
  })),
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
