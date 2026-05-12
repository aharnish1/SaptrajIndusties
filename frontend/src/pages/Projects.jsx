import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  Star,
  MapPin,
  Clock
} from 'lucide-react';

import Card from '../components/UI/Card';
import { projectsAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ============================================
  // FETCH PROJECTS + CATEGORIES
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Imported projectsAPI:', projectsAPI);
        console.log(
          'getCategories:',
          projectsAPI?.getCategories
        );
        console.log(
          'typeof:',
          typeof projectsAPI?.getCategories
        );

        // --------------------------------------------
        // FETCH PROJECTS
        // --------------------------------------------
        const projectsResponse = await projectsAPI.getAll({
          category:
            selectedCategory !== 'all'
              ? selectedCategory
              : undefined,
          search: searchTerm || undefined,
          limit: 50
        });

        // --------------------------------------------
        // FETCH CATEGORIES
        // --------------------------------------------
        let categoriesResponse = {
          data: []
        };

        if (
          typeof projectsAPI.getCategories ===
          'function'
        ) {
          categoriesResponse =
            await projectsAPI.getCategories();
        }

        console.log(
          'Projects Response:',
          projectsResponse
        );

        console.log(
          'Categories Response:',
          categoriesResponse
        );

        // --------------------------------------------
        // HANDLE API RESPONSE STRUCTURE
        // --------------------------------------------
        const projectsData =
          projectsResponse?.data?.data ||
          projectsResponse?.data ||
          [];

        const categoriesData =
          categoriesResponse?.data?.data ||
          categoriesResponse?.data ||
          [];

        setProjects(
          Array.isArray(projectsData)
            ? projectsData
            : []
        );

        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : []
        );
      } catch (err) {
        console.error(
          'Error fetching projects:',
          err
        );

        setError(
          err?.response?.data?.message ||
            err.message ||
            'Failed to load projects'
        );

        setProjects([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm]);

  // ============================================
  // HELPERS
  // ============================================
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status = '') => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-900 text-green-300';

      case 'completed':
        return 'bg-blue-900 text-blue-300';

      case 'in progress':
        return 'bg-yellow-900 text-yellow-300';

      case 'on hold':
        return 'bg-red-900 text-red-300';

      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';

    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Projects
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing our excellence in industrial
              fabrication and manufacturing.
            </p>
          </div>
        </div>

        <section className="py-24 bg-deep-black">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse"
                >
                  <div className="bg-[#111] aspect-video rounded-lg mb-6"></div>

                  <div className="h-6 bg-[#111] rounded mb-2"></div>

                  <div className="h-4 bg-[#111] rounded mb-4"></div>

                  <div className="h-4 bg-[#111] rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Projects
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing our excellence in industrial
              fabrication and manufacturing.
            </p>
          </div>
        </div>

        <section className="py-24 bg-deep-black">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-red-500 max-w-md mx-auto">
              {error}

              <button
                onClick={() =>
                  window.location.reload()
                }
                className="mt-4 px-4 py-2 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============================================
  // MAIN UI
  // ============================================
  return (
    <div className="w-full">
      {/* HERO */}
      <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our Projects
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Showcasing our excellence in industrial
            fabrication and manufacturing.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-[#1a1a1a] py-6 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* CATEGORY BUTTONS */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleCategoryChange('all')
                }
                className={`px-4 py-2 rounded transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                }`}
              >
                All Projects
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  className={`px-4 py-2 rounded transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-[#333] text-white px-4 py-2 pr-10 rounded border border-[#444] focus:border-blue-500 focus:outline-none"
              />

              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No projects found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={
                    project._id || project.id
                  }
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                >
                  <Card>
                    {/* IMAGE */}
                    <div className="aspect-video bg-[#111] mb-6 flex items-center justify-center border border-[#222] overflow-hidden relative rounded-lg">
                      {project.image ? (
                        <img
                          src={`${
                            import.meta.env
                              .VITE_BACKEND_URL
                          }/${project.image}`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log(
                              'Project image failed:',
                              project.image
                            );

                            e.target.style.display =
                              'none';

                            if (
                              e.target.nextSibling
                            ) {
                              e.target.nextSibling.style.display =
                                'flex';
                            }
                          }}
                        />
                      ) : null}

                      <div
                        className="text-gray-600 font-mono text-xs uppercase items-center justify-center w-full h-full"
                        style={{
                          display:
                            project.image
                              ? 'none'
                              : 'flex'
                        }}
                      >
                        [PROJECT IMAGE]
                      </div>

                      {/* FEATURED */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-industrial-yellow text-deep-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star
                            size={12}
                            fill="currentColor"
                          />
                          Featured
                        </div>
                      )}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-heading font-bold text-white mb-2">
                      {project.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="space-y-3">
                      {/* CLIENT */}
                      <div className="flex items-center gap-2 text-sm">
                        <Building2
                          size={16}
                          className="text-gray-500"
                        />

                        <span className="text-gray-300">
                          {project.client}
                        </span>
                      </div>

                      {/* LOCATION */}
                      {project.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin
                            size={16}
                            className="text-gray-500"
                          />

                          <span className="text-gray-300">
                            {project.location}
                          </span>
                        </div>
                      )}

                      {/* TECHNOLOGIES */}
                      {project.technologies &&
                        project.technologies
                          .length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies
                              .slice(0, 3)
                              .map(
                                (
                                  tech,
                                  i
                                ) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-[#333] text-gray-300 px-2 py-1 rounded"
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                          </div>
                        )}

                      {/* STATUS + DATE */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>

                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} />

                          {formatDate(
                            project.completionDate
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;