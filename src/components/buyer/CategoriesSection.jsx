import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { categories } from '../../data';

const CategoriesSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Browse our wide range of fresh farm products
            </p>
          </div>
          <Link 
            to="/categories"
            className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold group"
          >
            <span>View All</span>
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group"
            >
              <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.productCount} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden mt-8 text-center">
          <Link 
            to="/categories"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <span>View All Categories</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;