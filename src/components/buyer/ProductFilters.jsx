import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { categories } from '../../data';

const ProductFilters = ({ 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  onReset
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under ₦1,000', min: 0, max: 1000 },
    { label: '₦1,000 - ₦5,000', min: 1000, max: 5000 },
    { label: '₦5,000 - ₦10,000', min: 5000, max: 10000 },
    { label: 'Above ₦10,000', min: 10000, max: Infinity }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2"
      >
        <FaFilter className="w-5 h-5" />
        <span className="font-semibold">Filters</span>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Filters Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-full bg-white z-50 lg:z-0
        transform transition-transform duration-300 ease-in-out lg:transform-none
        overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              onClick={onReset}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Sort By (Mobile Only) */}
          <div className="lg:hidden">
            <label className="label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="input-field"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => onCategoryChange('all')}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                  All Categories
                </span>
              </label>
              {categories.map(category => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => onCategoryChange(category.id)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-400">
                    ({category.productCount})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange.min === range.min && priceRange.max === range.max}
                    onChange={() => onPriceRangeChange(range)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Availability</h4>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">In Stock Only</span>
            </label>
          </div>

          {/* Mobile Apply Button */}
          <div className="lg:hidden pt-4 border-t">
            <button
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;