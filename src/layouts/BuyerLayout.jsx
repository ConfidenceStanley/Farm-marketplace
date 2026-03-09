import { Outlet } from 'react-router-dom';
import Navbar from '../components/buyer/Navbar';
import Footer from '../components/buyer/Footer';
import CartSidebar from '../components/buyer/CartSidebar';

const BuyerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
};

export default BuyerLayout;