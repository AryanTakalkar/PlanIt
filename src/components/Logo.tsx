
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="text-brand-500 font-bold text-2xl tracking-tight">
        <span className="text-brand-600">Plan</span>
        <span className="text-gray-900">It</span>
      </div>
    </Link>
  );
};

export default Logo;
