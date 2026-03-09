import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

export { useAuth } from './AuthContext';
export { useCart } from './CartContext';