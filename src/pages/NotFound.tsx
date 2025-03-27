
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="h-24 w-24 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-600 mb-8">
          The page might have been moved, deleted, or never existed. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="finance-button w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="finance-button-outline w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
