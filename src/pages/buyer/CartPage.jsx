import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaMinus, 
  FaTrash, 
  FaShoppingBag,
  FaArrowLeft,
  FaShieldAlt,
  FaTruck
} from 'react-icons/fa';
import { Button, EmptyState } from '../../components/common';
import { useCart, useAuth } from '../../context';
import { formatPrice } from '../../utils/helpers';

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    cartItems, 
    removeFromCart, 
    incrementQuantity, 
    decrementQuantity,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    totalAmount
  } = useCart();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-12">
          <EmptyState
            icon={<FaShoppingBag className="w-20 h-20" />}
            title="Your cart is empty"
            description="Looks like you haven't added any products yet. Start shopping to fill your cart with fresh farm produce!"
            actionLabel="Start Shopping"
            onAction={() => navigate('/products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2"
            >
              <FaTrash className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex gap-4 sm:gap-6">
                  {/* Product Image */}
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/200x200/22c55e/white?text=${encodeURIComponent(item.name)}`;
                      }}
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <div>
                        <Link 
                          to={`/products/${item.id}`}
                          className="font-semibold text-gray-800 hover:text-primary-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatPrice(item.price)} / {item.unit}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-lg font-bold text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="p-2 sm:p-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={item.stock}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            updateQuantity(item.id, val);
                          }}
                          className="w-12 sm:w-16 text-center border-0 focus:ring-0 font-semibold"
                        />
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="p-2 sm:p-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.stock && (
                      <p className="text-orange-600 text-sm mt-2">
                        Max quantity reached
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mt-4"
            >
              <FaArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Summary Items */}
              <div className="space-y-4 border-b pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-800">{formatPrice(deliveryFee)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-6 border-b">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(totalAmount)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                fullWidth
                size="lg"
                className="mt-6"
              >
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaShieldAlt className="w-5 h-5 text-green-600" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaTruck className="w-5 h-5 text-green-600" />
                  <span>Delivery within 24-48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;