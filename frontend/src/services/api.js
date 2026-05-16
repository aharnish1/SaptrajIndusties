import axios from 'axios';

// ============================================
// AXIOS INSTANCE
// ============================================

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// BACKEND URL HELPER
// ============================================

export const getBackendUrl = () => import.meta.env.VITE_BACKEND_URL || '';

// ============================================
// REQUEST INTERCEPTOR
// ============================================

API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem('token');

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem('token');

      window.location.href =
        '/login';
    }

    return Promise.reject(error);
  }
);

// ============================================
// PRODUCTS API
// ============================================

export const productsAPI = {

  // OLD METHOD
  getProducts: async (
    params = {}
  ) => {

    try {

      const response =
        await API.get(
          '/products',
          { params }
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch products'
      );
    }
  },

  // NEW COMPATIBILITY METHOD
  getAll: async (
    params = {}
  ) => {

    return await productsAPI.getProducts(
      params
    );
  },

  getProductById: async (id) => {

    try {

      const response =
        await API.get(
          `/products/${id}`
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch product'
      );
    }
  },

  // NEW COMPATIBILITY METHOD
  getById: async (id) => {

    return await productsAPI.getProductById(
      id
    );
  },

  getCategories: async () => {

    try {

      const response =
        await API.get(
          '/products/categories'
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch categories'
      );
    }
  },
};

// ============================================
// PROJECTS API
// ============================================

export const projectsAPI = {

  // ORIGINAL METHOD
  getProjects: async (
    params = {}
  ) => {

    try {

      const response =
        await API.get(
          '/projects',
          { params }
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch projects'
      );
    }
  },

  // FIXED METHOD
  getAll: async (
    params = {}
  ) => {

    return await projectsAPI.getProjects(
      params
    );
  },

  // ORIGINAL METHOD
  getProjectById: async (id) => {

    try {

      const response =
        await API.get(
          `/projects/${id}`
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch project'
      );
    }
  },

  // FIXED METHOD
  getById: async (id) => {

    return await projectsAPI.getProjectById(
      id
    );
  },

  // FIXED CATEGORY METHOD
  getCategories: async () => {

    try {

      const response =
        await API.get(
          '/projects/categories'
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch categories'
      );
    }
  },

  // KEEP OLD METHOD
  getIndustries: async () => {

    return await projectsAPI.getCategories();
  },

  // STATS
  getStats: async () => {

    try {

      const response =
        await API.get(
          '/projects/stats'
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch project stats'
      );
    }
  },
};

// ============================================
// INQUIRIES API
// ============================================

export const inquiriesAPI = {
  create: async (inquiryData) => {
    try {
      console.log('Submitting inquiry to API:', inquiryData);
      
      // Check if data is FormData (for file uploads)
      const isFormData = inquiryData instanceof FormData;
      
      const response = await API.post('/inquiries', inquiryData, {
        headers: isFormData ? {
          'Content-Type': 'multipart/form-data'
        } : {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Inquiry API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Inquiry submission error:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to submit inquiry'
      );
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await API.get('/inquiries', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inquiries');
    }
  },

  getUnread: async () => {
    try {
      const response = await API.get('/inquiries/unread');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch unread inquiries');
    }
  },

  getUnreadCount: async () => {
    try {
      const response = await API.get('/inquiries/unread-count');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch unread count');
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await API.put(`/inquiries/${id}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark inquiry as read');
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await API.put('/inquiries/read-all');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark all inquiries as read');
    }
  },

  delete: async (id) => {
    try {
      const response = await API.delete(`/inquiries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete inquiry');
    }
  },

  // Backward compatibility methods
  createInquiry: async (inquiryData) => {
    return await inquiriesAPI.create(inquiryData);
  },

  submitInquiry: async (inquiryData) => {
    return await inquiriesAPI.create(inquiryData);
  }
};

// ============================================
// CONTACT API
// ============================================

export const contactAPI = {

  submitContact: async (
    contactData
  ) => {

    try {

      const response =
        await API.post(
          '/contact',
          contactData
        );

      return response.data;

    } catch (error) {

      throw new Error(
        error.response?.data?.message ||
        'Failed to submit contact form'
      );
    }
  },
};

// ============================================
// JOBS API
// ============================================

export const jobsAPI = {
  getAll: async (params = '') => {
    try {
      const response = await API.get(`/jobs${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
  },
  apply: async (formData) => {
    try {
      const response = await API.post('/jobs/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit application');
    }
  },
};

// ============================================
// HEALTH CHECK
// ============================================

export const healthCheck = async () => {
  try {
    const response = await API.get('/health', {
      baseURL: import.meta.env.VITE_BACKEND_URL || ''
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Backend is not responding'
    );
  }
};

// ============================================
// LEGACY EXPORTS
// ============================================

export const submitInquiry =
  inquiriesAPI.createInquiry;

export const fetchProducts =
  productsAPI.getProducts;

export const fetchProjects =
  projectsAPI.getProjects;

// ============================================
// DEFAULT EXPORT
// ============================================

export default API;