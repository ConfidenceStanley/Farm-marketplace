import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBox, 
  FaEye, 
  FaCheckCircle, 
  FaClock, 
  FaTruck,
  FaTimesCircle 
} from 'react-icons/fa';
import { EmptyState, LoadingSpinner } from '../../components/common';
import { useAuth } from '../../context';
import { getOrdersByUserId } from '../../data';
import { formatPrice, formatDateTime, getStatusColor, getStatusText } from '../../utils/helpers';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const userOrders = getOrdersByUserId(user.id);
      setOrders(userOrders);
      setIsLoading(false);
    }, 500);
  }, [user.id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="w-5 h-5" />;
      case 'confirmed':
        return <FaCheckCircle className="w-5 h-5" />;
      case 'delivered':
        return <FaTruck className="w-5 h-5" />;
      case 'cancelled':
        return <FaTimesCircle className="w-5 h-5" />;
      default:
        return <FaBox className="w-5 h-5" />;
    }
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Status Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { key: 'all', label: 'All Orders' },
              { key: 'pending', label: 'Pending' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'delivered', label: 'Delivered' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedStatus(tab.key)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap
                  ${selectedStatus === tab.key 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {tab.label} ({statusCounts[tab.key]})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={<FaBox className="w-16 h-16" />}
            title={selectedStatus === 'all' ? 'No orders yet' : `No ${selectedStatus} orders`}
            description={
              selectedStatus === 'all' 
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : `You don't have any ${selectedStatus} orders.`
            }
            actionLabel="Start Shopping"
            onAction={() => window.location.href = '/products'}
          />
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDateTime(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{getStatusText(order.status)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/100x100/22c55e/white?text=${encodeURIComponent(item.productName)}`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × {formatPrice(item.price)} / {item.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery Fee</span>
                      <span>{formatPrice(order.deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    {order.notes && (
                      <>
                        <p className="text-sm font-medium text-gray-700 mt-2 mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{order.notes}</p>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/orders/${order.id}`}
                      className="btn-outline btn-sm flex items-center gap-2"
                    >
                      <FaEye className="w-4 h-4" />
                      View Details
                    </Link>
                    {order.status === 'delivered' && (
                      <button className="btn-primary btn-sm">
                        Order Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;