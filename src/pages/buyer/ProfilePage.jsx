import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { Button, Input } from '../../components/common';
import { useAuth } from '../../context';
import { isValidPhone, isValidEmail } from '../../utils/helpers';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateProfile(formData);
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setIsLoading(false);

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <FaSave className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 sm:px-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  <FaUser className="w-10 h-10" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-primary-100 mt-1">{user?.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    Customer
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Toggle */}
            <div className="px-6 py-4 border-b bg-gray-50 flex justify-end">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary btn-sm flex items-center gap-2"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="btn-outline btn-sm flex items-center gap-2"
                  >
                    <FaTimes className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn-primary btn-sm flex items-center gap-2"
                  >
                    <FaSave className="w-4 h-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    disabled={!isEditing}
                    leftIcon={<FaUser className="w-4 h-4" />}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    disabled={!isEditing}
                    leftIcon={<FaUser className="w-4 h-4" />}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={!isEditing}
                    leftIcon={<FaEnvelope className="w-4 h-4" />}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    disabled={!isEditing}
                    leftIcon={<FaPhone className="w-4 h-4" />}
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h3>
                
                <div>
                  <label className="label">Address</label>
                  <div className="relative">
                    <div className="absolute left-4 top-3 text-gray-400">
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={3}
                      className={`input-field pl-12 resize-none ${!isEditing ? 'bg-gray-50' : ''}`}
                      placeholder="Enter your delivery address"
                    />
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary-600">0</p>
                    <p className="text-sm text-gray-600 mt-1">Total Orders</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">₦0</p>
                    <p className="text-sm text-gray-600 mt-1">Total Spent</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">New</p>
                    <p className="text-sm text-gray-600 mt-1">Member Status</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-800">Danger Zone</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="btn-danger btn-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;