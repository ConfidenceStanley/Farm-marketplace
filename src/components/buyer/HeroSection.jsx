import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaTruck, FaLeaf } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16 lg:py-20">
          
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <FaLeaf className="w-4 h-4 text-secondary-400" />
              <span className="text-sm font-medium">100% Organic & Fresh</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Farm Fresh Produce
                <span className="block text-secondary-400">Delivered to You</span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 leading-relaxed max-w-xl">
                Get the freshest organic fruits, vegetables, and farm products 
                directly from local farmers. Quality guaranteed, delivered daily.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
              </Link>
              <Link 
                to="/categories"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                <FaSearch className="w-5 h-5" />
                <span>Browse Categories</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-primary-200 mt-1">Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white">50+</div>
                <div className="text-sm text-primary-200 mt-1">Farmers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white">1k+</div>
                <div className="text-sm text-primary-200 mt-1">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="hidden lg:block relative">
            {/* Main Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop" 
                alt="Fresh Vegetables"
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaTruck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Free Delivery</div>
                    <div className="text-sm text-gray-500">On orders over ₦5,000</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-secondary-500 rounded-2xl shadow-xl p-4 text-white">
                <div className="text-3xl font-bold">20%</div>
                <div className="text-sm">First Order Discount</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;