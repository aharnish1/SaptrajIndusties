import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import aboutBg from "../assets/aboutBg.jpeg";
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

  // SEARCH STATES
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] =
    useState('');

  // ============================================
  // DEBOUNCE SEARCH
  // ============================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ============================================
  // FETCH PROJECTS + CATEGORIES
  // ============================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // FETCH PROJECTS
        const projectsResponse =
          await projectsAPI.getAll({
            category:
              selectedCategory !== 'all'
                ? selectedCategory
                : undefined,

            search:
              debouncedSearch || undefined,

            limit: 50
          });

        // FETCH CATEGORIES
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

        // HANDLE RESPONSE
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

  }, [selectedCategory, debouncedSearch]);

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

    return date.toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long'
      }
    );
  };

  // ============================================
  // LOADING
  // ============================================
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-deep-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>

          <p className="text-gray-400">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-deep-black">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // MAIN UI
  // ============================================
  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO */}
      <div
              className="relative py-32 md:py-40 border-b border-[#333] bg-cover bg-center"
              style={{
                backgroundImage: `url(${aboutBg})`,
              }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
      
              <div className="relative container mx-auto px-4 sm:px-6 md:px-12 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
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

        <div className="container mx-auto px-4 sm:px-6 md:px-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* CATEGORY BUTTONS */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">

              <button
                onClick={() =>
                  handleCategoryChange('all')
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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
                    handleCategoryChange(
                      category
                    )
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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
            <div className="relative w-full lg:w-[320px] xl:w-[380px] flex-shrink-0">

              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={
                  handleSearchChange
                }
                className="
                  w-full
                  bg-[#222]
                  text-white
                  pl-11
                  pr-4
                  py-3
                  rounded-xl
                  border
                  border-[#444]
                  focus:border-yellow-500
                  focus:ring-2
                  focus:ring-yellow-500/20
                  focus:outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-500
                  text-sm
                "
              />

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <section className="py-20 md:py-24 bg-deep-black">

        <div className="container mx-auto px-4 sm:px-6 md:px-12">

          {projects.length === 0 ? (

            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No projects found.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

              {projects.map(
                (project, index) => (
                  <motion.div
                    key={
                      project._id ||
                      project.id
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
                      delay:
                        index * 0.1
                    }}
                  >
                    <Card>

                      {/* IMAGE */}
                      <div className="aspect-video bg-[#111] mb-6 flex items-center justify-center border border-[#222] overflow-hidden relative rounded-lg">

                        {project.image ? (
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/${project.image}`}
                            alt={
                              project.title
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-600 font-mono text-xs uppercase">
                            [PROJECT IMAGE]
                          </div>
                        )}

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
                      <h3 className="text-xl font-heading font-bold text-white mb-2 break-words">
                        {project.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {
                          project.description
                        }
                      </p>

                      <div className="space-y-3">

                        {/* CLIENT */}
                        <div className="flex items-center gap-2 text-sm">

                          <Building2
                            size={16}
                            className="text-gray-500"
                          />

                          <span className="text-gray-300">
                            {
                              project.client
                            }
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
                              {
                                project.location
                              }
                            </span>
                          </div>
                        )}

                        {/* TECHNOLOGIES */}
                        {project.technologies &&
                          project
                            .technologies
                            .length >
                            0 && (

                            <div className="flex flex-wrap gap-2">

                              {project.technologies
                                .slice(
                                  0,
                                  3
                                )
                                .map(
                                  (
                                    tech,
                                    i
                                  ) => (
                                    <span
                                      key={
                                        i
                                      }
                                      className="text-xs bg-[#333] text-gray-300 px-2 py-1 rounded"
                                    >
                                      {
                                        tech
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          )}

                        {/* STATUS */}
                        <div className="flex items-center justify-between flex-wrap gap-3">

                          <span
                            className={`text-xs px-2 py-1 rounded ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {
                              project.status
                            }
                          </span>

                          <div className="flex items-center gap-1 text-xs text-gray-400">

                            <Clock
                              size={12}
                            />

                            {formatDate(
                              project.completionDate
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;