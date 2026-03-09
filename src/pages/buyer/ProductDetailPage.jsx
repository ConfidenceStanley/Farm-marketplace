import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaUser,
  FaMinus,
  FaPlus,
  FaChevronLeft,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaLeaf
} from 'react-icons/fa';
import { Button, LoadingSpinner } from '../../components/common';
import ProductCard from '../../components/buyer/ProductCard';
import { useCart } from '../../context';
import { getProductBySlug, getProductsByCategory } from '../../data';
import { formatPrice } from '../../utils/helpers';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity, incrementQuantity, decrementQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundProduct = getProductBySlug(slug);
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Get related products from same category
        const related = getProductsByCategory(foundProduct.categoryId)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
        setSelectedImage(0);
        setQuantity(1);
      }
      
      setIsLoading(false);
    }, 300);

    // Scroll to top
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products?category=${product.categoryId}`} className="text-gray-500 hover:text-primary-600">
              {product.categoryName}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button (Mobile) */}
      <div className="lg:hidden bg-white border-b">
        <div className="container-custom py-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
          >
            <FaChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="container-custom py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/600x600/22c55e/white?text=${encodeURIComponent(product.name)}`;
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`
                        w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                        ${selectedImage === index 
                          ? 'border-primary-600 ring-2 ring-primary-200' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/100x100/22c55e/white?text=${index + 1}`;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <Link 
                to={`/products?category=${product.categoryId}`}
                className="inline-block text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {product.categoryName}
              </Link>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>

              {/* Farmer Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{product.farmerName}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    {product.location}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b py-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-800">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-500">/ {product.unit}</span>
                </div>
                <p className={`text-sm mt-2 ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                  {product.stock > 10 
                    ? `In Stock (${product.stock} available)` 
                    : `Only ${product.stock} left in stock`
                  }
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="font-medium text-gray-700">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-3 text-gray-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaMinus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-16 text-center border-0 focus:ring-0 font-semibold"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-3 text-gray-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Total: <span className="font-semibold text-gray-800">{formatPrice(product.price * quantity)}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {inCart ? (
                  <div className="flex-1 flex items-center justify-center gap-4 bg-primary-50 text-primary-700 py-4 px-6 rounded-lg">
                    <FaCheck className="w-5 h-5" />
                    <span className="font-semibold">{cartQuantity} in cart</span>
                    <div className="flex items-center border border-primary-300 rounded-lg">
                      <button
                        onClick={() => decrementQuantity(product.id)}
                        className="p-2 hover:bg-primary-100"
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="px-3 font-semibold">{cartQuantity}</span>
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className="p-2 hover:bg-primary-100"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.isAvailable}
                    fullWidth
                    size="lg"
                    leftIcon={<FaShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                )}
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors">
                  <FaHeart className="w-6 h-6" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaTruck className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaLeaf className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">100% Organic</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaShieldAlt className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;