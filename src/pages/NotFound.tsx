
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pharma-background">
      <div className="text-center px-4">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 text-pharma-primary">404</h1>
          <div className="w-16 h-1 bg-pharma-primary mx-auto my-4"></div>
          <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>
        <Link to="/">
          <Button className="bg-pharma-primary hover:bg-pharma-secondary">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
