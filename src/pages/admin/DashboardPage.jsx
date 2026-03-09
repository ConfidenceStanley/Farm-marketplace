import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';
import { LoadingSpinner } from '../../components/common';
import { products, getAllOrders, getAllBuyers, getOrderStats } from '../../data';
import { formatPrice, formatDateTime, getStatusColor, getStatusText } from '../../utils/helpers';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const orderStats = getOrderStats();
      const orders = getAllOrders().slice(0, 5);
      
      setStats({
        totalProducts: products.length,
        totalOrders: orderStats.total,
        totalCustomers: getAllBuyers().length,
        totalRevenue: orderStats.totalRevenue,
        pendingOrders: orderStats.pending,
        confirmedOrders: orderStats.confirmed,
        deliveredOrders: orderStats.delivered
      });
      
      setRecentOrders(orders);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: FaDollarSign,
      color: 'bg-green-500',
      change: '+12.5%',
      isIncrease: true
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: 'bg-blue-500',
      change: '+8.2%',
      isIncrease: true
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FaBox,
      color: 'bg-purple-500',
      change: '+3',
      isIncrease: true
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: FaUsers,
      color: 'bg-orange-500',
      change: '+5',
      isIncrease: true
    }
  ];

  const quickStats = [
    {
      label: 'Pending Orders',
      value: stats.pendingOrders,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: FaClock
    },
    {
      label: 'Confirmed Orders',
      value: stats.confirmedOrders,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: FaCheckCircle
    },
    {
      label: 'Delivered Orders',
      value: stats.deliveredOrders,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: FaCheckCircle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.isIncrease ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.isIncrease ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
            <div className="flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="divide-y">
            {recentOrders.length > 0 ? (
              recentOrders.map(order => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{order.orderNumber}</span>
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{order.userName}</span>
                    <span className="font-semibold text-gray-800">{formatPrice(order.totalAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDateTime(order.createdAt)}</p>
                </Link>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                No orders yet
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Low Stock Alert</h2>
            <Link to="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Manage →
            </Link>
          </div>
          <div className="divide-y">
            {products
              .filter(p => p.stock < 30)
              .slice(0, 5)
              .map(product => (
                <div key={product.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/100x100/22c55e/white?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        product.stock < 10 ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {product.stock} left
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/products/add"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200">
              <FaBox className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Add Product</p>
              <p className="text-sm text-gray-500">Add new product</p>
            </div>
          </Link>
          
          <Link
            to="/admin/orders?status=pending"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="bg-yellow-100 p-3 rounded-lg group-hover:bg-yellow-200">
              <FaClock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Pending Orders</p>
              <p className="text-sm text-gray-500">{stats.pendingOrders} waiting</p>
            </div>
          </Link>
          
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200">
              <FaBox className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Manage Products</p>
              <p className="text-sm text-gray-500">{stats.totalProducts} products</p>
            </div>
          </Link>
          
          <Link
            to="/admin/customers"
            className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
          >
            <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200">
              <FaUsers className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">View Customers</p>
              <p className="text-sm text-gray-500">{stats.totalCustomers} customers</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;