import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../../context';
import { formatPrice } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity, incrementQuantity, decrementQuantity } = useCart();
  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    incrementQuantity(product.id);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    decrementQuantity(product.id);
  };

  return (
    <div className="card overflow-hidden group">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/products/${product.slug}`}>
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Stock Badge */}
        {!product.isAvailable && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute top-3 right-3 bg-white p-2.5 rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-all"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <FaHeart className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category */}
        <Link 
          to={`/categories/${product.categoryId}`}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          {product.categoryName}
        </Link>

        {/* Product Name */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 mt-1 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Farmer & Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <FaMapMarkerAlt className="w-3 h-3" />
          <span className="truncate">{product.farmerName}</span>
          <span>•</span>
          <span className="truncate">{product.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar className="w-4 h-4 fill-current" />
            <span className="text-gray-800 text-sm font-medium">
              {product.rating}
            </span>
          </div>
          <span className="text-gray-400 text-sm">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-xl font-bold text-gray-800">
            {formatPrice(product.price)}
          </div>
          <div className="text-xs text-gray-500">
            per {product.unit}
          </div>
        </div>

        {/* Add to Cart Button - Always Visible */}
        {inCart ? (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm"
            >
              <FaMinus className="w-3 h-3" />
            </button>
            <span className="font-semibold text-gray-800 px-4">
              {quantity} in cart
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className="w-10 h-10 flex items-center justify-center bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;