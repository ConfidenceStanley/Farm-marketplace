
// Revenue data for the last 7 days
export const getRevenueData = (days = 7) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 15) + 3
    });
  }
  
  return data;
};

// Monthly revenue data
export const getMonthlyRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 500000) + 100000,
    orders: Math.floor(Math.random() * 100) + 20,
    customers: Math.floor(Math.random() * 50) + 10
  }));
};

// Sales by category data
export const getCategorySalesData = () => {
  return [
    { name: 'Vegetables', value: 35, revenue: 245000, color: '#22c55e' },
    { name: 'Fruits', value: 25, revenue: 180000, color: '#f59e0b' },
    { name: 'Grains', value: 15, revenue: 120000, color: '#8b5cf6' },
    { name: 'Tubers', value: 12, revenue: 95000, color: '#f97316' },
    { name: 'Dairy & Eggs', value: 8, revenue: 65000, color: '#06b6d4' },
    { name: 'Livestock', value: 5, revenue: 350000, color: '#ef4444' }
  ];
};

// Top selling products
export const getTopProductsData = () => {
  return [
    { name: 'Fresh Tomatoes', sales: 156, revenue: 390000 },
    { name: 'Fresh Yam', sales: 98, revenue: 490000 },
    { name: 'Farm Fresh Eggs', sales: 87, revenue: 261000 },
    { name: 'Sweet Oranges', sales: 76, revenue: 228000 },
    { name: 'Brown Rice', sales: 45, revenue: 675000 },
    { name: 'Ripe Plantains', sales: 42, revenue: 84000 }
  ];
};

// Order status distribution
export const getOrderStatusData = () => {
  return [
    { name: 'Delivered', value: 65, color: '#22c55e' },
    { name: 'Confirmed', value: 20, color: '#3b82f6' },
    { name: 'Pending', value: 12, color: '#f59e0b' },
    { name: 'Cancelled', value: 3, color: '#ef4444' }
  ];
};

// Orders trend data
export const getOrdersTrendData = (days = 14) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      orders: Math.floor(Math.random() * 12) + 2,
      delivered: Math.floor(Math.random() * 8) + 1,
      pending: Math.floor(Math.random() * 4)
    });
  }
  
  return data;
};

// Customer growth data
export const getCustomerGrowthData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let total = 10;
  
  return months.map(month => {
    const newCustomers = Math.floor(Math.random() * 15) + 5;
    total += newCustomers;
    return {
      month,
      newCustomers,
      totalCustomers: total
    };
  });
};

// Performance metrics
export const getPerformanceMetrics = () => {
  return {
    avgOrderValue: 15500,
    avgOrderValueChange: 12.5,
    conversionRate: 3.2,
    conversionRateChange: 0.8,
    repeatCustomerRate: 28,
    repeatCustomerRateChange: 5.2,
    avgDeliveryTime: 1.5, // days
    avgDeliveryTimeChange: -0.3
  };
};

// Hourly orders distribution
export const getHourlyOrdersData = () => {
  return [
    { hour: '6AM', orders: 2 },
    { hour: '8AM', orders: 5 },
    { hour: '10AM', orders: 12 },
    { hour: '12PM', orders: 18 },
    { hour: '2PM', orders: 15 },
    { hour: '4PM', orders: 20 },
    { hour: '6PM', orders: 25 },
    { hour: '8PM', orders: 18 },
    { hour: '10PM', orders: 8 }
  ];
};