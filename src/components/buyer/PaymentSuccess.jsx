import { Link } from 'react-router-dom';
import { FaCheckCircle, FaReceipt, FaHome, FaShoppingBag } from 'react-icons/fa';
import { Button } from '../common';
import { formatPrice, formatDateTime } from '../../utils/helpers';

const PaymentSuccess = ({ transaction, order }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-lg mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-green-100">Your order has been placed successfully</p>
            </div>

            {/* Transaction Details */}
            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="text-center">
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="text-4xl font-bold text-gray-800">{formatPrice(transaction.amount)}</p>
              </div>

              {/* Transaction Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Ref</span>
                  <span className="font-mono font-semibold text-gray-800">{transaction.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number</span>
                  <span className="font-semibold text-primary-600">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {transaction.method.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold text-gray-800">
                    {formatDateTime(transaction.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                    <FaCheckCircle className="w-4 h-4" />
                    Completed
                  </span>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✓ Your order has been received</li>
                  <li>✓ Admin will confirm your order shortly</li>
                  <li>✓ You'll be notified when it's on the way</li>
                  <li>✓ Estimated delivery: 24-48 hours</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link to={`/orders/${order.id}`} className="block">
                  <Button fullWidth leftIcon={<FaReceipt />}>
                    View Order Details
                  </Button>
                </Link>
                <Link to="/products" className="block">
                  <Button fullWidth variant="outline" leftIcon={<FaShoppingBag />}>
                    Continue Shopping
                  </Button>
                </Link>
                <Link to="/" className="block">
                  <Button fullWidth variant="ghost" leftIcon={<FaHome />}>
                    Go to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Receipt Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            A receipt has been sent to your email address
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;