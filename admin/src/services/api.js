import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/products', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  },
  create: async (data, imageFile = null) => {
    try {
      let formData;
      
      if (imageFile) {
        // Use FormData for image upload
        formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        if (data.description) formData.append('description', data.description);
        if (data.status) formData.append('status', data.status);
        if (data.specifications) formData.append('specifications', JSON.stringify(data.specifications));
        if (data.images) formData.append('images', JSON.stringify(data.images));
        formData.append('image', imageFile);
        
        const response = await API.post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // Use regular JSON for no image
        const response = await API.post('/products', data);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  },
  update: async (id, data, imageFile = null) => {
    try {
      let formData;
      
      if (imageFile) {
        // Use FormData for image upload
        formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        if (data.description) formData.append('description', data.description);
        if (data.status) formData.append('status', data.status);
        if (data.specifications) formData.append('specifications', JSON.stringify(data.specifications));
        if (data.images) formData.append('images', JSON.stringify(data.images));
        formData.append('image', imageFile);
        
        const response = await API.put(`/products/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // Use regular JSON for no image
        const response = await API.put(`/products/${id}`, data);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  },
  getCategories: async () => {
    try {
      const response = await API.get('/products/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },
};

// Projects API
export const projectsAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/projects', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch projects');
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project');
    }
  },
  create: async (data, imageFile = null) => {
    try {
      let formData;
      
      if (imageFile) {
        // Use FormData for image upload
        formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('client', data.client);
        if (data.description) formData.append('description', data.description);
        if (data.technologies) formData.append('technologies', JSON.stringify(data.technologies));
        if (data.location) formData.append('location', data.location);
        if (data.completionDate) formData.append('completionDate', data.completionDate);
        if (data.status) formData.append('status', data.status);
        if (data.featured !== undefined) formData.append('featured', data.featured);
        if (data.images) formData.append('images', JSON.stringify(data.images));
        formData.append('image', imageFile);
        
        const response = await API.post('/projects', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // Use regular JSON for no image
        const response = await API.post('/projects', data);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create project');
    }
  },
  update: async (id, data, imageFile = null) => {
    try {
      let formData;
      
      if (imageFile) {
        // Use FormData for image upload
        formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('client', data.client);
        if (data.description) formData.append('description', data.description);
        if (data.technologies) formData.append('technologies', JSON.stringify(data.technologies));
        if (data.location) formData.append('location', data.location);
        if (data.completionDate) formData.append('completionDate', data.completionDate);
        if (data.status) formData.append('status', data.status);
        if (data.featured !== undefined) formData.append('featured', data.featured);
        if (data.images) formData.append('images', JSON.stringify(data.images));
        formData.append('image', imageFile);
        
        const response = await API.put(`/projects/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        // Use regular JSON for no image
        const response = await API.put(`/projects/${id}`, data);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update project');
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete project');
    }
  },
  getCategories: async () => {
    try {
      const response = await API.get('/projects/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },
  getStats: async () => {
    try {
      const response = await API.get('/projects/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch project stats');
    }
  },
  getCategories: async () => {
    try {
      const response = await API.get('/projects/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },
};

// Inquiries API
export const inquiriesAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/inquiries', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inquiries');
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/inquiries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inquiry');
    }
  },
  create: async (data) => {
    try {
      const response = await API.post('/inquiries', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create inquiry');
    }
  },
  updateStatus: async (id, status) => {
    try {
      const response = await API.put(`/inquiries/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update inquiry status');
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
  getStats: async () => {
    try {
      const response = await API.get('/inquiries/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inquiry stats');
    }
  },
  // Notification system methods
  getUnread: async () => {
    try {
      console.log('🔍 Frontend API Debug - Making request to /inquiries/unread');
      const response = await API.get('/inquiries/unread');
      console.log('🔍 Frontend API Debug - Full response:', response);
      console.log('🔍 Frontend API Debug - Response data:', response.data);
      console.log('🔍 Frontend API Debug - Response status:', response.status);
      return response.data;
    } catch (error) {
      console.error('🔍 Frontend API Debug - Error:', error);
      console.error('🔍 Frontend API Debug - Error response:', error.response);
      console.error('🔍 Frontend API Debug - Error status:', error.response?.status);
      console.error('🔍 Frontend API Debug - Error message:', error.response?.data?.message);
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
};

// Contact API
export const contactAPI = {
  submit: async (data) => {
    try {
      const response = await API.post('/contact', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit contact');
    }
  },
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/contacts', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contacts');
    }
  },
  updateStatus: async (id, status) => {
    try {
      const response = await API.put(`/contacts/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update contact status');
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete contact');
    }
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    try {
      // Use Promise.allSettled to prevent total failure if one API fails
      const [inquiriesResult, projectsResult, productsResult] = await Promise.allSettled([
        inquiriesAPI.getStats(),
        projectsAPI.getStats(),
        productsAPI.getAll(),
      ]);
      
      // Safely extract data with fallbacks
      const inquiriesStats = inquiriesResult.status === 'fulfilled' ? inquiriesResult.value.data : {
        total: 0,
        new: 0,
        thisMonth: 0
      };
      
      const projectsStats = projectsResult.status === 'fulfilled' ? projectsResult.value.data : {
        total: 0,
        completed: 0,
        inProgress: 0
      };
      
      const productsData = productsResult.status === 'fulfilled' && Array.isArray(productsResult.value.data) 
        ? productsResult.value.data 
        : [];
      
      return {
        inquiries: inquiriesStats,
        projects: projectsStats,
        products: {
          total: productsData.length,
          active: productsData.filter(p => p.status === 'Active').length,
        },
      };
    } catch (error) {
      console.error('Dashboard API error:', error);
      // Return safe fallback data
      return {
        inquiries: { total: 0, new: 0, thisMonth: 0 },
        projects: { total: 0, completed: 0, inProgress: 0 },
        products: { total: 0, active: 0 },
      };
    }
  },
};

// Jobs API
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
  create: async (data) => {
    try {
      console.log("=== AXIOS REQUEST BODY ===");
      console.log("Data being sent to /jobs:", data);
      console.log("experienceRequired in axios data:", data.experienceRequired);
      const response = await API.post('/jobs', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create job');
    }
  },
  update: async (id, data) => {
    try {
      const response = await API.put(`/jobs/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update job');
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete job');
    }
  },
  getStats: async () => {
    try {
      const response = await API.get('/jobs/stats');
      return response.data;
    } catch (error) {
      // Return safe fallback
      return {
        data: { total: 0, active: 0, thisMonth: 0 }
      };
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

// Job Applications API
export const jobApplicationsAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/jobs/applications', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch applications');
    }
  },
  getById: async (id) => {
    try {
      const response = await API.get(`/jobs/applications/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch application');
    }
  },
  updateStatus: async (id, status) => {
    try {
      const response = await API.put(`/jobs/applications/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update application status');
    }
  },
  delete: async (id) => {
    try {
      const response = await API.delete(`/jobs/applications/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete application');
    }
  },
  getStats: async () => {
    try {
      const response = await API.get('/job-applications/stats');
      return response.data;
    } catch (error) {
      // Return safe fallback
      return {
        data: { total: 0, new: 0, thisMonth: 0 }
      };
    }
  },
};

// Health check
// Team Members API
export const teamMembersAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await API.get('/team-members', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch team members');
    }
  },

  getById: async (id) => {
    try {
      const response = await API.get(`/team-members/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch team member');
    }
  },

  create: async (data) => {
    try {
      console.log('🔍 API Service Debug - Creating team member with data:', data);
      
      // Handle FormData for file uploads
      const config = data instanceof FormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : {};
      
      const response = await API.post('/team-members', data, config);
      console.log('🔍 API Service Debug - Team member created response:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔍 API Service Debug - Error creating team member:', error);
      throw new Error(error.response?.data?.message || 'Failed to create team member');
    }
  },

  update: async (id, data) => {
    try {
      console.log('🔍 API Service Debug - Updating team member with data:', data);
      
      // Handle FormData for file uploads
      const config = data instanceof FormData ? {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      } : {};
      
      const response = await API.put(`/team-members/${id}`, data, config);
      console.log('🔍 API Service Debug - Team member updated response:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔍 API Service Debug - Error updating team member:', error);
      throw new Error(error.response?.data?.message || 'Failed to update team member');
    }
  },

  delete: async (id) => {
    try {
      const response = await API.delete(`/team-members/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete team member');
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await API.patch(`/team-members/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to toggle team member status');
    }
  }
};

export const healthCheck = async () => {
  try {
    const response = await API.get('/health', { baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000' });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Backend is not responding');
  }
};

export default API;
