import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context';

// Layouts
import BuyerLayout from './layouts/BuyerLayout';
import AdminLayout from './layouts/AdminLayout';

// Route Protection
import ProtectedRoute from './routes/ProtectedRoute';

// Auth Pages
import { LoginPage, RegisterPage } from './pages/auth';

// Buyer Pages
import { 
  HomePage, 
  ProductsPage, 
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  OrdersPage,
  OrderDetailPage,
  ProfilePage
} from './pages/buyer';

// Admin Pages
import {
  DashboardPage,
  ProductsManagementPage,
  ProductFormPage,
  OrdersManagementPage,
  AdminOrderDetailPage,
  CustomersPage
} from './pages/admin';

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</p>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary inline-block mt-6">
        Go Home
      </a>
    </div>
  </div>
);

// About Page
const AboutPage = () => (
  <div className="bg-gray-50 min-h-screen">
    <div className="bg-primary-600 text-white py-20">
      <div className="container-custom text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About FarmMarket</h1>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
          Connecting local farmers directly with consumers for fresh, organic produce.
        </p>
      </div>
    </div>
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              FarmMarket is dedicated to bridging the gap between local farmers and consumers. 
              We believe in supporting local agriculture while providing fresh, quality produce 
              to households across Nigeria.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Browse Products</h3>
                  <p className="text-gray-600">Explore fresh farm produce from local farmers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Place Order</h3>
                  <p className="text-gray-600">Add items to cart and checkout easily.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Get Delivery</h3>
                  <p className="text-gray-600">Receive fresh produce at your doorstep.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Email: info@farmmarket.com<br />
              Phone: +234 801 234 5678<br />
              Address: 123 Farm Road, Ikeja, Lagos
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* ==================== */}
          {/* BUYER ROUTES */}
          {/* ==================== */}
          <Route element={<BuyerLayout />}>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/categories" element={<ProductsPage />} />
            <Route path="/categories/:slug" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Buyer Pages */}
            <Route path="/checkout" element={
              <ProtectedRoute requiredRole="buyer">
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute requiredRole="buyer">
                <OrdersPage />
              </ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
              <ProtectedRoute requiredRole="buyer">
                <OrderDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requiredRole="buyer">
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Route>

          {/* ==================== */}
          {/* AUTH ROUTES */}
          {/* ==================== */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ==================== */}
          {/* ADMIN ROUTES */}
          {/* ==================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductsManagementPage />} />
            <Route path="products/add" element={<ProductFormPage />} />
            <Route path="products/edit/:id" element={<ProductFormPage />} />
            <Route path="orders" element={<OrdersManagementPage />} />
            <Route path="orders/:id" element={<AdminOrderDetailPage />} />
            <Route path="customers" element={<CustomersPage />} />
          </Route>

          {/* ==================== */}
          {/* 404 PAGE */}
          {/* ==================== */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;