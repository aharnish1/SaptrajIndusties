import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  User,
  Briefcase,
  Eye,
  EyeOff
} from 'lucide-react';

import { teamMembersAPI } from '../services/api';
import TeamMemberModal from '../components/TeamMemberModal';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await teamMembersAPI.getAll();

      const sortedMembers = (response?.data || []).sort(
        (a, b) =>
          (a.order || 0) - (b.order || 0) ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTeamMembers(sortedMembers);
    } catch (err) {
      console.error('Error fetching team members:', err);

      setError('Failed to load team members');
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeamMember = () => {
    setSelectedTeamMember(null);
    setShowAddModal(true);
  };

  const handleEditTeamMember = (teamMember) => {
    setSelectedTeamMember(teamMember);
    setShowEditModal(true);
  };

  const handleDeleteTeamMember = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this team member?'
    );

    if (!confirmDelete) return;

    try {
      await teamMembersAPI.delete(id);

      setTeamMembers((prev) =>
        prev.filter((member) => member._id !== id)
      );
    } catch (err) {
      console.error('Error deleting team member:', err);
      alert('Failed to delete team member');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await teamMembersAPI.toggleStatus(id);

      setTeamMembers((prev) =>
        prev.map((member) =>
          member._id === id
            ? {
                ...member,
                isActive: !member.isActive
              }
            : member
        )
      );
    } catch (err) {
      console.error('Error toggling team member status:', err);
      alert('Failed to toggle team member status');
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedTeamMember(null);

    fetchTeamMembers();
  };

  const handleSaveTeamMember = async (formData) => {
    try {
      console.log('🔍 Admin Team Members Debug - Saving team member with FormData:', formData);
      
      let response;
      if (selectedTeamMember) {
        // Update existing team member
        response = await teamMembersAPI.update(selectedTeamMember._id, formData);
        console.log('🔍 Admin Team Members Debug - Team member updated:', response);
      } else {
        // Create new team member
        response = await teamMembersAPI.create(formData);
        console.log('🔍 Admin Team Members Debug - Team member created:', response);
      }

      // Close modal and refresh data
      handleModalClose();
    } catch (error) {
      console.error('🔍 Admin Team Members Debug - Error saving team member:', error);
      alert(selectedTeamMember ? 'Failed to update team member' : 'Failed to create team member');
    }
  };

  const filteredTeamMembers = teamMembers.filter((member) => {
    return (
      member.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.designation
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-industrial-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold steel-heading" data-text="Team Members">
            Team Members
          </h1>

          <p className="text-gray-400 mt-2">
            Manage leadership and team information
          </p>
        </div>

        <button
          onClick={handleAddTeamMember}
          className="flex items-center gap-2 px-4 py-2 bg-industrial-yellow text-deep-black rounded-lg hover:bg-yellow-400 transition-colors"
        >
          <Plus size={20} />
          Add Team Member
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by name or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-industrial-yellow"
            />
          </div>

          <button
            onClick={fetchTeamMembers}
            className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white hover:bg-[#333] transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                  Member
                </th>

                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                  Designation
                </th>

                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                  Status
                </th>

                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                  Order
                </th>

                <th className="text-left py-4 px-4 text-gray-400 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeamMembers.map((teamMember) => (
                <tr
                  key={teamMember._id}
                  className="border-b border-[#222] hover:bg-[#121212] transition-colors"
                >
                  {/* MEMBER */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {teamMember.image ? (
                        <img
                          src={
                            teamMember.image.startsWith('http')
                              ? teamMember.image
                              : `${import.meta.env.VITE_BACKEND_URL || ''}${teamMember.image}`
                          }
                          alt={teamMember.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#333]"
                          onError={(e) => {
                            e.target.src =
                              'https://ui-avatars.com/api/?name=User';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                          <User
                            size={20}
                            className="text-gray-400"
                          />
                        </div>
                      )}

                      <div>
                        <div className="font-semibold text-white">
                          {teamMember.name}
                        </div>

                        <div className="text-sm text-gray-400">
                          {teamMember.experience ||
                            'No experience listed'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* DESIGNATION */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Briefcase size={15} />
                      {teamMember.designation}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${
                        teamMember.isActive
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}
                    >
                      {teamMember.isActive
                        ? 'Active'
                        : 'Inactive'}
                    </span>
                  </td>

                  {/* ORDER */}
                  <td className="py-4 px-4 text-gray-300">
                    {teamMember.order || 0}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleEditTeamMember(teamMember)
                        }
                        className="text-industrial-yellow hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>

                      {/* TOGGLE */}
                      <button
                        onClick={() =>
                          handleToggleStatus(teamMember._id)
                        }
                        className={`transition-colors ${
                          teamMember.isActive
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-green-400 hover:text-green-300'
                        }`}
                        title={
                          teamMember.isActive
                            ? 'Deactivate'
                            : 'Activate'
                        }
                      >
                        {teamMember.isActive ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDeleteTeamMember(
                            teamMember._id
                          )
                        }
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY */}
          {filteredTeamMembers.length === 0 && !loading && (
            <div className="text-center py-12">
              <Filter
                size={48}
                className="mx-auto mb-4 text-gray-500"
              />

              <h3 className="text-lg text-white mb-2">
                No Team Members Found
              </h3>

              <p className="text-gray-400">
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <TeamMemberModal
          isOpen={showAddModal}
          onClose={handleModalClose}
          onSave={handleSaveTeamMember}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <TeamMemberModal
          isOpen={showEditModal}
          onClose={handleModalClose}
          onSave={handleSaveTeamMember}
          teamMember={selectedTeamMember}
        />
      )}
    </div>
  );
};

export default TeamMembers;
