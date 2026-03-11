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
  FaCheckCircle,
  FaChartLine,
  FaDownload
} from 'react-icons/fa';
import { LoadingSpinner } from '../../components/common';
import { 
  RevenueChart, 
  CategoryPieChart, 
  TopProductsChart, 
  OrdersTrendChart,
  OrderStatusChart 
} from '../../components/admin/charts';
import { 
  products, 
  getAllOrders, 
  getAllBuyers, 
  getOrderStats,
  getRevenueData,
  getCategorySalesData,
  getTopProductsData,
  getOrdersTrendData,
  getOrderStatusData,
  getPerformanceMetrics
} from '../../data';
import { formatPrice, formatDateTime, getStatusColor, getStatusText } from '../../utils/helpers';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days');

  // Chart data
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);
  const [ordersTrendData, setOrdersTrendData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

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

      // Load chart data
      setRevenueData(getRevenueData(dateRange === '7days' ? 7 : dateRange === '14days' ? 14 : 30));
      setCategoryData(getCategorySalesData());
      setTopProductsData(getTopProductsData());
      setOrdersTrendData(getOrdersTrendData(14));
      setOrderStatusData(getOrderStatusData());
      setPerformanceMetrics(getPerformanceMetrics());

      setIsLoading(false);
    }, 500);
  }, [dateRange]);

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        
        {/* Date Range Selector */}
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="14days">Last 14 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FaDownload className="w-5 h-5 text-gray-600" />
          </button>
        </div>
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

      {/* Performance Metrics */}
      {performanceMetrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
            <p className="text-primary-100 text-sm">Avg. Order Value</p>
            <p className="text-2xl font-bold">{formatPrice(performanceMetrics.avgOrderValue)}</p>
            <p className={`text-sm mt-1 ${performanceMetrics.avgOrderValueChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {performanceMetrics.avgOrderValueChange >= 0 ? '↑' : '↓'} {Math.abs(performanceMetrics.avgOrderValueChange)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <p className="text-blue-100 text-sm">Conversion Rate</p>
            <p className="text-2xl font-bold">{performanceMetrics.conversionRate}%</p>
            <p className={`text-sm mt-1 ${performanceMetrics.conversionRateChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {performanceMetrics.conversionRateChange >= 0 ? '↑' : '↓'} {Math.abs(performanceMetrics.conversionRateChange)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-purple-100 text-sm">Repeat Customers</p>
            <p className="text-2xl font-bold">{performanceMetrics.repeatCustomerRate}%</p>
            <p className={`text-sm mt-1 ${performanceMetrics.repeatCustomerRateChange >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {performanceMetrics.repeatCustomerRateChange >= 0 ? '↑' : '↓'} {Math.abs(performanceMetrics.repeatCustomerRateChange)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <p className="text-orange-100 text-sm">Avg. Delivery Time</p>
            <p className="text-2xl font-bold">{performanceMetrics.avgDeliveryTime} days</p>
            <p className={`text-sm mt-1 ${performanceMetrics.avgDeliveryTimeChange <= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {performanceMetrics.avgDeliveryTimeChange <= 0 ? '↓' : '↑'} {Math.abs(performanceMetrics.avgDeliveryTimeChange)} days
            </p>
          </div>
        </div>
      )}

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <OrderStatusChart data={orderStatusData} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CategoryPieChart data={categoryData} />
        <TopProductsChart data={topProductsData} />
      </div>

      {/* Orders Trend */}
      <OrdersTrendChart data={ordersTrendData} />

      {/* Recent Orders & Quick Actions */}
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

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/products/add"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
            >
              <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200">
                <FaBox className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Add Product</p>
                <p className="text-xs text-gray-500">Add new product</p>
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
                <p className="text-xs text-gray-500">{stats.pendingOrders} waiting</p>
              </div>
            </Link>
            
            <Link
              to="/admin/products"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
            >
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200">
                <FaChartLine className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Inventory</p>
                <p className="text-xs text-gray-500">{stats.totalProducts} products</p>
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
                <p className="font-semibold text-gray-800">Customers</p>
                <p className="text-xs text-gray-500">{stats.totalCustomers} registered</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Low Stock Alert</h2>
          <Link to="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Manage →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y sm:divide-y-0">
          {products
            .filter(p => p.stock < 30)
            .slice(0, 4)
            .map(product => (
              <div key={product.id} className="p-4 hover:bg-gray-50">
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
                    <p className={`text-sm font-semibold ${
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
  );
};

export default DashboardPage;