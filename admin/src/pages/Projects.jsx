import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Building2 } from 'lucide-react';
import { getProjects, saveProjects, addProject, updateProject, deleteProject } from '../services/storageService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    completionDate: ''
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = getProjects();
      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    try {
      const success = addProject(formData);
      if (success) {
        fetchProjects();
        setShowAddModal(false);
        setFormData({ name: '', client: '', completionDate: '' });
      } else {
        setError('Failed to add project');
      }
    } catch (err) {
      console.error('Error adding project:', err);
      setError('Failed to add project');
    }
  };

  const handleEditProject = async () => {
    try {
      const success = updateProject(selectedProject.id, formData);
      if (success) {
        fetchProjects();
        setShowEditModal(false);
        setSelectedProject(null);
        setFormData({ name: '', client: '', completionDate: '' });
      } else {
        setError('Failed to update project');
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const success = deleteProject(id);
        if (success) {
          fetchProjects();
        } else {
          setError('Failed to delete project');
        }
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project');
      }
    }
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      client: project.client,
      completionDate: project.completionDate
    });
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Projects Showcase</h1>
          <p className="text-gray-400 mt-2">Manage your past projects and portfolio.</p>
        </div>
        <button className="flex items-center gap-2 bg-industrial-yellow text-deep-black px-4 py-2 font-bold rounded hover:bg-white transition-colors">
          <Plus size={20} /> Add Project
        </button>
      </div>

      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gunmetal-gray border-b border-[#333] text-gray-400 text-sm uppercase tracking-wider">
              <th className="p-4">Project Name</th>
              <th className="p-4">Client</th>
              <th className="p-4">Completion Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                <td className="p-4 text-white font-medium">Industrial Shed Fabrication {item}</td>
                <td className="p-4 text-gray-400">XYZ Corp</td>
                <td className="p-4 text-gray-400">Jan 2026</td>
                <td className="p-4 flex gap-3">
                  <button className="text-gray-400 hover:text-industrial-yellow transition-colors"><Edit size={18} /></button>
                  <button className="text-gray-400 hover:text-laser-red transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
