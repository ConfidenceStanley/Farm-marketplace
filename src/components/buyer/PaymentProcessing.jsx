import { useEffect, useState } from 'react';
import { FaSpinner, FaCreditCard, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const PaymentProcessing = ({ paymentMethod }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { icon: FaCreditCard, text: 'Initializing payment...', color: 'text-blue-500' },
    { icon: FaShieldAlt, text: 'Verifying card details...', color: 'text-yellow-500' },
    { icon: FaSpinner, text: 'Processing transaction...', color: 'text-primary-500' },
    { icon: FaCheckCircle, text: 'Almost done...', color: 'text-green-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[step].icon;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary-100 rounded-full animate-ping"></div>
          <div className="relative w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center">
            <CurrentIcon className={`w-10 h-10 ${steps[step].color} ${step === 2 ? 'animate-spin' : ''}`} />
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">Processing Payment</h2>
        <p className="text-gray-600 mb-6">{steps[step].text}</p>

        {/* Progress Steps */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= step ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <FaShieldAlt className="w-4 h-4 text-green-500" />
          <span>Secure payment powered by Paystack</span>
        </div>

        {/* Warning */}
        <p className="text-xs text-red-500 mt-4">
          Please do not close or refresh this page
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessing;