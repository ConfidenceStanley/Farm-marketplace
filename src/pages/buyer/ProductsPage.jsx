import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/buyer/ProductCard';
import ProductFilters from '../../components/buyer/ProductFilters';
import ProductSearchBar from '../../components/buyer/ProductSearchBar';
import ProductSort from '../../components/buyer/ProductSort';
import Pagination from '../../components/common/Pagination';
import { EmptyState } from '../../components/common';
import { FaBoxOpen } from 'react-icons/fa';
import { products, getCategoryById } from '../../data';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL params
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam ? parseInt(categoryParam) : 'all'
  );
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 12;

  // Filter products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Filter by search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.categoryName.toLowerCase().includes(search)
      );
    }

    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, sortBy, searchTerm]);

  // Update URL params
  useEffect(() => {
    const params = {};
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (searchTerm) params.search = searchTerm;
    setSearchParams(params);
  }, [selectedCategory, searchTerm, setSearchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: Infinity });
    setSortBy('newest');
    setSearchTerm('');
  };

  const getCategoryName = () => {
    if (selectedCategory === 'all') return 'All Products';
    const category = getCategoryById(selectedCategory);
    return category ? category.name : 'Products';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            {getCategoryName()}
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="w-full lg:flex-1">
              <ProductSearchBar 
                onSearch={handleSearch}
                initialValue={searchTerm}
              />
            </div>
            <div className="hidden lg:block">
              <ProductSort value={sortBy} onChange={handleSortChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="lg:grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onReset={handleReset}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {(selectedCategory !== 'all' || searchTerm || priceRange.min > 0) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {getCategoryById(selectedCategory)?.name}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-primary-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:text-primary-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {priceRange.min > 0 && (
                  <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    Price filter
                    <button
                      onClick={() => setPriceRange({ min: 0, max: Infinity })}
                      className="hover:text-primary-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={handleReset}
                  className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid or Empty State */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyState
                icon={<FaBoxOpen className="w-16 h-16" />}
                title="No products found"
                description="We couldn't find any products matching your filters. Try adjusting your search criteria."
                actionLabel="Clear Filters"
                onAction={handleReset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;