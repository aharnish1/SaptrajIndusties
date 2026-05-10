// Shared Storage Service for Admin Panel and Frontend Synchronization

const STORAGE_KEYS = {
  SETTINGS: 'settingsData',
  PRODUCTS: 'productsData',
  PROJECTS: 'projectsData'
};

// Default data structures
const DEFAULT_SETTINGS = {
  email: 'info@saptraj.com',
  phone: '+91 98765 43210',
  location: 'Pune, Maharashtra, India'
};

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Laser Cut Components',
    category: 'Laser Cutting',
    description: 'High-precision laser cutting components for industrial applications',
    status: 'active'
  },
  {
    id: 2,
    name: 'Industrial Automation Systems',
    category: 'Automation',
    description: 'Complete automation solutions for manufacturing facilities',
    status: 'active'
  }
];

const DEFAULT_PROJECTS = [
  {
    id: 1,
    name: 'Industrial Shed',
    client: 'XYZ Corp',
    completionDate: '2026'
  },
  {
    id: 2,
    name: 'Factory Automation',
    client: 'ABC Manufacturing',
    completionDate: '2026'
  }
];

// Settings functions
export const getSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

// Products functions
export const getProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  } catch (error) {
    console.error('Error loading products:', error);
    return DEFAULT_PRODUCTS;
  }
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error saving products:', error);
    return false;
  }
};

export const addProduct = (product) => {
  try {
    const products = getProducts();
    const newProduct = {
      ...product,
      id: Date.now() // Simple ID generation
    };
    const updatedProducts = [...products, newProduct];
    return saveProducts(updatedProducts);
  } catch (error) {
    console.error('Error adding product:', error);
    return false;
  }
};

export const updateProduct = (id, updatedProduct) => {
  try {
    const products = getProducts();
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    return saveProducts(updatedProducts);
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

export const deleteProduct = (id) => {
  try {
    const products = getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    return saveProducts(updatedProducts);
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Projects functions
export const getProjects = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  } catch (error) {
    console.error('Error loading projects:', error);
    return DEFAULT_PROJECTS;
  }
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error('Error saving projects:', error);
    return false;
  }
};

export const addProject = (project) => {
  try {
    const projects = getProjects();
    const newProject = {
      ...project,
      id: Date.now() // Simple ID generation
    };
    const updatedProjects = [...projects, newProject];
    return saveProjects(updatedProjects);
  } catch (error) {
    console.error('Error adding project:', error);
    return false;
  }
};

export const updateProject = (id, updatedProject) => {
  try {
    const projects = getProjects();
    const updatedProjects = projects.map(project =>
      project.id === id ? { ...project, ...updatedProject } : project
    );
    return saveProjects(updatedProjects);
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
};

export const deleteProject = (id) => {
  try {
    const projects = getProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    return saveProjects(updatedProjects);
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// Utility function to clear all data
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};
