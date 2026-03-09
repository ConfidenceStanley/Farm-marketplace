import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../../context';
import { formatPrice } from '../../utils/helpers';
import { Button, EmptyState } from '../common';

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    subtotal,
    deliveryFee,
    totalAmount
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <EmptyState
              icon={<FaShoppingBag className="w-16 h-16" />}
              title="Your cart is empty"
              description="Looks like you haven't added any products yet."
              actionLabel="Start Shopping"
              onAction={() => {
                closeCart();
              }}
            />
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)} / {item.unit}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
                          disabled={item.quantity >= item.stock}
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-primary w-full text-center block"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="btn-outline w-full text-center block"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartSidebar;