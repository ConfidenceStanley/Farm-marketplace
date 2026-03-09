import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingBag
} from 'react-icons/fa';
import { LoadingSpinner } from '../../components/common';
import { getAllBuyers, getOrdersByUserId } from '../../data';
import { formatDate, formatPrice } from '../../utils/helpers';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const buyers = getAllBuyers().map(buyer => {
        const orders = getOrdersByUserId(buyer.id);
        const totalSpent = orders.reduce((sum, order) => {
          if (order.status === 'delivered') {
            return sum + order.totalAmount;
          }
          return sum;
        }, 0);

        return {
          ...buyer,
          totalOrders: orders.length,
          totalSpent
        };
      });
      
      setCustomers(buyers);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(searchLower) ||
      customer.lastName.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      (customer.phone && customer.phone.includes(searchTerm))
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Customers</h1>
        <p className="text-gray-600 mt-1">View and manage registered customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <FaUser className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
          <p className="text-sm text-gray-500">Total Customers</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <FaShoppingBag className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <FaUser className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {customers.filter(c => c.totalOrders > 0).length}
          </p>
          <p className="text-sm text-gray-500">Active Customers</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
            <FaCalendarAlt className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {customers.filter(c => {
              const today = new Date();
              const createdDate = new Date(c.createdAt);
              const diffTime = today - createdDate;
              const diffDays = diffTime / (1000 * 60 * 60 * 24);
              return diffDays <= 30;
            }).length}
          </p>
          <p className="text-sm text-gray-500">New This Month</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customers List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Customer Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Spent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCustomers.map(customer => (
                    <tr 
                      key={customer.id} 
                      onClick={() => setSelectedCustomer(customer)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedCustomer?.id === customer.id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {customer.firstName[0]}{customer.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {customer.firstName} {customer.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                              Since {formatDate(customer.createdAt)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{customer.email}</p>
                        <p className="text-sm text-gray-500">{customer.phone || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          customer.totalOrders > 0 ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">
                          {formatPrice(customer.totalSpent)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No customers found</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedCustomer ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">
                    {selectedCustomer.firstName[0]}{selectedCustomer.lastName[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
                </h3>
                <p className="text-gray-500">Customer</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${selectedCustomer.email}`} className="text-primary-600 hover:underline">
                      {selectedCustomer.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800">{selectedCustomer.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-800">{selectedCustomer.address || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-gray-800">{formatDate(selectedCustomer.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-4">Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-primary-600">{selectedCustomer.totalOrders}</p>
                    <p className="text-sm text-gray-500">Orders</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-600">{formatPrice(selectedCustomer.totalSpent)}</p>
                    <p className="text-sm text-gray-500">Total Spent</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/admin/orders?customer=${selectedCustomer.id}`}
                className="btn-primary w-full mt-6 text-center block"
              >
                View Orders
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;