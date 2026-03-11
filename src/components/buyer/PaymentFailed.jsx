import { Link } from 'react-router-dom';
import { FaTimesCircle, FaRedo, FaHeadset, FaArrowLeft } from 'react-icons/fa';
import { Button } from '../common';
import { formatPrice } from '../../utils/helpers';

const PaymentFailed = ({ error, amount, onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-lg mx-auto">
          {/* Failed Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimesCircle className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
              <p className="text-red-100">We couldn't process your payment</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="text-center">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-3xl font-bold text-gray-800">{formatPrice(amount)}</p>
              </div>

              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Error Details</h3>
                <p className="text-sm text-red-700">
                  {error || 'Your payment could not be processed. Please check your card details and try again.'}
                </p>
              </div>

              {/* Common Issues */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Common reasons for failure:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Insufficient funds in your account
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Incorrect card details entered
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Card has expired or is blocked
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Transaction limit exceeded
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    Network connectivity issues
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  fullWidth 
                  leftIcon={<FaRedo />}
                  onClick={onRetry}
                >
                  Try Again
                </Button>
                <Link to="/cart" className="block">
                  <Button fullWidth variant="outline" leftIcon={<FaArrowLeft />}>
                    Back to Cart
                  </Button>
                </Link>
              </div>

              {/* Support */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">Need help with your payment?</p>
                <a 
                  href="mailto:support@farmmarket.com" 
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <FaHeadset className="w-4 h-4" />
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;