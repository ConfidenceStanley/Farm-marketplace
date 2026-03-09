import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard
} from 'react-icons/fa';
import { LoadingSpinner } from '../../components/common';
import { getOrderById } from '../../data';
import { formatPrice, formatDateTime, getStatusColor, getStatusText } from '../../utils/helpers';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(id);
      setOrder(foundOrder);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/orders')} className="btn-primary">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const orderTimeline = [
    { 
      status: 'pending', 
      label: 'Order Placed', 
      time: order.createdAt,
      completed: true 
    },
    { 
      status: 'confirmed', 
      label: 'Order Confirmed', 
      time: order.status === 'confirmed' || order.status === 'delivered' ? order.updatedAt : null,
      completed: order.status === 'confirmed' || order.status === 'delivered'
    },
    { 
      status: 'delivered', 
      label: 'Delivered', 
      time: order.status === 'delivered' ? order.updatedAt : null,
      completed: order.status === 'delivered'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <button 
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-600 mt-1">
                {formatDateTime(order.createdAt)}
              </p>
            </div>
            <span className={`badge text-base ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Timeline */}
            {order.status !== 'cancelled' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Order Status</h2>
                
                <div className="relative">
                  {orderTimeline.map((step, index) => (
                    <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
                      {/* Timeline Line */}
                      {index < orderTimeline.length - 1 && (
                        <div className={`absolute left-4 top-10 w-0.5 h-full ${
                          step.completed ? 'bg-primary-600' : 'bg-gray-200'
                        }`} style={{ top: '2.5rem' }} />
                      )}
                      
                      {/* Status Icon */}
                      <div className={`
                        relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                        ${step.completed 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-200 text-gray-400'
                        }
                      `}>
                        {step.completed ? '✓' : '○'}
                      </div>
                      
                      {/* Status Info */}
                      <div className="flex-1">
                        <p className={`font-semibold ${
                          step.completed ? 'text-gray-800' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </p>
                        {step.time && (
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDateTime(step.time)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Order Items</h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/100x100/22c55e/white?text=${encodeURIComponent(item.productName)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/products/${item.productId}`}
                        className="font-semibold text-gray-800 hover:text-primary-600 line-clamp-1"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatPrice(item.price)} / {item.unit}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.quantity}
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
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Delivery Information</h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Delivery Address</p>
                    <p className="text-gray-600 mt-1">{order.deliveryAddress}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <FaPhone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Phone Number</p>
                    <p className="text-gray-600 mt-1">{order.userPhone}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <FaEnvelope className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600 mt-1">{order.userEmail}</p>
                  </div>
                </div>

                {order.notes && (
                  <div className="pt-4 border-t">
                    <p className="font-medium text-gray-700 mb-2">Special Instructions</p>
                    <p className="text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t font-bold text-gray-800">
                  <span className="text-lg">Total</span>
                  <span className="text-xl text-primary-600">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium text-gray-800">{formatDateTime(order.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FaCreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium text-gray-800">Cash on Delivery</p>
                  </div>
                </div>
              </div>

              {order.status === 'delivered' && (
                <div className="mt-6">
                  <button className="btn-primary w-full">
                    Order Again
                  </button>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact us if you have any questions about your order.
              </p>
              <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;