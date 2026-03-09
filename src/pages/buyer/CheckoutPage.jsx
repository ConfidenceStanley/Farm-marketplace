import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaUser,
  FaStickyNote,
  FaArrowLeft,
  FaCheck,
  FaShoppingBag
} from 'react-icons/fa';
import { Button, Input, EmptyState } from '../../components/common';
import { useCart, useAuth } from '../../context';
import { addOrder } from '../../data';
import { formatPrice, isValidPhone } from '../../utils/helpers';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    subtotal, 
    deliveryFee, 
    totalAmount,
    clearCart 
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create order
    const orderData = {
      userId: user.id,
      userName: `${formData.firstName} ${formData.lastName}`,
      userEmail: formData.email,
      userPhone: formData.phone,
      deliveryAddress: formData.address,
      items: cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        unit: item.unit,
        image: item.image
      })),
      subtotal,
      deliveryFee,
      totalAmount,
      status: 'pending',
      paymentMethod: 'cash_on_delivery',
      notes: formData.notes
    };

    const newOrder = addOrder(orderData);
    setOrderNumber(newOrder.orderNumber);
    setOrderPlaced(true);
    clearCart();
    setIsLoading(false);
  };

  // Empty cart check
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-12">
          <EmptyState
            icon={<FaShoppingBag className="w-20 h-20" />}
            title="Your cart is empty"
            description="Add some products to your cart before checking out."
            actionLabel="Start Shopping"
            onAction={() => navigate('/products')}
          />
        </div>
      </div>
    );
  }

  // Order Success
  if (orderPlaced) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We'll start processing it right away.
              </p>

              {/* Order Number */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-xl font-bold text-primary-600">{orderNumber}</p>
              </div>

              {/* Info */}
              <div className="text-left bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>What happens next?</strong>
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Our admin will confirm your order shortly</li>
                  <li>• You'll receive updates on your order status</li>
                  <li>• Payment is on delivery (Cash on Delivery)</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/orders')}
                  fullWidth
                >
                  View My Orders
                </Button>
                <Button
                  onClick={() => navigate('/products')}
                  variant="outline"
                  fullWidth
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-600 mt-1">Complete your order details</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary-600" />
                  Delivery Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    leftIcon={<FaUser className="w-4 h-4" />}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    leftIcon={<FaUser className="w-4 h-4" />}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    leftIcon={<FaEnvelope className="w-4 h-4" />}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    placeholder="08012345678"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    leftIcon={<FaPhone className="w-4 h-4" />}
                  />
                </div>

                <div className="mt-4">
                  <label className="label">Delivery Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-3 text-gray-400">
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </div>
                    <textarea
                      name="address"
                      placeholder="Enter your full delivery address (street, city, state)"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className={`input-field pl-12 resize-none ${errors.address ? 'input-error' : ''}`}
                    />
                  </div>
                  {errors.address && (
                    <p className="error-text">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaStickyNote className="text-primary-600" />
                  Additional Notes (Optional)
                </h2>

                <textarea
                  name="notes"
                  placeholder="Any special instructions for delivery? (e.g., Call before delivery, Leave at gate)"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h2>
                
                <div className="border-2 border-primary-600 rounded-lg p-4 bg-primary-50">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked
                      readOnly
                      className="w-5 h-5 text-primary-600"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Back & Submit (Mobile) */}
              <div className="lg:hidden space-y-3">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isLoading}
                >
                  Place Order - {formatPrice(totalAmount)}
                </Button>
                <Link 
                  to="/cart"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 font-medium"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Cart
                </Link>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/100x100/22c55e/white?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              </div>

              <div className="flex justify-between py-4 border-t mt-4">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(totalAmount)}</span>
              </div>

              {/* Submit Button (Desktop) */}
              <div className="hidden lg:block mt-6">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Place Order
                </Button>
                <Link 
                  to="/cart"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 font-medium mt-4"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;