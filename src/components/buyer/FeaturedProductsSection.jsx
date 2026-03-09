import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '../../data';

const FeaturedProductsSection = () => {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Hand-picked fresh products from our best farmers
            </p>
          </div>
          <Link 
            to="/products"
            className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group"
          >
            <span>View All</span>
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden mt-8 text-center">
          <Link 
            to="/products"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>View All Products</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;