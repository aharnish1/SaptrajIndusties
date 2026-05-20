import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Star
} from 'lucide-react';

import { projectsAPI } from '../services/api';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    client: '',
    description: '',
    technologies: [],
    location: '',
    completionDate: '',
    status: 'Active',
    featured: false
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsAPI.getAll({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchTerm || undefined,
        limit: 100
      });
      const projectsData = response?.data?.data || response?.data || [];
      setProjects(Array.isArray(projectsData) ? projectsData : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await projectsAPI.getCategories();
      const categoriesData = response?.data?.data || response?.data || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchProjects]);

  const handleAddProject = async (imageFile = null) => {
    try {
      setError(null);
      if (!formData.title || !formData.category || !formData.client) {
        setError('Title, category, and client are required');
        return;
      }
      await projectsAPI.create({
        title: formData.title,
        category: formData.category,
        client: formData.client,
        description: formData.description || '',
        technologies: formData.technologies || [],
        location: formData.location || '',
        completionDate: formData.completionDate || '',
        status: formData.status || 'Active',
        featured: formData.featured || false
      }, imageFile);
      await fetchProjects();
      setShowAddModal(false);
      setFormData({
        title: '',
        category: '',
        client: '',
        description: '',
        technologies: [],
        location: '',
        completionDate: '',
        status: 'Active',
        featured: false
      });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add project');
    }
  };

  const handleEditProject = async (imageFile = null) => {
    try {
      setError(null);
      if (!selectedProject) return;
      await projectsAPI.update(
        selectedProject._id || selectedProject.id,
        formData,
        imageFile
      );
      await fetchProjects();
      setShowEditModal(false);
      setSelectedProject(null);
      setFormData({
        title: '',
        category: '',
        client: '',
        description: '',
        technologies: [],
        location: '',
        completionDate: '',
        status: 'Active',
        featured: false
      });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }
    try {
      setError(null);
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete project');
    }
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title || '',
      category: project.category || '',
      client: project.client || '',
      description: project.description || '',
      technologies: project.technologies || [],
      location: project.location || '',
      completionDate: project.completionDate || '',
      status: project.status || 'Active',
      featured: project.featured || false
    });
    setShowEditModal(true);
  };

  const getStatusColor = (status = '') => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'in progress':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'on hold':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-industrial-yellow" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}
        <button onClick={fetchProjects} className="ml-4 text-industrial-yellow hover:text-white transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold steel-heading" data-text="Projects Management">
            Projects Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your project portfolio ({projects.length} projects)
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-industrial-yellow text-deep-black px-4 py-2 font-bold rounded hover:bg-white transition-colors"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white focus:border-industrial-yellow focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gunmetal-gray border border-[#333] rounded text-white"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gunmetal-gray border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4">Title</th>
              <th className="p-4">Client</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
                <tr
                  key={project._id || project.id}
                  className="border-b border-[#333] hover:bg-[#111] transition-colors"
                >
                  <td className="p-4 text-white font-medium">{project.title}</td>
                  <td className="p-4 text-gray-400">{project.client}</td>
                  <td className="p-4 text-gray-400">{project.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {project.featured && (
                      <Star className="text-industrial-yellow" size={16} fill="currentColor" />
                    )}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => openEditModal(project)} className="text-gray-400 hover:text-industrial-yellow transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteProject(project._id || project.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProjectModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({
            title: '',
            category: '',
            client: '',
            description: '',
            technologies: [],
            location: '',
            completionDate: '',
            status: 'Active',
            featured: false
          });
        }}
        title="Add New Project"
        onSubmit={handleAddProject}
        formData={formData}
        setFormData={setFormData}
      />

      <ProjectModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProject(null);
          setFormData({
            title: '',
            category: '',
            client: '',
            description: '',
            technologies: [],
            location: '',
            completionDate: '',
            status: 'Active',
            featured: false
          });
        }}
        title="Edit Project"
        onSubmit={handleEditProject}
        formData={formData}
        setFormData={setFormData}
        selectedProject={selectedProject}
      />
    </div>
  );
};

export default Projects;