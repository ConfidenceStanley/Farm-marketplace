import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTruck,
  FaTimes,
  FaPrint
} from 'react-icons/fa';
import { Button, LoadingSpinner } from '../../components/common';
import { getOrderById, updateOrderStatus } from '../../data';
import { formatPrice, formatDateTime, getStatusColor, getStatusText } from '../../utils/helpers';

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(id);
      setOrder(foundOrder);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (window.confirm(`Change order status to ${getStatusText(newStatus)}?`)) {
      setIsUpdating(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateOrderStatus(order.id, newStatus);
      setOrder(getOrderById(id));
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/orders')}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const orderTimeline = [
    { 
      status: 'pending', 
      label: 'Order Placed', 
      time: order.createdAt,
      completed: true,
      icon: FaCalendarAlt
    },
    { 
      status: 'confirmed', 
      label: 'Order Confirmed', 
      time: order.status === 'confirmed' || order.status === 'delivered' ? order.updatedAt : null,
      completed: order.status === 'confirmed' || order.status === 'delivered',
      icon: FaCheckCircle
    },
    { 
      status: 'delivered', 
      label: 'Delivered', 
      time: order.status === 'delivered' ? order.updatedAt : null,
      completed: order.status === 'delivered',
      icon: FaTruck
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Order {order.orderNumber}
          </h1>
          <p className="text-gray-600 mt-1">
            Placed on {formatDateTime(order.createdAt)}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`badge text-base ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          <button 
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            title="Print Order"
          >
            <FaPrint className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-wrap gap-3">
            {order.status === 'pending' && (
              <>
                <Button
                  onClick={() => handleStatusChange('confirmed')}
                  isLoading={isUpdating}
                  leftIcon={<FaCheckCircle />}
                >
                  Confirm Order
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleStatusChange('cancelled')}
                  isLoading={isUpdating}
                  leftIcon={<FaTimes />}
                >
                  Cancel Order
                </Button>
              </>
            )}
            {order.status === 'confirmed' && (
              <Button
                onClick={() => handleStatusChange('delivered')}
                isLoading={isUpdating}
                leftIcon={<FaTruck />}
              >
                Mark as Delivered
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Timeline */}
          {order.status !== 'cancelled' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Timeline</h2>
              
              <div className="flex justify-between">
                {orderTimeline.map((step, index) => (
                  <div key={step.status} className="flex-1 relative">
                    {/* Connector Line */}
                    {index < orderTimeline.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-1 ${
                        step.completed ? 'bg-primary-600' : 'bg-gray-200'
                      }`} />
                    )}
                    
                    {/* Step */}
                    <div className="relative flex flex-col items-center text-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center z-10
                        ${step.completed 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-200 text-gray-400'
                        }
                      `}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <p className={`mt-2 font-medium text-sm ${
                        step.completed ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDateTime(step.time)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Status */}
          {order.status === 'cancelled' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <FaTimes className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Order Cancelled</h3>
                  <p className="text-red-600 text-sm">This order has been cancelled.</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
            </div>
            
            <div className="divide-y">
              {order.items.map((item, index) => (
                <div key={index} className="p-6 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/100x100/22c55e/white?text=${encodeURIComponent(item.productName)}`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800">{item.productName}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatPrice(item.price)} × {item.quantity} {item.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="px-6 py-4 bg-gray-50 border-t space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{formatPrice(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-600">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Special Instructions</h2>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{order.userName}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${order.userEmail}`} className="text-primary-600 hover:underline">
                    {order.userEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${order.userPhone}`} className="text-primary-600 hover:underline">
                    {order.userPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h2>
            
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">{order.deliveryAddress}</p>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(order.deliveryAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium mt-4"
            >
              Open in Google Maps →
            </a>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-800">Cash on Delivery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  order.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.status === 'delivered' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;