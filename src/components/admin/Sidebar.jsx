import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaBoxes, 
  FaClipboardList, 
  FaUsers,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import { Logo } from '../common';
import { useAuth } from '../../context';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: FaHome,
      end: true
    },
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: FaBoxes 
    },
    { 
      name: 'Orders', 
      path: '/admin/orders', 
      icon: FaClipboardList 
    },
    { 
      name: 'Customers', 
      path: '/admin/customers', 
      icon: FaUsers 
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h14V7l-7-5z"/>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white">
                  Farm<span className="text-primary-500">Market</span>
                </span>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </Link>
            
            {/* Close Button (Mobile) */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-600/10 hover:text-red-500 transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// Add missing import
import { Link } from 'react-router-dom';

export default Sidebar;