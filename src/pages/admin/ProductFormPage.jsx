import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaImage } from 'react-icons/fa';
import { Button, Input } from '../../components/common';
import { categories, getProductById } from '../../data';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    categoryId: '',
    farmerName: '',
    location: '',
    stock: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const product = getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          unit: product.unit,
          categoryId: product.categoryId,
          farmerName: product.farmerName,
          location: product.location,
          stock: product.stock,
          image: product.image
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(isEditMode ? 'Product updated (demo)' : 'Product added (demo)');
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode ? 'Update product information' : 'Add a new product to your inventory'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              placeholder="e.g., Fresh Tomatoes"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <div>
              <label className="label">Description</label>
              <textarea
                name="description"
                placeholder="Describe the product..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Price (₦)"
                type="number"
                name="price"
                placeholder="2500"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />
              <Input
                label="Unit"
                name="unit"
                placeholder="e.g., basket, kg, piece"
                value={formData.unit}
                onChange={handleChange}
                error={errors.unit}
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Stock Quantity"
                type="number"
                name="stock"
                placeholder="50"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                required
              />
            </div>
          </div>
        </div>

        {/* Farmer Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Farmer Information</h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Farmer/Farm Name"
              name="farmerName"
              placeholder="e.g., Adebayo Farms"
              value={formData.farmerName}
              onChange={handleChange}
              required
            />
            <Input
              label="Location"
              name="location"
              placeholder="e.g., Ogun State"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Image</h2>
          
          <div className="space-y-4">
            <Input
              label="Image URL"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              helperText="For demo: Use any image URL"
            />
            
            {formData.image && (
              <div className="border rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/200x200/22c55e/white?text=Preview';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            isLoading={isLoading}
            leftIcon={<FaSave />}
          >
            {isEditMode ? 'Update Product' : 'Add Product'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            leftIcon={<FaTimes />}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;