import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Folders, MessageSquare, TrendingUp, Users, RefreshCw, Bell, X } from 'lucide-react';
import { dashboardAPI, inquiriesAPI } from '../services/api';
import AdminLoader from '../components/AdminLoader';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: { total: 0, active: 0 },
    projects: { total: 0, completed: 0, inProgress: 0 },
    inquiries: { total: 0, new: 0, thisMonth: 0 },
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const notificationRef = useRef(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dashboard stats
      const dashboardStats = await dashboardAPI.getStats();
      setStats(dashboardStats || {
        products: { total: 0, active: 0 },
        projects: { total: 0, completed: 0 },
        inquiries: { total: 0, new: 0, thisMonth: 0 }
      });
      
      // Fetch recent inquiries
      const inquiriesResponse = await inquiriesAPI.getAll({ limit: 5 });
      const inquiriesData = Array.isArray(inquiriesResponse?.data) ? inquiriesResponse.data : [];
      
      // Use demo data if API returns empty
      const demoInquiries = [
        {
          id: 1,
          name: 'ABC Manufacturing',
          company: 'ABC Manufacturing Ltd',
          message: 'Interested in industrial automation solutions',
          date: '2024-05-09',
          status: 'new'
        },
        {
          id: 2,
          name: 'XYZ Corporation',
          company: 'XYZ Corp',
          message: 'Request for quote on CNC machines',
          date: '2024-05-08',
          status: 'in progress'
        },
        {
          id: 3,
          name: 'Tech Solutions',
          company: 'Tech Solutions Inc',
          message: 'Inquiry about custom software development',
          date: '2024-05-07',
          status: 'completed'
        }
      ];
      
      const finalInquiries = inquiriesData.length > 0 ? inquiriesData : demoInquiries;
      setRecentInquiries(finalInquiries.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (path) => {
    // Navigate to the respective page using React Router
    navigate(path);
  };

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statCards = [
    { 
      title: 'Total Products', 
      value: stats?.products?.total || 0, 
      icon: Package, 
      trend: '+12%',
      subtitle: 'Active items',
      path: '/products',
      clickable: true
    },
    { 
      title: 'Total Projects', 
      value: stats?.projects?.total || 0, 
      icon: Folders, 
      trend: '+5%',
      subtitle: `${stats?.projects?.completed || 0} Completed`,
      clickable: true,
      path: '/projects'
    },
    { 
      title: 'Total Inquiries', 
      value: stats?.inquiries?.total || 0, 
      icon: MessageSquare, 
      trend: '+8%',
      subtitle: `${stats?.inquiries?.new || 0} New`,
      clickable: true,
      path: '/inquiries'
    },
    { 
      title: 'This Month', 
      value: stats?.inquiries?.thisMonth || 0, 
      icon: TrendingUp, 
      trend: '+15%',
      subtitle: 'New inquiries',
      clickable: true,
      path: '/inquiries'
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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
      {/* Full-screen loader when refreshing */}
      {isRefreshing && <AdminLoader />}
      
      <div className={isRefreshing ? 'opacity-0 pointer-events-none' : 'opacity-100'}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Dashboard Overview</h1>
            <p className="text-gray-400 mt-2">Welcome back to the Saptraj Admin Panel.</p>
          </div>
          <div className="flex items-center gap-4">
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
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-400 hover:text-white transition-colors"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-laser-red rounded-full shadow-[0_0_5px_#FF2A2A]"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div ref={notificationRef} className="absolute right-0 top-12 w-80 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg shadow-2xl z-50">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-white">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {[
                        { id: 1, text: 'New inquiry received from ABC Manufacturing', time: '2 min ago', read: false },
                        { id: 2, text: 'Product updated successfully', time: '1 hour ago', read: false },
                        { id: 3, text: 'Quote request submitted', time: '3 hours ago', read: true },
                        { id: 4, text: 'Project completed and delivered', time: '1 day ago', read: true },
                        { id: 5, text: 'Settings updated successfully', time: '2 days ago', read: true }
                      ].map((notification) => (
                        <div key={notification.id} className="flex items-start gap-3 p-3 bg-gunmetal-gray rounded border border-[#333] hover:bg-[#222] transition-colors">
                          <div className="flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full ${notification.read ? 'bg-gray-500' : 'bg-industrial-yellow'}`}></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white font-medium">{notification.text}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
           
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div 
            key={stat.title} 
            className={`bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6 relative overflow-hidden group transition-all cursor-pointer hover:scale-[1.02] hover:border-industrial-yellow ${stat.clickable ? 'hover:shadow-lg' : ''}`}
            onClick={() => stat.clickable && handleCardClick(stat.path)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={64} className="text-industrial-yellow" />
            </div>
            <div className="relative z-10">
              <h3 className="text-gray-400 font-semibold mb-2">{stat.title}</h3>
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-2">{stat.subtitle}</p>
              <div className="flex items-center gap-2 text-sm text-green-500">
                <TrendingUp size={16} />
                <span>{stat.trend} from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-[#0A0A0A] rounded-lg border border-gunmetal-gray p-6">
        <h2 className="text-xl font-heading font-bold text-white mb-6 border-b border-[#333] pb-4">Recent Inquiries</h2>
        {recentInquiries.length > 0 ? (
          <div className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gunmetal-gray rounded border border-[#333]">
                <div className="flex-1">
                  <h4 className="text-white font-bold">{inquiry.name} - {inquiry.company}</h4>
                  <p className="text-sm text-gray-400 mt-1">{inquiry.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{inquiry.date}</p>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(inquiry.status)}`}>
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
    </>
  );
};

export default Dashboard;
