import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Logo = ({ className = '', showText = true, linkTo = '/' }) => {
  return (
    <Link 
      to={linkTo} 
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="bg-primary-600 text-white p-2 rounded-lg">
        <FaLeaf className="w-6 h-6" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-800 leading-tight">
            Farm<span className="text-primary-600">Market</span>
          </span>
          <span className="text-xs text-gray-500 leading-tight">
            Fresh from farm
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;