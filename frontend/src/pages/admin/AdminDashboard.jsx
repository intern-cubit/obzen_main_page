import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  Settings, 
  Star, 
  TrendingUp,
  Activity,
  BarChart3,
  Globe
} from 'lucide-react';
import { productService, serviceService, reviewService } from '../../services/contentService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    reviews: 0,
    activeProducts: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, servicesRes, reviewsRes] = await Promise.all([
        productService.getProductsAdmin(),
        serviceService.getServicesAdmin(),
        reviewService.getReviewsAdmin()
      ]);

      const activeProducts = productsRes.data.filter(p => p.isActive).length;

      setStats({
        products: productsRes.data.length,
        services: servicesRes.data.length,
        reviews: reviewsRes.data.length,
        activeProducts
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Settings,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Reviews',
      value: stats.reviews,
      icon: Star,
      color: 'bg-yellow-500',
      change: '+15%'
    }
  ];

  const recentActivities = [
    { action: 'Updated Hero Section', time: '2 hours ago', type: 'update' },
    { action: 'Added new product', time: '4 hours ago', type: 'create' },
    { action: 'Modified About section', time: '1 day ago', type: 'update' },
    { action: 'New review added', time: '2 days ago', type: 'create' },
    { action: 'Service updated', time: '3 days ago', type: 'update' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to CuBIT Admin Dashboard</h1>
            <p className="text-blue-100">Manage your website content with ease</p>
          </div>
          <Globe className="h-16 w-16 text-blue-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <BarChart3 className="h-5 w-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Package className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-blue-900">Add Product</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Settings className="h-6 w-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-green-900">Add Service</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Star className="h-6 w-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-purple-900">Add Review</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <Users className="h-6 w-6 text-yellow-600 mb-2" />
              <p className="text-sm font-medium text-yellow-900">View Analytics</p>
            </button>
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Website Preview</h3>
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Live Site →
          </a>
        </div>
        <p className="text-gray-600">
          Preview your changes on the live website. All modifications made through this admin panel 
          will be reflected on the public website immediately.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
