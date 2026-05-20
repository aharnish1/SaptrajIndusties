import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Folders,
  MessageSquare,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

import { dashboardAPI, inquiriesAPI } from '../services/api';
import AdminLoader from '../components/AdminLoader';

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: { total: 0, active: 0 },
    projects: { total: 0, completed: 0, inProgress: 0 },
    inquiries: { total: 0, new: 0, thisMonth: 0 },
  });

  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard stats
      const dashboardStats = await dashboardAPI.getStats();

      setStats(
        dashboardStats || {
          products: { total: 0, active: 0 },
          projects: { total: 0, completed: 0 },
          inquiries: { total: 0, new: 0, thisMonth: 0 },
        }
      );

      // Fetch inquiries
      const inquiriesResponse = await inquiriesAPI.getAll({ limit: 5 });

      const inquiriesData = Array.isArray(inquiriesResponse?.data)
        ? inquiriesResponse.data
        : [];

      // Demo fallback
      const demoInquiries = [
        {
          id: 1,
          name: 'ABC Manufacturing',
          company: 'ABC Manufacturing Ltd',
          message: 'Interested in industrial automation solutions',
          date: '2024-05-09',
          status: 'new',
        },
        {
          id: 2,
          name: 'XYZ Corporation',
          company: 'XYZ Corp',
          message: 'Request for quote on CNC machines',
          date: '2024-05-08',
          status: 'in progress',
        },
        {
          id: 3,
          name: 'Tech Solutions',
          company: 'Tech Solutions Inc',
          message: 'Inquiry about custom software development',
          date: '2024-05-07',
          status: 'completed',
        },
      ];

      const finalInquiries =
        inquiriesData.length > 0 ? inquiriesData : demoInquiries;

      setRecentInquiries(finalInquiries.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await fetchDashboardData();
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return 'bg-industrial-yellow/10 text-industrial-yellow border-industrial-yellow/20';

      case 'in progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';

      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';

      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.products?.total || 0,
      icon: Package,
      trend: stats?.products?.growth || 0,
      trendPrefix: stats?.products?.growth >= 0 ? '+' : '',
      subtitle: `${stats?.products?.active || 0} Active`,
      path: '/products',
      clickable: true,
    },
    {
      title: 'Total Projects',
      value: stats?.projects?.total || 0,
      icon: Folders,
      trend: stats?.projects?.growth || 0,
      trendPrefix: stats?.projects?.growth >= 0 ? '+' : '',
      subtitle: `${stats?.projects?.completed || 0} Completed`,
      path: '/projects',
      clickable: true,
    },
    {
      title: 'Total Inquiries',
      value: stats?.inquiries?.total || 0,
      icon: MessageSquare,
      trend: stats?.inquiries?.growth || 0,
      trendPrefix: stats?.inquiries?.growth >= 0 ? '+' : '',
      subtitle: `${stats?.inquiries?.new || 0} New`,
      path: '/inquiries',
      clickable: true,
    },
    {
      title: 'This Month',
      value: stats?.inquiries?.thisMonth || 0,
      icon: TrendingUp,
      trend: stats?.inquiries?.growth || 0,
      trendPrefix: stats?.inquiries?.growth >= 0 ? '+' : '',
      subtitle: 'New inquiries',
      path: '/inquiries',
      clickable: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw
          className="animate-spin text-industrial-yellow"
          size={32}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}

        <button
          onClick={fetchDashboardData}
          className="ml-4 text-industrial-yellow hover:text-white transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {isRefreshing && <AdminLoader />}

      <div
        className={
          isRefreshing
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold steel-heading" data-text="Dashboard Overview">
              Dashboard Overview
            </h1>

            <p className="text-gray-400 mt-2">
              Welcome back to the Saptraj Admin Panel.
            </p>
          </div>

          {/* ONLY REFRESH BUTTON */}
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-industrial-yellow text-deep-black font-bold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-deep-black border-t-transparent rounded-full animate-spin"></div>
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className={`bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6 relative overflow-hidden group transition-all cursor-pointer hover:scale-[1.02] hover:border-industrial-yellow ${
                stat.clickable ? 'hover:shadow-lg' : ''
              }`}
              onClick={() =>
                stat.clickable && handleCardClick(stat.path)
              }
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon
                  size={64}
                  className="text-industrial-yellow"
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-gray-400 font-semibold mb-2">
                  {stat.title}
                </h3>

                <p className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </p>

                <p className="text-sm text-gray-500 mb-2">
                  {stat.subtitle}
                </p>

                <div className={`flex items-center gap-2 text-sm ${stat.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp size={16} />
                  <span>{stat.trendPrefix}{stat.trend}% from last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
          <h2 className="text-xl font-bold steel-heading-sm" data-text="Recent Inquiries">
            Recent Inquiries
          </h2>

          {recentInquiries.length > 0 ? (
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-4 bg-gunmetal-gray rounded border border-[#333]"
                >
                  <div className="flex-1">
                    <h4 className="text-white font-bold">
                      {inquiry.name} - {inquiry.company}
                    </h4>

                    <p className="text-sm text-gray-400 mt-1">
                      {inquiry.message}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {inquiry.date}
                    </p>
                  </div>

                  <div className="flex flex-col items-end ml-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No recent inquiries found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;