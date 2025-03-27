
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 mt-4 max-w-xs">
              Your trusted partner in financial planning. We help you achieve your financial goals through smart planning and investments.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-50 text-brand-500 hover:bg-brand-100 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-50 text-brand-500 hover:bg-brand-100 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-50 text-brand-500 hover:bg-brand-100 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-50 text-brand-500 hover:bg-brand-100 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/goal-planner" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Goal Planning
                </Link>
              </li>
              <li>
                <Link to="/sip-calculator" className="text-gray-600 hover:text-brand-500 transition-colors">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link to="/tax-planner" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Tax Planning
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Financial Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Investment Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Market Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-brand-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-500 mr-3 mt-0.5" />
                <span className="text-gray-600">
                  123 Finance Street, Investment City, 560001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-500 mr-3" />
                <span className="text-gray-600">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-500 mr-3" />
                <span className="text-gray-600">contact@finplanner.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© {currentYear} FinPlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
