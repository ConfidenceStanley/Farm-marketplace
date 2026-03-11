import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaUser,
  FaStickyNote,
  FaArrowLeft,
  FaShoppingBag,
  FaLock
} from 'react-icons/fa';
import { Button, Input, EmptyState } from '../../components/common';
import PaymentMethodSelector from '../../components/buyer/PaymentMethodSelector';
import CardPaymentForm from '../../components/buyer/CardPaymentForm';
import BankTransferPayment from '../../components/buyer/BankTransferPayment';
import USSDPayment from '../../components/buyer/USSDPayment';
import PaymentProcessing from '../../components/buyer/PaymentProcessing';
import PaymentSuccess from '../../components/buyer/PaymentSuccess';
import PaymentFailed from '../../components/buyer/PaymentFailed';
import { useCart, useAuth } from '../../context';
import { addOrder, processPayment, calculatePaymentFee } from '../../data';
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

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  // Payment State
  const [currentStep, setCurrentStep] = useState(1); // 1: Delivery, 2: Payment
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'failed'
  const [paymentError, setPaymentError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);
  const [completedTransaction, setCompletedTransaction] = useState(null);

  // Calculate fees
  const paymentFee = calculatePaymentFee(totalAmount, selectedPaymentMethod);
  const grandTotal = totalAmount + paymentFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateDeliveryForm = () => {
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

  const handleContinueToPayment = () => {
    if (!validateDeliveryForm()) return;
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleBackToDelivery = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const createOrder = () => {
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
      totalAmount: grandTotal,
      status: 'pending',
      paymentMethod: selectedPaymentMethod,
      paymentFee,
      notes: formData.notes
    };

    return addOrder(orderData);
  };

  const handlePaymentSubmit = async (paymentDetails = {}) => {
    setIsProcessing(true);
    setPaymentError('');

    // Create order first
    const newOrder = createOrder();
    setCompletedOrder(newOrder);

    // Process payment
    const paymentData = {
      amount: grandTotal,
      method: selectedPaymentMethod,
      orderId: newOrder.id,
      ...paymentDetails
    };

    const result = await processPayment(paymentData);

    setIsProcessing(false);

    if (result.success) {
      setCompletedTransaction(result.transaction);
      setPaymentStatus('success');
      clearCart();
    } else {
      setPaymentError(result.error);
      setPaymentStatus('failed');
    }
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setPaymentError('');
    setSelectedPaymentMethod('');
  };

  // Show empty cart message
  if (cartItems.length === 0 && !paymentStatus) {
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

  // Show processing animation
  if (isProcessing) {
    return <PaymentProcessing paymentMethod={selectedPaymentMethod} />;
  }

  // Show success page
  if (paymentStatus === 'success' && completedOrder && completedTransaction) {
    return <PaymentSuccess transaction={completedTransaction} order={completedOrder} />;
  }

  // Show failed page
  if (paymentStatus === 'failed') {
    return <PaymentFailed error={paymentError} amount={grandTotal} onRetry={handleRetry} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className={currentStep >= 1 ? 'font-medium text-gray-800' : 'text-gray-500'}>
                Delivery
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300">
              <div className={`h-full transition-all ${
                currentStep >= 2 ? 'bg-primary-600 w-full' : 'w-0'
              }`} />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className={currentStep >= 2 ? 'font-medium text-gray-800' : 'text-gray-500'}>
                Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
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
                    {errors.address && <p className="error-text">{errors.address}</p>}
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
                    placeholder="Any special instructions for delivery?"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                {/* Continue Button */}
                <div className="flex gap-4">
                  <Link to="/cart" className="flex-1">
                    <Button variant="outline" fullWidth leftIcon={<FaArrowLeft />}>
                      Back to Cart
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleContinueToPayment} 
                    className="flex-1"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Payment Method Selection */}
                {!selectedPaymentMethod && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <FaLock className="text-primary-600" />
                      Select Payment Method
                    </h2>
                    <PaymentMethodSelector
                      selectedMethod={selectedPaymentMethod}
                      onSelectMethod={setSelectedPaymentMethod}
                      amount={totalAmount}
                    />
                  </div>
                )}

                {/* Card Payment Form */}
                {selectedPaymentMethod === 'card' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        💳 Card Payment
                      </h2>
                      <button
                        onClick={() => setSelectedPaymentMethod('')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Change method
                      </button>
                    </div>
                    <CardPaymentForm
                      amount={formatPrice(grandTotal)}
                      onSubmit={handlePaymentSubmit}
                      isLoading={isProcessing}
                    />
                  </div>
                )}

                {/* Bank Transfer */}
                {selectedPaymentMethod === 'bank_transfer' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        🏦 Bank Transfer
                      </h2>
                      <button
                        onClick={() => setSelectedPaymentMethod('')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Change method
                      </button>
                    </div>
                    <BankTransferPayment
                      amount={grandTotal}
                      onConfirm={handlePaymentSubmit}
                      isLoading={isProcessing}
                    />
                  </div>
                )}

                {/* USSD Payment */}
                {selectedPaymentMethod === 'ussd' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        📱 USSD Payment
                      </h2>
                      <button
                        onClick={() => setSelectedPaymentMethod('')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Change method
                      </button>
                    </div>
                    <USSDPayment
                      amount={grandTotal}
                      onConfirm={handlePaymentSubmit}
                      isLoading={isProcessing}
                    />
                  </div>
                )}

                {/* Cash on Delivery */}
                {selectedPaymentMethod === 'cash_on_delivery' && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        💵 Cash on Delivery
                      </h2>
                      <button
                        onClick={() => setSelectedPaymentMethod('')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Change method
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-800 mb-2">How it works</h3>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>✓ Your order will be processed immediately</li>
                          <li>✓ Pay cash when your order arrives</li>
                          <li>✓ Please have exact change ready</li>
                          <li>✓ Delivery within 24-48 hours</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          ⚠️ <strong>Note:</strong> Cash on Delivery is only available for orders under ₦100,000. 
                          For larger orders, please use card or bank transfer.
                        </p>
                      </div>

                      <Button
                        onClick={handlePaymentSubmit}
                        fullWidth
                        size="lg"
                        isLoading={isProcessing}
                      >
                        Place Order - {formatPrice(grandTotal)}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Back Button */}
                {!selectedPaymentMethod && (
                  <Button
                    variant="outline"
                    onClick={handleBackToDelivery}
                    leftIcon={<FaArrowLeft />}
                  >
                    Back to Delivery
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
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
                {paymentFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Payment Fee</span>
                    <span>{formatPrice(paymentFee)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between py-4 border-t mt-4">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(grandTotal)}</span>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4 pt-4 border-t">
                <FaLock className="w-4 h-4 text-green-500" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;